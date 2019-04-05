from django.conf.urls import url, include
import stats.views as views
from stats.log_views import CreateEventViewSet

urlpatterns = [

    # Log events ..
    url('event/(?P<sourceId>[^/.]+)', CreateEventViewSet.as_view()),

    # Query logged events and aggregations ..
    url('source/', views.SourceOverviewView.as_view()),
    # url('weekly/', views.SourceHitsByWeekView.as_view()),
    url('weeklysums/', views.OverallHitsByWeekView.as_view()),
    url('dashboard/', views.DashboardStatsView.as_view()),
    url('inventory/', views.OrganisationInventory.as_view())
]
