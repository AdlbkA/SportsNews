from django.db.models.functions import Lower
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status, generics, permissions, mixins
from rest_framework.decorators import api_view, permission_classes
from django.db.models import Q
from rest_framework.permissions import IsAuthenticated

from .serializers import *
from .models import *
from rest_framework.response import Response
from rest_framework.views import APIView


class CategoriesList(APIView):

    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CategoryDetail(APIView):
    def get_object(self, pk):
        try:
            return Category.objects.get(pk=pk)
        except Category.DoesNotExist as e:
            return Response({'error': str(e)})

    def get(self, request, pk):
        category = self.get_object(pk=pk)
        serializer = CategorySerializer(category)
        return Response(serializer.data)

    def put(self, request, pk):
        category = self.get_object(pk)
        serializer = CategorySerializer(category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        category = self.get_object(pk)
        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class NewsList(APIView):
    def get(self, request):
        news = News.objects.all().order_by('-date')
        serializer = NewsSerializer(news, many=True)
        return Response(serializer.data)


class NewsDetail(APIView):
    def get_object(self, pk):
        try:
            return News.objects.get(pk=pk)
        except News.DoesNotExist as e:
            return Response({'error': str(e)})

    def get(self, request, pk):
        news = self.get_object(pk=pk)
        serializer = NewsSerializer(news)
        return Response(serializer.data)


class CommentsList(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Comment.objects.filter(news__pk=self.kwargs['pk'])

    def post(self, request, pk):
        content = request.data.get('content')
        user = request.user
        post = get_object_or_404(News, pk=pk)
        try:
            Comment.objects.create(author=user, content=content, news=post)
            return Response(status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class CommentDetail(generics.RetrieveAPIView, mixins.DestroyModelMixin):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Comment.objects.all()

    def put(self, request, *args, **kwargs):
        serializer = CommentSerializer(Comment.objects.get(pk=kwargs.get('pk')), data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_202_ACCEPTED)
        return Response(data=serializer.data, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, args, kwargs)


class LikeList(generics.ListAPIView):
    serializer_class = LikeSerializer

    def get_queryset(self):
        return Like.objects.filter(news__pk=self.kwargs['pk'])


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def like_news(request):
    author = request.user
    news_id = request.data.get('news_id')

    if not news_id:
        return Response(status=status.HTTP_400_BAD_REQUEST)

    try:
        news = News.objects.get(pk=news_id)
    except News.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    like = Like.objects.filter(author=author, news=news).first()
    if like:
        like.delete()
        return Response({'message': 'Like already exists.'}, status=status.HTTP_409_CONFLICT)

    like = Like.objects.create(author=author, news=news)
    return Response({'liked': True})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_news(request):
    if request.method == 'POST':
        title = request.data.get('title')
        image = request.data.get('image')
        subtitle = request.data.get('subtitle')
        content = request.data.get('content')
        category_id = request.data.get('category')
        author = request.user

        try:
            category = Category.objects.get(id=category_id)
            News.objects.create(title=title, image=image, subtitle=subtitle, content=content, category=category,
                                author=author)
            return Response(status=status.HTTP_201_CREATED)
        except Exception as e:
            print(request.data, request.user)
            return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def update_news(request, pk):
    news = get_object_or_404(News, id=pk, author=request.data['author'])

    if request.method == 'PUT':
        serializer = NewsSerializer(news, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        news.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
@csrf_exempt
def get_news_by_category(request, id):
    category = get_object_or_404(Category, pk=id)
    news = News.objects.filter(category=category)
    serializer = NewsSerializer(news, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@csrf_exempt
def search_news(request):
    query = request.GET.get('query', '')
    if query:
        news = News.objects.filter(Q(title__icontains=query))
        serializer = NewsSerializer(news, many=True)
        return Response(serializer.data)
