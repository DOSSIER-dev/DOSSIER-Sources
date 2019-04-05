#
# Copy this file to `settings_local.py` and replace the secret key.
#

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '....cgRBTVUc6LlSpLYxxZck.....'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = [
    'sources.tt4.at',
]

SOURCES_PUBLIC_API_URL = 'https://sources.tt4.at'

# Email backend
# https://docs.djangoproject.com/en/2.1/topics/email/#email-backends
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'postfix'
EMAIL_PORT = 25
EMAIL_HOST_USER = 'user'
EMAIL_HOST_PASSWORD = 'test123'
