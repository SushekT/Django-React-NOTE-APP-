# Generated by Django 3.2.8 on 2022-02-13 15:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('note', '0003_note_collaborators'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='note',
            name='collaborators',
        ),
    ]
