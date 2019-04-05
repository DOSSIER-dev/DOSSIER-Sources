from django.contrib import admin

from .models import Source, Annotation

@admin.register(Source)
class SourceAdmin(admin.ModelAdmin):
    list_display = ('title','owner', 'organisation',
                    'public', 'sourcetype',
                    'embedId', 'created_at', 'updated_at')
    search_fields = ('title',)
    list_filter = ('sourcetype',)


@admin.register(Annotation)
class AnnotationAdmin(admin.ModelAdmin):
    list_display = ('title', 'source',)
