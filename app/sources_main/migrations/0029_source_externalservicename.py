# Generated by Django 2.1 on 2019-04-03 08:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sources_main', '0028_auto_20190403_0822'),
    ]

    operations = [
        migrations.AddField(
            model_name='source',
            name='externalServiceName',
            field=models.CharField(blank=True, max_length=32, null=True),
        ),
    ]
