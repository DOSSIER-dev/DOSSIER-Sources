# Generated by Django 2.1 on 2019-02-18 15:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stats', '0006_auto_20190207_1131'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sourcehit',
            name='eventType',
            field=models.CharField(choices=[('load', 'load'), ('activity', 'activity'), ('prefetch', 'prefetch')], default='load', max_length=32),
        ),
    ]
