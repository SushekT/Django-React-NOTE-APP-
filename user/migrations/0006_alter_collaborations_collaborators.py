# Generated by Django 3.2.8 on 2022-02-14 14:22

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('user', '0005_auto_20220214_1957'),
    ]

    operations = [
        migrations.AlterField(
            model_name='collaborations',
            name='collaborators',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
    ]