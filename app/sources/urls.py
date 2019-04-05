"""sources URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/sources/', include('sources_main.urls')),
    path('api/files/', include('filestorage.urls')),
    path('api/cats/', include('organisation.urls')),
    path('api/stats/', include('stats.urls')),
    path('api/bookmarks/', include('bookmarks.urls')),

    # Authentication and user-related URLs from the rest_auth package
    path('api/rest-auth/', include('rest_auth.urls')),

    # PW reset
    # The view is not important, it needs to be defined for the reverse lookup
    path('reset-password-confirm/<uidb64>/<token>/',
         auth_views.PasswordResetConfirmView.as_view(),
         name='password_reset_confirm'),

]


