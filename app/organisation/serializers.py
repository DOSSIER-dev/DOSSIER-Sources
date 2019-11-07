from .models import Collection, Tag, Story
from .models import StafferProfile
from .models import Organisation
from django.contrib.auth.models import User
from rest_auth.serializers import UserDetailsSerializer
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.core.validators import EmailValidator, MinLengthValidator
from rest_framework import serializers
from rest_framework import status
from rest_framework.response import Response


class TagSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Tag
        fields = ('id', 'name', )

    def update(self, instance, validated_data):
        """
        Override update with a special behaviour:
             If the tag name already exists, 'merge' the two tags:
              - remove the old tag everywhere, and add the new (referenced) tag
              - lastly, delete the changed tag
        """

        try:
            # Check if tag by the new name already exists
            tag = Tag.getByName(validated_data['name'], instance.organisation)

            if tag.id != instance.id:
                # If so (and not same tag), change all the referenced sources
                Tag.moveRefs(instance, tag)
                instance.delete()   # delete current tag
                return instance     # still return instance (as update expects)
        except Tag.DoesNotExist:
            pass

        # Otherwise, perform normal update
        return super().update(instance, validated_data)


class StorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Story
        fields = ('id', 'name', )


class CollectionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Collection
        fields = ('id', 'name', )


class OrganisationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Organisation
        fields = ('id', 'name', 'color')


class UserSerializer(serializers.HyperlinkedModelSerializer):
    lastname = serializers.CharField(source='last_name')
    firstname = serializers.CharField(source='first_name')

    class Meta:
        model = User
        fields = ('username', 'lastname', 'firstname')


class UserMainSerializer(serializers.HyperlinkedModelSerializer):

    lastname = serializers.CharField(source='last_name',
                                     validators=[MinLengthValidator(2)])
    firstname = serializers.CharField(source='first_name',
                                      validators=[MinLengthValidator(2)])

    # Explicitly define the username field without the unique-validator.
    # In the nested context, the unique-validator would not permit updates
    # where the username is kept the same.
    username = serializers.CharField(max_length=32, validators=[
                                     UnicodeUsernameValidator(),
                                     MinLengthValidator(2)])

    class Meta:
        model = User
        fields = ('id', 'username', 'lastname', 'firstname', 'email')


class StafferSerializer(serializers.HyperlinkedModelSerializer):
    user = UserMainSerializer()
    # isActive = serializers.SerializerMethodField()
    # def get_isActive(self, obj):
    #    return obj.user.is_active
    isActive = serializers.BooleanField(source='user.is_active')

    class Meta:
        model = StafferProfile
        fields = (
            'user',
            'isActive',
            'isManager',
        )

    def create(self, validated_data):
        """Update a staffer object together with a user object.
        """
        user = User.objects.create(**validated_data['user'])
        user.staffprofile.isManager = validated_data['isManager']

        # Organisation is set from session-user, see views.StafferViewSet
        user.staffprofile.organisation = validated_data['organisation']
        user.save()
        return user.staffprofile

    def update(self, instance, validated_data):
        """Update a staffer object together with a user object.
        """
        if 'user' in self.validated_data:
            user = self.validated_data['user']

            if 'username' in user and user['username']:
                instance.user.username = user['username']
            if 'first_name' in user:
                instance.user.first_name = user['first_name']
            if 'last_name' in user:
                instance.user.last_name = user['last_name']
            if 'email' in user:
                instance.user.email = user['email']
            if 'is_active' in user:
                instance.user.is_active = user['is_active']

            del validated_data['user']
            instance.user.save()

        return super().update(instance, validated_data)

    def validate(self, data):
        """"
        Validate user/staffer object.

            - username must be unique
            - email and username have to be equal

        Manual validation of unique-username here is required because the
        user object is a nested/referenced object and cannot be validated
        for uniqueness by the framework.

        """

        # Unique username
        try:
            userByName = User.objects.get(username=data['user']['username'])
            # Raise error, unless there is an instance and it is the same
            # as the found user (e.g. an update is performed and username
            # is kept)
            if self.instance is None or self.instance.id is not userByName.id:
                raise serializers.ValidationError(
                    'Username already exists')

        except User.DoesNotExist:
            # Unique name
            pass

        # Username and email address must be equal
        if data['user']['username'] != data['user']['email']:
            raise serializers.ValidationError('Username and email must be equal')

        return data


class PermissionUserDetailsSerializer(UserDetailsSerializer):
    """
    Replaces the default django-rest-auth serializer
    Includes the permission settings (admin).
    """
    isManager = serializers.BooleanField(source='staffprofile.isManager')

    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields + ('isManager', )
        read_only_fields = UserDetailsSerializer.Meta.read_only_fields + ('isManager', )


