from django.contrib.auth.models import User
from bookmarks.models import Bookmark
from rest_framework import serializers, fields
from rest_framework import status
from rest_framework.response import Response
from sources_main.serializers import SourceSerializer, SourceBaseSerializer


class BookmarkSerializer(serializers.HyperlinkedModelSerializer):
    sourceId = fields.CharField(source='source_id')
    createdAt = fields.DateTimeField(source='created_at', read_only=True)
    source = SourceBaseSerializer(read_only=True)

    class Meta:
        model = Bookmark
        fields = ('id', 'sourceId', 'createdAt', 'source')

