from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import generics,status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework import filters
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import BasicAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication

from .serializers import TaskSerializer, TodosSerializer
from .models import *



##USING GENERICS APIVIEW
class MyTodosListCreateView(generics.ListCreateAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodosSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['body', ]
    ordering_fields = ['updated', ]
    authentication_classes = [JWTAuthentication,BasicAuthentication,]
    permission_classes = [IsAuthenticated, ]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class MyTodoDetailsView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodosSerializer
    authentication_classes = [JWTAuthentication, BasicAuthentication, ]
    permission_classes = [IsAuthenticated,]

class MyTaskListCreateView(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def post(self,request):
        id = request.data.get('id')
        task = request.data['task']
        
        todo = Todo.objects.get(id=id)
        task =Task.objects.create(
            todo=todo,
            task = task,
        )
        serializer = TaskSerializer(task,many=False)

        return Response(serializer.data)

class MyTaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


## USING APIVIEW
# class MyTodosList(APIView):

#     def get(self, request, pk=None,format=None):

#         if pk is not None:
#             todo = Todo.objects.get(id=pk)
#             serializer = TodosSerializer(todo,many=False)
#             return Response(serializer.data)
            
#         todos = Todo.objects.all()
#         serializer = TodosSerializer(todos, many=True)

#         return Response(serializer.data)


#     def post(self,request,pk=None,format=None):

#         serializer = TodosSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response({'msg':'Todo Created'}, status=status.HTTP_201_CREATED)

#         return Response({'msg':'Error Occurred'},status=status.HTTP_400_BAD_REQUEST)

#     def put(self,request,pk,format=None):
#         todo = Todo.objects.get(id=pk)
#         serializer = TodosSerializer(todo,data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response({'msg':'Todo Updated'})

#         return Response(serializer.error,status=status.HTTP_400_BAD_REQUEST)

#     def delete(self,request,pk,format=None):
#         todo = Todo.objects.get(id=pk)
#         todo.delete()
#         return Response({'msg':'Todo Deleted'})




# class MyTaskList(APIView):

#     def get(self,pk=None,forma=None):

#         if pk is not None:
#             todo = Todo.objects.get(id=pk)
#             tasks = Task.objects.filter(todo=todo)
#             serializer = TaskSerializer(tasks,many=True)

#             return Response(serializer.data)
        
#         task = Task.objects.all()
#         serializer = TaskSerializer(task,many=True)
#         return Response(serializer.data)


#     def post(self,request,pk=None):
 
#         serializer = TaskSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
            
#         return Response({'msg',{'task created'}})
