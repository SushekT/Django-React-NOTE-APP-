from rest_framework import serializers
from rest_framework.fields import ReadOnlyField

from .models import *


class TaskSerializer(serializers.ModelSerializer): 
    class Meta:
        model = Task
        fields = (
            'id',
            'task',
            'checked',
        )


class TodosSerializer(serializers.ModelSerializer):
    todo_task = serializers.SerializerMethodField()

    class Meta:
        model = Todo
        fields = (
            'id',
            'body',
            'completed',
            'updated',
            'todo_task',
        )

    def get_todo_task(self, todo):
        return TaskSerializer(todo.task_set.all(), many=True).data
