from rest_framework import serializers
from .models import File


class FileSerializer(serializers.HyperlinkedModelSerializer):
    uploadDate = serializers.DateTimeField(source='created_at')
    class Meta:
        model = File
        fields = (
            'id',
            'name',
            'uploadDate',
            'downloadUrl',
            'mimeType'
        )
