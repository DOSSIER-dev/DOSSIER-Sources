# Generated by Django 2.1 on 2019-03-26 16:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('organisation', '0013_auto_20190211_1623'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='stafferprofile',
            name='isActive',
        ),
    ]
