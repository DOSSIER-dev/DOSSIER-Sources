"""
Django settings for sources project.

Generated by 'django-admin startproject' using Django 2.0.2.

For more information on this file, see
https://docs.djangoproject.com/en/2.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.0/ref/settings/
"""

import os
import sys

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('SOURCES_DJANGO_SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = DEBUG = (os.environ.get('SOURCES_DJANGO_DEBUG') == 'True')

ALLOWED_HOSTS = os.environ.get('SOURCES_DJANGO_ALLOWED_HOSTS').split(',')


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'corsheaders',
    'django_elasticsearch_dsl',
    'rest_auth',
    'rest_framework.authtoken',
    'rest_framework',

    'sources_main',
    'filestorage',
    'organisation',
    'stats',
    'bookmarks'
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    )
}

# https://django-rest-auth.readthedocs.io/en/latest/configuration.html
REST_AUTH_SERIALIZERS = {
    'USER_DETAILS_SERIALIZER': 'organisation.serializers.PermissionUserDetailsSerializer',
}

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',

    'corsheaders.middleware.CorsMiddleware',

    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',

    'organisation.middleware.OwnershipMiddleware',

    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'sources.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',

        # Override some templates
        # https://docs.djangoproject.com/en/2.1/howto/overriding-templates/#overriding-from-the-project-s-templates-directory
        'DIRS': [os.path.join(BASE_DIR, 'templates')],

        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'sources.wsgi.application'


# Database
# https://docs.djangoproject.com/en/2.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': os.environ.get('SOURCES_MYSQL_DATABASE', 'sources'),
        'USER': os.environ.get('SOURCES_MYSQL_USER', 'root'),
        'PASSWORD': os.environ.get('SOURCES_MYSQL_PASSWORD', 'root'),
        'HOST': os.environ.get('SOURCES_MYSQL_HOST', 'db'),
        'PORT': os.environ.get('SOURCES_MYSQL_PORT', '3306'),
        'OPTIONS': {
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'"
        }
    }
}


# django-elasticsearch-dsl
# https://github.com/sabricot/django-elasticsearch-dsl

ELASTICSEARCH_DSL = {
    'default': {
        'hosts': 'elasticsearch:9200',

        # Re-indexing needs longer timeout
        # (TODO: use separate settings module for the index task only)
        'timeout': 25,
    },
}


# Celery settings
CELERY_BROKER_URL = 'amqp://guest:guest@queue_broker:5672'
# CELERY_ACCEPT_CONTENT = ['json']
# CELERY_TASK_SERIALIZER = 'json'
# CELERY_RESULT_EXPIRES = 3600

# Email backend
# https://docs.djangoproject.com/en/2.1/topics/email/#email-backends
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
# EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
# EMAIL_HOST = 'postfix'
# EMAIL_PORT = 25
# EMAIL_HOST_USER = 'user'
# EMAIL_HOST_PASSWORD = 'test123'


# Logging
# https://docs.djangoproject.com/en/2.0/topics/logging/
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': '/var/log/django.log',
        },
        'console': {
            'level': 'INFO',
            'class': 'logging.StreamHandler',
            'stream': sys.stdout
        }
    },
    'loggers': {
        'django': {
            'handlers': [
                'file',
                'console'
            ],
            'level': 'DEBUG',
            'propagate': True,
        },
    },

}


# Password validation
# https://docs.djangoproject.com/en/2.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
        'OPTIONS': {
            'min_length': 8,
        },
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# require old password field for changing the password.
OLD_PASSWORD_FIELD_ENABLED = True


# Internationalization
# https://docs.djangoproject.com/en/2.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.0/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = 'static'

# Default upload location
# https://docs.djangoproject.com/en/2.0/ref/settings/
# MEDIA_URL = '/media/'
MEDIA_ROOT = 'media'

#
# django-cors-headers
# https://github.com/ottoyiu/django-cors-headers/
CORS_ORIGIN_ALLOW_ALL = True
CORS_URLS_REGEX = r'^/api/.*$'

#
# Base url for share-links
SOURCES_PUBLIC_API_URL = 'http://localhost'
SOURCES_SUPPORT_EMAIL = 'sources@dossier.at'

try:
    from .settings_local import *
except ImportError:
    print ("No local settings module")
    pass

