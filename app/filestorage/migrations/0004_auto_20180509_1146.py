# Generated by Django 2.0.4 on 2018-05-09 11:46

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('organisation', '0001_initial'),
        ('filestorage', '0003_auto_20180426_1616'),
    ]

    operations = [
        migrations.AddField(
            model_name='file',
            name='organisation',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='organisation.Organisation'),
        ),
        migrations.AlterField(
            model_name='file',
            name='owner',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
    ]
