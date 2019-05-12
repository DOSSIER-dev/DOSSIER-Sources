from django.db import models
from django.contrib.auth.models import User
from organisation.models import Organisation

from sources.settings import SOURCES_PUBLIC_API_URL
from filestorage.util import get_mimetype
from uuid import uuid4

DOWNLOAD_URL = SOURCES_PUBLIC_API_URL + '/api/files/get/{}'


def get_download(model):
    return DOWNLOAD_URL.format(model.downloadId)


class File(models.Model):
    file = models.FileField(blank=True, null=True)
    name = models.CharField(max_length=200)
    owner = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
    organisation = models.ForeignKey(
        Organisation,
        null=False,
        on_delete=models.CASCADE)
    path = models.CharField(max_length=255)
    hashed = models.CharField(max_length=256)
    mimetype = models.CharField(max_length=64)
    downloadId = models.CharField(max_length=64)

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def downloadUrl(self):
        return get_download(self)

    @property
    def mimeType(self):
        mimetype = self.mimetype \
                   if self.mimetype not in ['', None] \
                   else get_mimetype(self.path)
        return mimetype

    def save(self, *args, **kwargs):
        # Generate a unique id that is used to reference the file
        # in donwloads
        if self.downloadId is None or self.downloadId == '':
            self.downloadId = str(uuid4())
        super().save(*args, **kwargs)


    def __str__(self):
        return str(self.id) + '-' + self.name
