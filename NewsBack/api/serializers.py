from rest_framework import serializers
from .models import *


class UserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name')


class NewsSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(max_length=255)
    subtitle = serializers.CharField(max_length=255)
    image = serializers.CharField()
    content = serializers.CharField(max_length=None)
    category = CategorySerializer()
    date = serializers.DateTimeField(format='%d/%m/%Y %H:%M')
    author = UserSerializer()

    class Meta:
        model = News
        fields = ['id', 'title', 'subtitle', 'image', 'content', 'category', 'date', 'author']

    def create(self, validated_data):
        category = Category.objects.get(pk=validated_data['category'])
        return News.objects.create(category=category, **validated_data)

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.subtitle = validated_data.get('subtitle', instance.subtitle)
        instance.image = validated_data.get('image', instance.image)
        instance.content = validated_data.get('content', instance.content)
        instance.category = validated_data.get('category', instance.category)
        instance.date = validated_data.get('date', instance.date)
        instance.author = validated_data.get('author', instance.author)
        instance.save()
        return instance


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'author', 'content']


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ['id', 'author']
