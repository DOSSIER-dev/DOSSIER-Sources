"""
REST views
"""
from django.http import Http404
from django.urls import reverse
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .documents import SourceDocument
from .models import Source, Annotation
from .serializers import (
    SourceSerializer,
    AnnotationSerializer,
    PublicSourceSerializer
)

from stats.models import SourceHit


class SourceViewSet(viewsets.ModelViewSet):
    """
    Source main endpoint.
    """
    queryset = Source.objects.all()
    serializer_class = SourceSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """
        Filter by user, organisation.
        """
        return self.queryset.filter(organisation=self.request.organisation)

    def perform_create(self, serializer):
        """
        Add current user, organisation when creating a source.
        """
        serializer.validated_data['owner'] = self.request.user
        serializer.validated_data['organisation'] = self.request.organisation
        return super().perform_create(serializer)


class AnnotationViewSet(viewsets.ModelViewSet):
    """
    Annotation main endpoint.
    Annotations are tied to a source, identified by the path / keyword argument
    `sourceId`.
    """

    serializer_class = AnnotationSerializer

    # Permission
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """
        Filter annotations by (valid) source.
        """
        sourceId = self.kwargs['sourceId']
        source = Source.objects.get(id=sourceId,
                                    organisation=self.request.organisation)
        return Annotation.objects.filter(source=source)

    def perform_create(self, serializer):
        """
        Make sure to add the (valid) source as reference when adding
        an annotation.
        """
        sourceId = self.kwargs['sourceId']
        source = Source.objects.get(id=sourceId,
                                    organisation=self.request.organisation)
        serializer.validated_data['source'] = source
        return super().perform_create(serializer)


class SourceEmbeddedView(APIView):
    """
    Get one source by embedId.
    Requests from the embed-script (pre)-fetching meta data of a source.
    """

    def get(self, request):
        embedId = request.GET.get("id")

        # Fetch *public* source by embed id
        try:
            source = Source.objects.get(embedId=embedId,
                                        public=True)
        except Source.DoesNotExist:
            raise Http404()

        routeName = request.resolver_match.url_name
        eventType = SourceHit.TYPE_PREFETCH \
            if routeName == 'source_public_prefetch' else SourceHit.TYPE_LOAD

        # Log the request
        sourceHit = SourceHit.createFromRequest(source, request, event=eventType)
        sourceHit.save()

        serializer = PublicSourceSerializer(source)
        return Response(serializer.data)
