from django.contrib import admin

from .models import SourceHit


@admin.register(SourceHit)
class SourceHitAdmin(admin.ModelAdmin):
    list_display = ('source', 'eventType', 'requestTime', 'remoteHost', 'userAgent')
