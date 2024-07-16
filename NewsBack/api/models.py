from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class Category(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return f'{self.pk}, {self.name}'

    class Meta:
        verbose_name_plural = 'Categories'


class News(models.Model):
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255)
    image = models.TextField(null=True, blank=True)
    content = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    author = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.pk}, {self.title}'

    class Meta:
        verbose_name_plural = 'News'


class Comment(models.Model):
    author = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    news = models.ForeignKey(News, on_delete=models.CASCADE)
    content = models.TextField(null=False, blank=False)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.pk}, {self.author}'

    class Meta:
        verbose_name_plural = 'Comments'


class Like(models.Model):
    author = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    news = models.ForeignKey(News, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.pk}, {self.author}, {self.news}'

    class Meta:
        verbose_name_plural = 'Likes'

