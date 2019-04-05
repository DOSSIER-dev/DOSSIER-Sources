from django.db import models
from sources_main.models import Source

ANONYMIZE_IP = True
ANONYMIZE_IP_FULL = False
ANONYMIZE_AGENT = True

# Create your models here.
class SourceHit(models.Model):
    TYPE_PREFETCH = 'prefetch'
    TYPE_LOAD = 'load'
    TYPE_ACTIVITY = 'activity'

    TYPE_CHOICES = [
        (TYPE_LOAD, TYPE_LOAD),
        (TYPE_ACTIVITY, TYPE_ACTIVITY),
        (TYPE_PREFETCH, TYPE_PREFETCH),
    ]

    source = models.ForeignKey(Source, related_name='hits',
                               null=False, on_delete=models.CASCADE)

    eventType = models.CharField(max_length=32, default=TYPE_LOAD,
        choices=TYPE_CHOICES)
    requestTime = models.DateTimeField(auto_now_add=True)

    remoteHost = models.CharField(max_length=255, default='')
    userAgent = models.CharField(max_length=255, default='')
    referer = models.CharField(max_length=255, default='')

    def _anonymize(self):
        # Anonymize data depending on anonymization settings
        if ANONYMIZE_IP != False or ANONYMIZE_IP_FULL != False:
            if ANONYMIZE_IP_FULL:
                self.remoteHost = ''
            else:
                self.remoteHost = '.'.join(
                    self.remoteHost.split('.')[:-1] + ['0'])

        if ANONYMIZE_AGENT != False:
            self.userAgent = ''

    def save(self, *args, **kwargs):
        self._anonymize()
        super().save(*args, **kwargs)

    @staticmethod
    def createFromRequest(source, request, event=TYPE_LOAD):
        sourceHit = SourceHit(source=source,
                              eventType=event,
                              remoteHost=request.META.get('REMOTE_ADDR', ''),
                              userAgent=request.META.get(
                                  'HTTP_USER_AGENT', ''),
                              referer=request.META.get('HTTP_REFERER', ''))
        return sourceHit

