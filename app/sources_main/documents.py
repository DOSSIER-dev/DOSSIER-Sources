from django_elasticsearch_dsl import DocType, Index, fields
from .models import Source

# Define index with a name
pdfsource = Index('sources-pdfsource')

# See Elasticsearch Indices API reference for available settings
pdfsource.settings(
    number_of_shards=1,
    number_of_replicas=0
)

@pdfsource.doc_type
class SourceDocument(DocType):
    """
    The source document schema as it is stored in the elasticsearch index.
    Fields are added either by being defined explicitly by type, or by
    mentioning the name in the `fields` list of the Meta class.
    """

    owner = fields.ObjectField(properties={
        'username': fields.StringField(
            fields={'keyword': fields.KeywordField()}),
        'firstname': fields.StringField(),
        'lastname': fields.StringField(),
        'id': fields.IntegerField(),
    })

    organisation = fields.ObjectField(properties={
        'name': fields.StringField(),
        'id': fields.IntegerField(),
    })

    collection = fields.ObjectField(properties={
        'name': fields.StringField(),
        'id': fields.IntegerField(),
    })

    tags = fields.ObjectField(properties={
        'name': fields.StringField(),
        'id': fields.IntegerField(),
    }, multi=True)

    stories = fields.ObjectField(properties={
        'name': fields.StringField(),
        'id': fields.IntegerField(),
    }, multi=True)

    fileRef = fields.ObjectField(properties={
        'name': fields.StringField()
    })

    title = fields.TextField(
        # analyzer=html_strip,
        fields={'keyword': fields.KeywordField()}
    )

    bookmarks = fields.IntegerField(multi=True)

    def prepare_bookmarks(self, instance):
        return [bkmk.user.id for bkmk in instance.bookmarks.all()]


    def prepare_owner(self, instance):
        """
        Manually map / prepare the owner (=User) field.
        It is incoming from the request, and an instance of SimpleLazyObject -
        which will seemingly not be handled by the ObjectField serializer
        """
        if not instance.owner:
            return None

        return {
            'username': instance.owner.username,
            'firstname': instance.owner.first_name,
            'lastname': instance.owner.last_name,
            'id': instance.owner.id
        }

    class Meta:
        model = Source  # The model associated with this DocType
        fields = [
            'id',
            'description',
            'contentRaw',
            'public',
            'sourcetype',
            'sourceId',
            'sourceURL',
            'externalServiceId',
            'created_at',
            'updated_at'
        ]
