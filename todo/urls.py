from django.urls import path
from . import views

urlpatterns = [

    #url for APIView
    path('',views.MyTodosListCreateView.as_view()),
    path('todo/<str:pk>/', views.MyTodoDetailsView.as_view()),

    path('tasks/',views.MyTaskListCreateView.as_view()),
    path('tasks/<str:pk>/',views.MyTaskDetailView.as_view()),
  
]
