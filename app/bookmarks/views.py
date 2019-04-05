from bookmarks.models import Bookmark
from django.http import Http404
from sources_main.models import Source
from bookmarks.serializers import BookmarkSerializer
from rest_framework import viewsets, status, mixins
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.utils import IntegrityError


class BookmarkViewSet(mixins.CreateModelMixin,
                      mixins.DestroyModelMixin,
                      mixins.ListModelMixin, viewsets.GenericViewSet):
    """
    Bookmarks - base for the resource is the bookmark-table.

    Firstly, bookmarks are removed via the id <=> source.id field.
    However, the are created via a sourceId <=> source.id parameter.

    Instead , the resource could be based on the source table. Then the pk id
          would actually be correct and could be used in create and delete alike
          (of course, the bookmark relation would still be the actual resource
          to be created + deleted)

    The related source items are pre-fetched, to get the actual source for
    display. (the source is added in the serializer with a dedicated
    source-serializer as well).  However, in the othe use case, the front-end
    simply needs the ids of the bookmarked sources (so for that, a lot more
    data than needed is sent).

    """

    queryset = Bookmark.objects.select_related('source').all()
    serializer_class = BookmarkSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """
        Filter by user
        """
        return self.queryset.filter(user=self.request.user)

    def destroy(self, request, *args, **kwargs):
        """ Override destroy. Key is actually the Source ID, *not* the
        bookmark id """
        pk = kwargs['pk']
        instance = self.get_queryset().get(source_id=pk)
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_create(self, serializer):
        """
        Set current user.
        """
        serializer.validated_data['user'] = self.request.user
        try:
            source = Source.objects.get(
                id=serializer.validated_data['source_id'],
                organisation=self.request.organisation)
        except Source.DoesNotExist:
            raise Http404

        serializer.validated_data['user'] = self.request.user
        serializer.validated_data['source'] = source

        try:
            return super().perform_create(serializer)
        except IntegrityError:
            # Silently catching this error ...
            return None
