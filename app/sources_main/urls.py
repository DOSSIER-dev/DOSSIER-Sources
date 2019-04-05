from django.conf.urls import url, include, re_path
from rest_framework import routers
import sources_main.views as views
import sources_main.views_search as views_search

router = routers.DefaultRouter()
router.register(r'sources', views.SourceViewSet)
router.register('sources/(?P<sourceId>[^/.]+)/annotations',
                views.AnnotationViewSet, base_name='annotations')
router.register(r'search', views_search.SourceDocumentViewSet,
                base_name='search')

urlpatterns = [
    # Source and annotation views, plus search view
    url(r'^', include(router.urls)),

    # Public query (from an article / post where source is embedded)
    re_path(r'^fetch', views.SourceEmbeddedView.as_view(),
            name='source_public'),

    re_path(r'^prefetch', views.SourceEmbeddedView.as_view(),
            name='source_public_prefetch')
]

