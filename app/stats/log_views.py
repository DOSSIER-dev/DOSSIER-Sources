from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from sources_main.models import Source
from stats.models import SourceHit


class CreateEventViewSet(APIView):
    """
    Log an event for statistics / tracking.
    Logs (creates) a `SourceHit` record for a source.
    """

    def get(self, request, sourceId):
        try:
            source = Source.objects.get(embedId=sourceId)
        except Source.DoesNotExist:
            raise Http404

        event = SourceHit.createFromRequest(source, request,
            eventType=SourceHit.TYPE_ACTIVITY)
        event.save()
        return Response("")