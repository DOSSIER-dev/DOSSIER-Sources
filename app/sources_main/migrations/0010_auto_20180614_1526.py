# Generated by Django 2.0.6 on 2018-06-14 15:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('sources_main', '0009_source_tags'),
    ]

    operations = [
        migrations.AlterField(
            model_name='source',
            name='fileRef',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='source', to='filestorage.File'),
        ),
    ]