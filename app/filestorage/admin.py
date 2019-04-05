from django.contrib import admin
from .models import File

@admin.register(File)
class FileAdmin(admin.ModelAdmin):
    list_display = ('name', 'owner', 'organisation', 'updated_at', 'path')
    search_fields = ('name', 'downloadId')
