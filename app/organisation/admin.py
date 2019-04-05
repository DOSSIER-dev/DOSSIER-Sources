from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User
from organisation.models import (
    Organisation, Tag, Story, Collection, StafferProfile)


@admin.register(Organisation)
class OrganisationAdmin(admin.ModelAdmin):
    pass


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at')


@admin.register(Story)
class StoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at')


@admin.register(Collection)
class CollectionAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at')


@admin.register(StafferProfile)
class StafferProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'organisation', 'isActive', 'isManager')

    def isActive(self, obj):
        return obj.user.is_active


class StafferProfileInline(admin.StackedInline):
    model = StafferProfile
    can_delete = False
    verbose_name_plural = 'StafferProfile'
    fk_name = 'user'


class CustomUserAdmin(UserAdmin):
    """
    Extended user admin.
    """
    inlines = (StafferProfileInline, )
    list_display = UserAdmin.list_display + ('userOrg',)

    def get_inline_instances(self, request, obj=None):
        if not obj:
            return list()
        return super().get_inline_instances(request, obj)

    def userOrg(self, obj):
        return obj.staffprofile.organisation


# Use the extended user admin
admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)
