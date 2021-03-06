# Generated by Django 2.1 on 2019-04-03 08:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sources_main', '0027_auto_20190403_0759'),
    ]

    operations = [
        migrations.AlterField(
            model_name='source',
            name='sourcetype',
            field=models.CharField(choices=[('DOC', 'Document'), ('IMG', 'Image'), ('LINK', 'Weblink'), ('VIDEO', 'Video'), ('VIMEO', 'Vimeo'), ('AUDIO', 'Audio'), ('DATA', 'Dataset'), ('MISC', 'Misc')], default='MISC', max_length=8),
        ),
    ]
