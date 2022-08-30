from django.urls import path, include
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'register', views.RegisterAPI)

urlpatterns = [
    path('create/', views.MyTokenObtainPairView.as_view(),
         name='token_obtain_view'),
    path('refreshtoken/', TokenRefreshView.as_view(), name='token_refresh'),
    path('verifytoken/', TokenVerifyView.as_view(), name='token_verify'),
    path('addacollaboration/<int:note_id>/',
         views.AddColloaborations.as_view(), name='create_collaboration'),
    path('editcollaborations/<int:pk>/',
         views.UpdateDeleteCollobaorations.as_view(), name='update_collaboration'),

    path('profile-update/',
         views.ProfileViewUpdate.as_view(), name='profile_update'),

    path('', include(router.urls)),

    path('users/', views.UserView.as_view(), name='collaboration_username')
]
