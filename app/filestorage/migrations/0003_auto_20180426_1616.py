# Generated by Django 2.0.4 on 2018-04-26 16:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('filestorage', '0002_auto_20180412_1048'),
    ]

    operations = [
        migrations.RenameField(
            model_name='file',
            old_name='uploadDate',
            new_name='created_at',
        ),
        migrations.AddField(
            model_name='file',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
    ]