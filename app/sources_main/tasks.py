from .models import Source
from celery import shared_task
from celery.utils.log import get_task_logger
from filestorage.contentreader import ContentReader


logger = get_task_logger(__name__)


@shared_task
def contentreader_task(source_id):
    """Retrieve result from contentreader.
    """
    instance = Source.objects.get(id=source_id)

    try:
        reader = ContentReader.factory(instance.fileRef)
        contents = reader.read_all()
    except Exception as err:
        logger.error(
            'Could not read contents of Source id %s' % source_id
        )
        logger.error(err)
        contents = ''

    instance.contentRaw = contents
    instance.save(update_fields=['contentRaw'])

    logger.info(
        'Saved contents to Source id %s from ContentReader.' % source_id
    )
    return contents
