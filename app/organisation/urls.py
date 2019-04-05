from django.conf.urls import url, include
from rest_framework import routers
from .views import (
    TagViewSet,
    StoryViewSet,
    CollectionViewSet,
    OrganisationViewSet,
    StafferViewSet,
    # UserSettingsViewSet
)

router = routers.DefaultRouter()
router.register(r'tags', TagViewSet)
router.register(r'stories', StoryViewSet)
router.register(r'collections', CollectionViewSet)
router.register(r'organisation', OrganisationViewSet)
router.register(r'staffer', StafferViewSet)
# router.register(r'settings', UserSettingsViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
]
