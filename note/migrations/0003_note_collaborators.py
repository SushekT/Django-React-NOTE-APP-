# Generated by Django 3.2.8 on 2022-02-13 15:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0003_remove_collaborations_notes'),
        ('note', '0002_note_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='note',
            name='collaborators',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.SET_NULL, to='user.collaborations'),
        ),
    ]