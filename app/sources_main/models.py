from celery import current_app
from datetime import datetime
from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from filestorage.models import File
from organisation.models import Organisation
from sources.settings import SOURCES_PUBLIC_API_URL

import random
import string

# Pattern for micropage share URLs
SHARE_URL = SOURCES_PUBLIC_API_URL + '/s/{}'

def gen_id(length):
    """ Create a well-usable random id """
    source = string.ascii_letters + string.digits
    return ''.join([random.choice(source) for _ in range(0, length)])


def get_uri(model):
    """ Get the share/micropage URL of a source """
    return SHARE_URL.format(model.embedId)


class Source(models.Model):
    """
    Source main model.
    """

    DOCTYPE_CHOICES = (
        ('DOC', 'Document'),
        ('IMG', 'Image'),
        ('LINK', 'Weblink'),
        ('VIDEO', 'Video'),
        ('VIMEO', 'Vimeo'),
        ('AUDIO', 'Audio'),
        ('DATA', 'Dataset'),
        ('MISC', 'Misc'),
    )

    EMBED_ID_LEN = 8

    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, default="")
    public = models.BooleanField(blank=True, default=False)

    # Id issued by the sources-app for embedding and sharing
    embedId = models.CharField(max_length=64, unique=True, blank=True, null=True)

    # URN-type reference (e.g. ISBN, DOI)
    sourceId = models.CharField(max_length=200, blank=True, null=True)

    # Source URL
    sourceURL = models.CharField(max_length=200, blank=True, null=True)

    # Reference of the source at an external service (such as YT id)
    externalServiceId = models.CharField(max_length=200, blank=True, null=True)

    # Name of the external service
    externalServiceName = models.CharField(max_length=32, blank=True, null=True)

    owner = models.ForeignKey(
        User,
        null=True,
        on_delete=models.SET_NULL)

    organisation = models.ForeignKey(
        Organisation,
        null=False,
        on_delete=models.CASCADE)

    tags = models.ManyToManyField('organisation.Tag',
                                  related_name='sources',
                                  blank=True)

    stories = models.ManyToManyField('organisation.Story',
                                     related_name='sources',
                                     blank=True)

    collection = models.ForeignKey(
        'organisation.Collection',
        null=True, blank=True,
        on_delete=models.SET_NULL)

    sourcetype = models.CharField(
        max_length=8, default="MISC", choices=DOCTYPE_CHOICES)

    # Uploaded source file
    fileRef = models.ForeignKey(
        File,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='source')

    # Extracted content (e.g. for PDF documents)
    contentRaw = models.TextField(blank=True)

    country = models.CharField(max_length=255, null=True, blank=True)
    language = models.CharField(max_length=255, null=True, blank=True)
    date = models.DateTimeField(null=True, blank=True)
    publishedDate = models.DateTimeField(null=True)

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def shareUrl(self):
        return get_uri(self)

    @property
    def downloadUrl(self):
        return self.fileRef.downloadUrl if self.fileRef else None

    @property
    def public_annotations(self):
        return self.annotations.filter(public=True)

    def save(self, *args, **kwargs):
        # Generate an embedd-ID, if none is set
        if self.embedId is None or self.embedId == '':
            self.embedId = gen_id(self.EMBED_ID_LEN)

        # Set the publish date, if not yet set and published (public=True).
        if self.publishedDate is None and self.public:
            self.publishedDate = datetime.now()

        super().save(*args, **kwargs)

    def __str__(self):
        return "Source:" + self.title


class Annotation(models.Model):
    """
    Annotation model.

    The model contains the union of all possible location fields.
    These are: fields for page/2d context, fields for timecode based contexts,
    and a "fallback"/human readable text input field.
    """
    source = models.ForeignKey(Source, related_name='annotations',
                               null=False, on_delete=models.CASCADE)
    title = models.TextField(max_length=200, blank=True, default="")
    description = models.TextField(blank=True, default="")
    public = models.BooleanField(blank=True, default=False)

    # Fields for page / 2d based
    page = models.IntegerField(null=True, blank=True)
    pageX = models.DecimalField(
        null=True, blank=True, max_digits=10, decimal_places=2)
    pageY = models.DecimalField(
        null=True, blank=True, max_digits=10, decimal_places=2)
    width = models.DecimalField(
        null=True, blank=True, max_digits=10, decimal_places=2)
    height = models.DecimalField(
        null=True, blank=True, max_digits=10, decimal_places=2)

    # Fields for audio/video, time in seconds
    timecodeFrom = models.IntegerField(null=True, blank=True)
    timecodeTo = models.IntegerField(null=True, blank=True)

    # Location as text (human readable intput, as fallback)
    locationText = models.TextField(blank=True, default="")

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


@receiver(post_save, sender=Source)
def reicever(*args, **kwargs):
    """
    Post-save hook of Source objects.

    Queues the task of extracting the source content.
    The `if update_fields is None` check is required to prevent the event from
    triggering again, causing an endless loop.
    """
    instance = kwargs['instance']
    update_fields = kwargs['update_fields']

    if update_fields is None:
        current_app.send_task('sources_main.tasks.contentreader_task', (instance.pk,))
