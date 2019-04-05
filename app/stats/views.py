from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Count, Q, F, Func, CharField
from sources_main.models import Source
from organisation.models import Tag, Story, Collection
from stats.models import SourceHit
from datetime import datetime, timedelta


class YearWeek(Func):
    """ Sql function expression for use in aggregate querys """
    template = 'CONCAT(EXTRACT(YEAR FROM %(expressions)s), EXTRACT(WEEK FROM %(expressions)s))'
    output_field = CharField()



class WeekToDateMixin():
    def _addDateToResult(self, queryset):
        """
        Calculate back from a `week` field (@see YearWeek) to an ISO date
        that is the first day of this week, adding a `date` attribute to
        every result-object.
        """
        result = map(
            lambda r: dict(
                list(r.items()) +
                [('date', datetime.strptime(r['week'] + "1", "%Y%W%w"))]
            ), queryset)
        return result


class HitsQueryMixin(WeekToDateMixin):
    """
    Provide re-usable helper methods for stats views.
    """

    def _applyFilters(self, queryset, request):
        """
        Apply common filters from the request / query string
        """
        if 'id' in request.GET:
            queryset = queryset.filter(source__id=request.GET['id'])

        if 'owner' in request.GET:
            queryset = queryset.filter(source__owner__id=request.GET['owner'])

        return queryset


class OverallHitsByWeekView(APIView, HitsQueryMixin):
    """
    Hits, overview aggregate by week.
    """
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        qs = SourceHit.objects.filter(
            source__organisation=request.organisation,
            eventType__in=[SourceHit.TYPE_LOAD, SourceHit.TYPE_PREFETCH])

        qs = self._applyFilters(qs, request)

        qs = qs\
            .annotate(week=YearWeek('requestTime'))\
            .values('week', 'eventType')\
            .annotate(views=Count('week'))

        result = self._addDateToResult(qs)

        return Response(result)


# class SourceHitsByWeekView(APIView, HitsQueryMixin):
#     """
#     Hits, aggregate by source + week.
#     """
#     permission_classes = (IsAuthenticated,)

#     def get(self, request):
#         qs = SourceHit.objects.filter(
#             eventType=SourceHit.TYPE_LOAD,
#             source__organisation=request.organisation)

#         qs = self._applyFilters(qs, request)

#         qs = qs\
#             .annotate(
#                 sourceId=F('source__id'),
#                 sourceTitle=F('source__title'),
#                 week=YearWeek('requestTime'))\
#             .values('sourceId', 'sourceTitle', 'week')\
#             .annotate(views=Count('sourceId'))

#         result = self._addDateToResult(qs)

#         return Response(result)


class MiscStatsTestView(APIView):
    """
    Statistics query playground.
    """
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        qs = Source.objects.filter(organisation=request.organisation)
        if 'id' in request.GET:
            qs = qs.filter(id=request.GET['id'])
        qs = qs.annotate(
                annotationCount=Count(
                    'annotations',
                    distinct=True,
                    filter=Q(annotations__public=True)
                ),
                # Count hits (only 'load' types)
                hitsCount=Count('hits', distinct=True,
                    filter=Q(hits__eventType=SourceHit.TYPE_LOAD)))\
            .values('id', 'title', 'annotationCount', 'hitsCount', 'owner')

        return Response(list(qs))


class SourceOverviewView(APIView):
    """
    Query statistics for one source.
    """
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        qs = Source.objects.filter(organisation=request.organisation)
        if 'id' in request.GET:
            qs = qs.filter(id=request.GET['id'])

        qs = qs.annotate(
                # Count hits (only 'load' types)
                hitsCount=Count('hits', distinct=True,
                    filter=Q(hits__eventType=SourceHit.TYPE_LOAD)))\
            .values('id', 'hitsCount',)
        result = qs.get()

        return Response(result)


class OrganisationInventory(APIView, WeekToDateMixin):
    """
    Get number of sources, tags and collections.
    """

    def _doFilter(self, qs, request):
        # Restrict date
        fromDate = datetime.today() -  timedelta(days=365)
        return qs.filter(created_at__gte=fromDate)

    def get(self, request):

        # Sources created by week
        sources = Source.objects.filter(organisation=request.organisation)\
                .annotate(week=YearWeek('created_at'))\
                .values('week').annotate(count=Count('week'))
        sources = self._doFilter(sources, request)
        sources = self._addDateToResult(sources)

        # Tags created by week
        tags = Tag.objects.filter(organisation=request.organisation)\
                    .annotate(week=YearWeek('created_at'))\
                    .values('week').annotate(count=Count('week'))
        tags = self._doFilter(tags, request)
        tags = self._addDateToResult(tags)

        # Stories created by week
        stories = Story.objects.filter(organisation=request.organisation)\
                    .annotate(week=YearWeek('created_at'))\
                    .values('week').annotate(count=Count('week'))
        stories = self._doFilter(stories, request)
        stories = self._addDateToResult(stories)

        # Collections created by week
        colls = Collection.objects.filter(organisation=request.organisation)\
                    .annotate(week=YearWeek('created_at'))\
                    .values('week').annotate(count=Count('week'))
        colls = self._doFilter(colls, request)
        colls = self._addDateToResult(colls)

        return Response({
            "sources": list(sources),
            "stories": list(stories),
            "tags": list(tags),
            "collections": list(colls)
        })


class DashboardStatsView(APIView):
    """
    Get number of sources, and views for the session user.
    """

    def get(self, request):

        # Sources created by week
        sources = Source.objects.filter(
            organisation=request.organisation,
            owner=request.user).count()

        views = SourceHit.objects.filter(
            source__organisation=request.organisation,
            source__owner=request.user).count()

        return Response({
            "sourcesTotal": sources,
            "viewsTotal": views
        })
