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

# date time and jalali date time import
from datetime import datetime
import jdatetime

from django.dispatch import receiver
from django_rest_passwordreset.signals import reset_password_token_created
from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives
from django_rest_passwordreset import tokens

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


@receiver(reset_password_token_created)
def password_reset_token_created(sender, reset_password_token, *args, **kwargs):
    """
    Handles password reset tokens
    When a token is created, an e-mail needs to be sent to the user
    :param sender:
    :param reset_password_token:
    :param args:
    :param kwargs:
    :return:
    """
    # send an e-mail to the user
    context = {
        'current_user': reset_password_token.user,
        'username': reset_password_token.user.username,
        'email': reset_password_token.user.email,
        # ToDo: The URL can (and should) be constructed using pythons built-in `reverse` method.
        'reset_password_url': "https://a.jibeman.inaseri.ir/reset_form",
        'token': reset_password_token.key
    }

    # render email text
    email_html_message = render_to_string('money/user_reset_password.html', context)
    email_plaintext_message = render_to_string('money/user_reset_password.txt', context)

    msg = EmailMultiAlternatives(
        # title:
        ("بازیابی مجدد رمز عبور {title}".format(title="برای وب اپلیکیشن جیب من")),
        # message:
        email_plaintext_message,
        # from:
        "jibeman@inaseri.ir",
        # to:
        [reset_password_token.user.email]
    )

    # the 4 below lines use for update the token
    userID = User.objects.filter(username=context['username']).values('id')
    for ids in userID:
        userID = ids
    Token.objects.filter(user=str(userID['id'])).update(key=context['token'])

    msg.attach_alternative(email_html_message, "text/html")
    msg.send()


@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def resetPassword(request):
    newPassword = request.data.get("password")
    newToken = request.data.get("token")
    if Token.objects.get(key=str(newToken)) is None:
        print("not updated password")
    else:
        userID = Token.objects.filter(key=str(newToken)).values('user')
        for ids in userID:
            userID = ids
        userID = userID['user']
        user = User.objects.get(pk=userID)
        print("user is:", user)
        user.set_password(str(newPassword))
        user.save()
        return Response({"status": "success", "response": "Password Successfully Updated"}, status=status.HTTP_202_ACCEPTED)
    return Response({"status": "not success", "response": "Password Dont Reset, There Is Some Problems"}, status=status.HTTP_406_NOT_ACCEPTABLE)

@csrf_exempt
@api_view(['GET', 'POST'])
def bank_list(request, owner):
    """
    List all code banks, or create a new bank.
    """
    if request.method == 'GET':
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
def transactions_list(request, type, owner, thisMonth, nextMonth):
    """
    List all code banks, or create a new transaction.
    """
    year_number = jdatetime.date.today().year
    # this two lines calculate start and end of month
    first_day_this_month = jdatetime.datetime(year_number, thisMonth, 1,00,00,00)
    if nextMonth > 12:
        first_day_next_month = jdatetime.datetime(year_number, nextMonth - 1, 29,00,00,00)
    else:
        first_day_next_month = jdatetime.datetime(year_number, nextMonth, 1,00,00,00)

    # this two lines convert persian date to gregorian date and time
    first_day_this_month = first_day_this_month.togregorian()
    first_day_next_month = first_day_next_month.togregorian()

    # this two lines convert date time to date
    first_day_this_month = datetime.date(first_day_this_month)
    first_day_next_month = datetime.date(first_day_next_month)

    if request.method == 'GET':
        transaction = Transaction.objects.filter(type=type, owner=owner, date__range=[first_day_this_month, first_day_next_month])
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
            if type == 2 or type == 4:
                cash = cash_in_bnak - cash
            else:
                cash = cash_in_bnak + cash

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

            if type_transaction == 2 or type_transaction == 4:
                cash_in_bank = cash_in_bank + cash_transaction
            else:
                cash_in_bank = cash_in_bank - cash_transaction

            Bank.objects.filter(name_bank=source_transaction, owner=owner_transaction).update(cash_bank=cash_in_bank)

            # the below line use for delete api
            transaction.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)
