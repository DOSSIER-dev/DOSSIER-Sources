# Generated by Django 2.1 on 2019-03-26 15:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sources_main', '0025_rename_sourcetype'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='annotation',
            name='posBottom',
        ),
        migrations.RemoveField(
            model_name='annotation',
            name='posLeft',
        ),
        migrations.RemoveField(
            model_name='annotation',
            name='posRight',
        ),
        migrations.RemoveField(
            model_name='annotation',
            name='posTop',
        ),
        migrations.AlterField(
            model_name='source',
            name='sourcetype',
            field=models.CharField(choices=[('DOC', 'Document'), ('PDF', 'Pdf'), ('IMG', 'Image'), ('LINK', 'Weblink'), ('VIDEO', 'Video'), ('VIMEO', 'Vimeo'), ('AUDIO', 'Audio'), ('DATA', 'Dataset'), ('MISC', 'Misc')], default='MISC', max_length=8),
        ),
    ]
