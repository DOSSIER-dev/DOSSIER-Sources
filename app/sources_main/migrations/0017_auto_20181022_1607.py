# Generated by Django 2.1 on 2018-10-22 16:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sources_main', '0016_auto_20180924_1823'),
    ]

    operations = [
        migrations.AlterField(
            model_name='annotation',
            name='confidential',
            field=models.BooleanField(blank=True, default=True),
        ),
        migrations.AlterField(
            model_name='annotation',
            name='public',
            field=models.BooleanField(blank=True, default=False),
        ),
        migrations.AlterField(
            model_name='source',
            name='confidential',
            field=models.BooleanField(blank=True, default=True),
        ),
        migrations.AlterField(
            model_name='source',
            name='public',
            field=models.BooleanField(blank=True, default=False),
        ),
    ]