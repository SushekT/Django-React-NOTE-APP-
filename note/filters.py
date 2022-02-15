import django_filters

from note.models import Note


class NoteFilter(django_filters.rest_framework.FilterSet):
    body = django_filters.CharFilter(
        field_name='body', lookup_expr='iexact')

    class Meta:
        model = Note
        fields = ['body', 'updated', ]
