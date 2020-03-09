# rest frame work auth
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import AllowAny
from money.serializers import UserSerializer
from rest_framework.authtoken.models import Token
# rest framework
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)
from rest_framework.response import Response
from rest_framework import viewsets


# serializer imports
from .serializers import BankSerializer, TransactionSerializer

# model imports
from .models import Transaction, Bank


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")
    if username is None or password is None:
        return Response({'error': 'Please provide both username and password'},
                        status=HTTP_400_BAD_REQUEST)
    user = authenticate(username=username, password=password)
    print("use is;", user)
    if not user:
        return Response({'error': 'Invalid Credentials'},
                        status=HTTP_404_NOT_FOUND)
    token, _ = Token.objects.get_or_create(user=user)
    return Response({'token': token.key, 'id': user.id}, status=HTTP_200_OK)


@api_view(['POST'])
@permission_classes((AllowAny,))
def create_auth(request):
    if request.method == 'POST':
        user = User.objects.create(
            username=request.data.get('email'),
            email=request.data.get('email'),
            first_name=request.data.get('first_name'),
            last_name=request.data.get('last_name'),
        )
        user.set_password(str(request.data.get('password')))
        user.save()
        return Response({"status": "success", "response": "User Successfully Created"}, status=status.HTTP_201_CREATED)
    # return JsonResponse(serializer.errors, status=400)


@csrf_exempt
@api_view(['GET', 'POST'])
def bank_list(request, owner):
    """
    List all code banks, or create a new bank.
    """
    if request.method == 'GET':
        print("owner is:", owner)
        banks = Bank.objects.filter(owner=owner)
        serializer = BankSerializer(banks, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = BankSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['GET', 'PUT', 'DELETE'])
def bank_detail(request, pk):
    print("in delete def")
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


@csrf_exempt
@api_view(['GET', 'POST'])
def transactions_list(request, type, owner):
    """
    List all code banks, or create a new snippet.
    """
    if request.method == 'GET':
        transaction = Transaction.objects.filter(type=type, owner=owner)
        serializer = TransactionSerializer(transaction, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = TransactionSerializer(data=request.data)
        if serializer.is_valid():

            # use this line to get bank from serializer
            bank = Bank.objects.filter(name_bank=serializer.validated_data['source'], owner=serializer.validated_data['owner'])

            # the below line use for get cash from the transaction
            cash = serializer.validated_data['cash']

            for selected_bank in bank:
                cash_in_bnak = selected_bank.cash_bank

            # use the below line to change cash in bank
            if type == 1 or type == 4:
                cash = cash_in_bnak + cash
            else:
                cash = cash_in_bnak - cash

            Bank.objects.filter(name_bank=serializer.validated_data['source'], owner=serializer.validated_data['owner']).update(cash_bank=cash)

            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['GET', 'PUT', 'DELETE'])
def transaction_detail(request, pk):
    """
    Retrieve, update or delete a code transaction.
    """
    try:
        transaction = Transaction.objects.get(id=pk)
    except Transaction.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = TransactionSerializer(transaction)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = TransactionSerializer(transaction, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':

        # the below line use for get detail of transaction
        transaction2 = Transaction.objects.filter(id=pk)

        # the below loop use for separate the objects from query set
        for select_item in transaction2:

            type_transaction = select_item.type
            cash_transaction = select_item.cash
            source_transaction = select_item.source
            owner_transaction = select_item.owner

            bank = Bank.objects.filter(name_bank=source_transaction, owner=owner_transaction)

            for selected_bank in bank:
                cash_in_bank = selected_bank.cash_bank

            if type_transaction == 1 or type_transaction == 4:
                cash_in_bank = cash_in_bank - cash_transaction
            else:
                cash_in_bank = cash_in_bank + cash_transaction

            Bank.objects.filter(name_bank=source_transaction, owner=owner_transaction).update(cash_bank=cash_in_bank)

            # the below line use for delete api
            transaction.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)
