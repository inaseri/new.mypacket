from django.contrib.auth.models import User
from rest_framework import viewsets
from money.serializers import UserSerializer

# rest framework
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from rest_framework.parsers import JSONParser

# api imports
from django.http import HttpResponse, JsonResponse
from .serializers import BankSerializer, TransactionSerializer

# model imports
from .models import Transaction, Bank


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


@api_view(['GET', 'POST'])
def bank_list(request, format=None):
    """
    List all code banks, or create a new snippet.
    """
    if request.method == 'GET':
        banks = Bank.objects.all()
        serializer = BankSerializer(banks, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = BankSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def bank_detail(request, pk):
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        bank = Bank.objects.get(pk=pk)
    except Bank.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = BankSerializer(bank)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = BankSerializer(bank, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        bank.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
