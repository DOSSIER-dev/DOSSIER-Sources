from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAuthenticated
from organisation.models import Tag, Collection, Story
from organisation.models import StafferProfile, Organisation
from organisation.permissions import IsManager, IsManagerOrReadOnly, IsManagerOrNoDelete
from organisation.serializers import (
    OrganisationSerializer,
    StafferSerializer,
    TagSerializer,
    StorySerializer,
    CollectionSerializer
    # UserSettingsSerializer
)


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = (IsManagerOrNoDelete,)

    def get_queryset(self):
        """
        Filter by user, organisation.
        """
        return self.queryset.filter(organisation=self.request.organisation)

    def perform_create(self, serializer):
        """
        Add current organisation when creating a tag.
        """
        serializer.validated_data['organisation'] = self.request.organisation
        return super(TagViewSet, self).perform_create(serializer)


class StoryViewSet(viewsets.ModelViewSet):
    queryset = Story.objects.all()
    serializer_class = StorySerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """
        Filter by user, organisation.
        """
        return self.queryset.filter(organisation=self.request.organisation)

    def perform_create(self, serializer):
        """
        Add current organisation when creating a tag.
        """
        serializer.validated_data['organisation'] = self.request.organisation
        return super(StoryViewSet, self).perform_create(serializer)


class CollectionViewSet(viewsets.ModelViewSet):
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer
    permission_classes = (IsManagerOrReadOnly,)

    def get_queryset(self):
        """
        Filter by user, organisation.
        """
        return self.queryset.filter(organisation=self.request.organisation)

    def perform_create(self, serializer):
        """
        Add current organisation when creating.
        """
        serializer.validated_data['organisation'] = self.request.organisation
        return super().perform_create(serializer)


class OrganisationViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin,
                          mixins.UpdateModelMixin, viewsets.GenericViewSet):
    """
    Staffer admin (manager) can change settings of the organisation.
    """
    queryset = Organisation.objects.all()
    serializer_class = OrganisationSerializer
    permission_classes = (IsManagerOrReadOnly,)

    def get_queryset(self):
        """
        Filter by organisation.
        """
        return self.queryset.filter(id=self.request.organisation.id)


class StafferViewSet(viewsets.ModelViewSet):
    queryset = StafferProfile.objects.all()
    serializer_class = StafferSerializer
    permission_classes = (IsManagerOrReadOnly,)

    def get_queryset(self):
        """
        Filter by organisation.
        """
        return self.queryset.filter(organisation=self.request.organisation)

    def perform_update(self, serializer):
        # Restrict organisation
        serializer.validated_data['organisation'] = self.request.organisation
        return super().perform_update(serializer)

    def perform_create(self, serializer):
        # Set the organisation
        serializer.validated_data['organisation'] = self.request.organisation
        return super().perform_create(serializer)

    def perform_destroy(self, instance):
        # delete the user, which cascade-deletes the staffprofile
        instance.user.delete()


# class UserSettingsViewSet(mixins.RetrieveModelMixin, mixins.UpdateModelMixin,
#                           viewsets.GenericViewSet):
#     """
#     Personal user settings  (restricted to the session user)
#     """
#     queryset = StafferProfile.objects.all()
#     serializer_class = UserSettingsSerializer
#     permission_classes = (IsAuthenticated,)

#     def get_queryset(self):
#         """ Filter by user. """
#         return self.queryset.filter(id=self.request.user.id)

#     def perform_update(self, serializer):
#         # Restrict organisation
#         serializer.validated_data['organisation'] = self.request.organisation
#         return super().perform_update(serializer)
