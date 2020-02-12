from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Bank, Transaction


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class BankSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bank
        fields = ['id', 'owner', 'name_bank', 'cash_bank']


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['id', 'owner', 'source', 'date', 'title', 'cash', 'desc', 'type']
