from django.urls import path
from . import views

urlpatterns = [
    path('', views.MyNotesListView.as_view()),
    path('<str:pk>/', views.MyNotesDetailView.as_view()),
  
]
