from django.conf.urls import url, include
from rest_framework import routers
from .views import BookmarkViewSet

router = routers.DefaultRouter()
router.register(r'bookmark', BookmarkViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
]
