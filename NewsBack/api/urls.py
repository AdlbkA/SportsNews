from django.urls import path, include
from .views import *

urlpatterns = [
    path('categories/', CategoriesList.as_view(), name='category_list'),
    path('news/', NewsList.as_view(), name='news_list'),
    path('news/<int:pk>', NewsDetail.as_view(), name='news_detail'),
    path('comments/<int:pk>', CommentsList.as_view(), name='comments_list'),
    path('comments/detail/<int:pk>', CommentDetail.as_view(), name='comment_detail'),
    path('like/', like_news),
    path('likes/<int:pk>', LikeList.as_view()),
    path('post/', create_news),
    path('post/<int:id>', update_news),
    path('news_category/<int:id>', get_news_by_category),
    path('search/', search_news),
]
