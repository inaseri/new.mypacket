# Generated by Django 2.2.6 on 2020-02-23 07:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('money', '0002_auto_20200212_0823'),
    ]

    operations = [
        migrations.AlterField(
            model_name='transaction',
            name='date',
            field=models.DateField(),
        ),
    ]
