from django.urls import path
from money import views
from django.conf.urls import url, include

urlpatterns = [
    path('banks/<int:owner>/', views.bank_list),
    path('bank/<int:pk>/', views.bank_detail),
    path('transactions/<int:type>/<int:owner>/<int:thisMonth>/<int:nextMonth>/', views.transactions_list),
    path('edit_transactions/<int:pk>/', views.transaction_detail),
    path('login/', views.login),
    path('register/', views.create_auth),
    url('password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
    path('set_password/', views.resetPassword)
]

