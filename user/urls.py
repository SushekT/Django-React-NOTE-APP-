from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

urlpatterns = [
    path('register/', views.RegisterAPI.as_view(), name='register'),

    path('create/', views.MyTokenObtainPairView.as_view(), name='token_obtain_view'),
    path('refreshtoken/', TokenRefreshView.as_view(), name='token_refresh'),
    path('verifytoken/', TokenVerifyView.as_view(), name='token_verify'),
    path('addacollaboration/<int:note_id>/',
         views.AddColloaborations.as_view(), name='create_collaboration'),
    path('editcollaborations/<int:pk>/',
         views.UpdateDeleteCollobaorations.as_view(), name='update_collaboration')
]
