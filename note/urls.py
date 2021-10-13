from django.urls import path
from . import views

urlpatterns = [


    path('create', views.createNote, name='createNote'),
    path('', views.getNote, name='getNote'),
    path('details/<str:pk>', views.getDetailNote, name='getDetailNote'),
    path('update/<str:pk>', views.updateNote, name='updateNote'),
    path('delete/<str:pk>', views.deleteNote, name='deleteNote'),
    

]
