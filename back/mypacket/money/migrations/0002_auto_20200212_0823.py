# Generated by Django 3.0.3 on 2020-02-12 08:23

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('money', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Banks',
            new_name='Bank',
        ),
        migrations.RenameModel(
            old_name='Transactions',
            new_name='Transaction',
        ),
    ]
