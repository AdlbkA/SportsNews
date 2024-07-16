from django.contrib.auth import get_user_model
from django.db import IntegrityError
from rest_framework import generics, mixins, response, status
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import User
from .serializers import UserSerializer, CustomTokenObtainPairSerializer


class UserListView(generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get(self, request):
        return self.list(request)

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        try:
            user = get_user_model().objects.create(username=username)
            user.set_password(password)
            user.save()
            return response.Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
        except IntegrityError as e:
            return response.Response({'message': e}, status=status.HTTP_400_BAD_REQUEST)


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
