from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from enum import Enum
from django.core.validators import MinLengthValidator
from sources.settings import SOURCES_SUPPORT_EMAIL
import re
import logging
logger = logging.getLogger(__name__)


class Organisation(models.Model):
    """
    Staff / organisation.
    Users are part of an organisation.
    Users of organisation share access to souces.
    """
    name = models.CharField(max_length=200, validators=[MinLengthValidator(1)])
    color = models.CharField(max_length=200, null=True, blank=True)
    logo = models.CharField(max_length=200, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.id) + '-' + self.name


class TagLike(models.Model):
    """
    Tag-like. Categorization tag to be attached to a source.
    """
    name = models.CharField(max_length=200, validators=[MinLengthValidator(1)])
    organisation = models.ForeignKey(
        Organisation,
        null=False,
        on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = (('name',  'organisation'),)
        abstract = True

    def save(self, *args, **kwargs):
        self.name = self.cleanName(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return '-'.join([self.organisation.name, self.name])

    @classmethod
    def cleanName(cls, name):
        """
        Allow (almost) anything - but strip leading/trailing spaces and
        duplicate spaces between words.
        """
        cleaned = ' '.join([word for word in name.strip().split(' ')
                            if word.strip() != ''])
        return cleaned

    @classmethod
    def getByName(cls, tag_name, org_id):
        """
        Find tag by name and the organisation (normalize name before lookup).
        """

        # Normalize tag name before the lookup
        searchName = cls.cleanName(tag_name)
        return cls.objects.get(name=searchName, organisation=org_id)


    @classmethod
    def getOrCreate(cls, tag_name, org_id):
        """
        Find tag by name and the organisation (normalize name before lookup).
        If it does not exist, create it.
        """

        # Normalize tag name before the lookup
        searchName = cls.cleanName(tag_name)

        try:
            tag = cls.objects.get(name=searchName, organisation=org_id)
        except cls.DoesNotExist:
            # Create new tag here
            tag = cls(name=searchName, organisation=org_id)
            tag.save()

        return tag

    @classmethod
    def moveRefs(cls, srcTag, destTag):
        for src in srcTag.sources.all():
            src.tags.remove(srcTag)
            src.tags.add(destTag)
            src.save()


class Tag(TagLike):
    """
    Tag. Categorization tag to be attached to a source.
    """
    class Meta(TagLike.Meta):
        abstract = False


class Story(TagLike):
    """
    Story. Categorization tag to be attached to a source.
    """
    class Meta(TagLike.Meta):
        abstract = False


class Collection(models.Model):
    """
    Collection. Each source can have only one.
    """
    name = models.CharField(max_length=200, validators=[MinLengthValidator(1)])
    organisation = models.ForeignKey(
        Organisation,
        null=False,
        on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = (('name',  'organisation'),)

    def __str__(self):
        return self.name


class StafferProfile(models.Model):
    """
    One-to-one link extension of user model.
    https://simpleisbetterthancomplex.com/tutorial/2016/07/22/how-to-extend-django-user-model.html#onetoone
    """
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='staffprofile'
    )
    organisation = models.ForeignKey(
        Organisation,
        on_delete=models.CASCADE,
        blank=True,
        null=True
    )
    isManager = models.BooleanField(default=False)

    def get_support_email(self):
        return SOURCES_SUPPORT_EMAIL


@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        StafferProfile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_profile(sender, instance, **kwargs):
    try:
        if not instance.staffprofile:
            StafferProfile.objects.create(user=instance)
        instance.staffprofile.save()
    except Exception as err:
        logger.error(err)

