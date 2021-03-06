# Generated by Django 2.0.4 on 2018-04-16 12:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    replaces = [('sources_main', '0002_auto_20180416_1056'), ('sources_main', '0003_auto_20180416_1233')]

    dependencies = [
        ('sources_main', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='annotation',
            name='source',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='annotations', to='sources_main.Source'),
        ),
        migrations.RemoveField(
            model_name='annotation',
            name='locationData',
        ),
        migrations.AddField(
            model_name='annotation',
            name='page',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='annotation',
            name='pageX',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='annotation',
            name='pageY',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='annotation',
            name='timecode',
            field=models.IntegerField(null=True),
        ),
    ]
