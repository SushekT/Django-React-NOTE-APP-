from django.db import models

# Create your models here.

class Todo(models.Model):

    body = models.CharField(max_length=100)
    completed = models.BooleanField(default=False)
    updated = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.body


class Task(models.Model):

    todo = models.ForeignKey('Todo', on_delete=models.CASCADE)
    task = models.TextField()
    checked = models.BooleanField(default=False)
    created = models.DateTimeField(null=True,blank=True,auto_now_add=True)

    def __str__(self):
        return f"{self.task} | {self.todo.body}"