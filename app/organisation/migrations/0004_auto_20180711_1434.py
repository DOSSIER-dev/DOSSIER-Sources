# Generated by Django 2.0.6 on 2018-07-11 14:34

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('organisation', '0003_stafferprofile'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stafferprofile',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='staffprofile', to=settings.AUTH_USER_MODEL),
        ),
    ]
