# Generated by Django 2.0.6 on 2018-06-14 15:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('filestorage', '0005_auto_20180509_1331'),
    ]

    operations = [
        migrations.AddField(
            model_name='file',
            name='hashed',
            field=models.CharField(default='', max_length=256),
            preserve_default=False,
        ),
    ]