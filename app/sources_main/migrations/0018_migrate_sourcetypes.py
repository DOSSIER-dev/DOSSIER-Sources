# Change 'PDF' doctypes to 'DOC'

from django.db import migrations, models

def forwards(apps, schema_editor):
    if schema_editor.connection.alias != 'default':
        return

    # Your migration code goes here
    SourceModel = apps.get_model('sources_main', 'Source')
    for row in SourceModel.objects.filter(doctype='PDF'):
        row.doctype = 'DOC'
        row.save()

class Migration(migrations.Migration):

    dependencies = [
        ('sources_main', '0017_auto_20181022_1607'),
    ]

    operations = [
        migrations.RunPython(forwards),
    ]
