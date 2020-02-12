from django.conf.urls import url
from django.contrib import admin
from django.urls import include, path
from rest_framework.authtoken import views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    path('api/', include('money.urls')),
    path('api-token-auth/', views.obtain_auth_token, name='api-tokn-auth'),
]
