from .documents import SourceDocument
from .models import Source, Annotation
from django_elasticsearch_dsl_drf.serializers import DocumentSerializer
from filestorage.serializers import FileSerializer
from organisation.serializers import (
    CollectionSerializer,
    StorySerializer,
    TagSerializer,
    UserSerializer
)
from organisation.models import Tag, Story, Collection
from rest_framework import serializers, fields
import re


class SourceDocumentSerializer(DocumentSerializer):
    """
    Source serializer for search queries.
    """

    # Set up the field for "highlight"-information (=fragments of the text
    # where the query contents where found)
    highlight = serializers.SerializerMethodField()

    def get_highlight(self, obj):
        if hasattr(obj.meta, 'highlight'):
            return obj.meta.highlight.__dict__['_d_']
        return {}

    class Meta(object):
        document = SourceDocument
        fields = (
            'id',
            'title',
            'description',
            'public',
            'sourcetype',
            'sourceId',
            'sourceURL',
            'externalServiceId',
            'owner',
            'fileRef',
            'created_at',
            'updated_at',
            'collection',
            'stories',
            'tags',
            'bookmarks'
        )


class AnnotationSerializer(serializers.HyperlinkedModelSerializer):
    """
    Annotations serializer.
    """
    class Meta(object):
        model = Annotation
        fields = [
            'id',
            'source_id',
            'title',
            'description',
            'page',
            'pageX',
            'pageY',
            'width',
            'height',
            'timecodeFrom',
            'timecodeTo',
            'locationText',
            'public',
        ]


class SourceBaseSerializer(serializers.HyperlinkedModelSerializer):
    """ Stripped down version  of full source serializer - for use
        e.g. with bookmarks endpoint.
    """
    fileRef = FileSerializer(allow_null=True, required=False, read_only=True)
    tags = TagSerializer(allow_null=True, required=False,
                         many=True, read_only=True)
    collection = CollectionSerializer(allow_null=True, required=False,
                                      read_only=True)
    owner = UserSerializer(read_only=True)

    class Meta:
        model = Source
        fields = (
            'id',
            'title',
            'description',
            'public',
            'sourcetype',
            'sourceId',
            'sourceURL',
            'externalServiceId',
            'owner',
            'fileRef',
            'created_at',
            'updated_at',
            'collection',
            'tags',
        )


class SourceSerializer(serializers.HyperlinkedModelSerializer):
    """
    Source serializer for main/database orm.

    TODO: fileRef_id and collection_id should be checked to belong to the
          same organisation as the source.
    """

    fileRef = FileSerializer(allow_null=True, required=False, read_only=True)
    annotations = AnnotationSerializer(many=True, read_only=True)

    # Writable related fields - see create / update for how to manually
    # deal with it upon serialization
    tags = TagSerializer(allow_null=True, required=False,
                         many=True, read_only=False)

    stories = StorySerializer(allow_null=True, required=False,
                              many=True, read_only=False)

    collection = CollectionSerializer(allow_null=True, required=False,
                                      read_only=True)

    # Force serializer to accept the id directly
    fileRef_id = fields.IntegerField(required=False, allow_null=True)

    # For setting collection
    collection_id = fields.IntegerField(required=False, allow_null=True)

    shareUrl = fields.ReadOnlyField()
    downloadUrl = fields.ReadOnlyField()

    owner = UserSerializer(read_only=True)

    class Meta:
        model = Source
        fields = (
            'id',
            'title',
            'description',
            'sourcetype',
            'stories',
            'tags',
            'public',
            'collection',
            'collection_id',
            'sourceId',
            'sourceURL',
            'externalServiceId',
            'externalServiceName',
            'embedId',
            'fileRef',
            'fileRef_id',
            'annotations',
            'shareUrl',
            'downloadUrl',
            'owner',
            'language',
            'country',
            'date',
            'publishedDate',
            'created_at',
            'updated_at'
        )

    def create(self, validated_data):
        """
        Custom create - saves tags + stories.
        """
        tagNames = self._popRelatedList(validated_data, 'tags')
        storiesNames = self._popRelatedList(validated_data, 'stories')

        # Create via base class after validated_data was cleaned
        instance = super().create(validated_data)

        tagObjects = [Tag.getOrCreate(t, instance.organisation) for t in tagNames]
        instance.tags.set(tagObjects)
        storiesObjects = [Story.getOrCreate(t, instance.organisation) for t in storiesNames]
        instance.stories.set(storiesObjects)

        return instance

    def update(self, instance, validated_data):
        """
        Custom update - saves tags + stories.
        """
        tagNames = self._popRelatedList(validated_data, 'tags')
        storiesNames = self._popRelatedList(validated_data, 'stories')

        tagObjects = [Tag.getOrCreate(t, instance.organisation) for t in tagNames]
        instance.tags.set(tagObjects)
        storiesObjects = [Story.getOrCreate(t, instance.organisation) for t in storiesNames]
        instance.stories.set(storiesObjects)

        return super().update(instance, validated_data)

    def _popRelatedList(self, validated_data, attr_name):
        items = validated_data.pop(attr_name) \
                if attr_name in validated_data else None
        items = items if items is not None else []
        itemNames = [t['name'] for t in items]
        return itemNames



class PublicAnnotationSerializer(serializers.HyperlinkedModelSerializer):
    """
    Annotation serializer for public requests (fetch source).
    """
    class Meta(object):
        model = Annotation
        fields = [
            'id',
            'source_id',
            'title',
            'description',
            'page',
            'pageX',
            'pageY',
            'width',
            'height',
            'timecodeFrom',
            'timecodeTo',
            'locationText',
        ]


class PublicSourceSerializer(serializers.HyperlinkedModelSerializer):
    """
    Source serializer for public requests (fetch source).
    """

    fileRef = FileSerializer(allow_null=True, required=False, read_only=True)
    annotations = PublicAnnotationSerializer(
        source='public_annotations',
        many=True, read_only=True)

    class Meta:
        model = Source
        fields = (
            'id',
            'title',
            'description',
            'sourcetype',
            'sourceId',
            'sourceURL',
            'externalServiceId',
            'externalServiceName',
            'embedId',
            'fileRef',
            'annotations',
            'shareUrl',
            'downloadUrl',
            'country',
            'language',
            'date',
            'created_at',
            'updated_at'
        )
