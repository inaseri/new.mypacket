from django.urls import path
from money import views


urlpatterns = [
    path('banks/', views.bank_list),
    path('banks/<int:pk>/', views.bank_detail),
]

