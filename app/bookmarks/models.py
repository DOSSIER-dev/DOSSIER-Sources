from django.db import models
from django.contrib.auth.models import User
from sources_main.models import Source


class Bookmark(models.Model):
    user = models.ForeignKey(
        User,
        null=False,
        on_delete=models.CASCADE,
        related_name='bookmarks')
    source = models.ForeignKey(
        Source,
        null=False,
        on_delete=models.CASCADE,
        related_name='bookmarks')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = (('source', 'user'),)
