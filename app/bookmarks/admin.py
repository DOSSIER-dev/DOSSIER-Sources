from django.contrib import admin
from bookmarks.models import Bookmark


@admin.register(Bookmark)
class CollectionAdmin(admin.ModelAdmin):
    pass
