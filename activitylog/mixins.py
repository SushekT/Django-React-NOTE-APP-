import logging

from backend import settings
from django.contrib.contenttypes.models import ContentType

from rest_framework.exceptions import ValidationError

from .models import ActivityLog
from .constants import READ, CREATE, UPDATE, DELETE, SUCCESS, FAILED


class ActivityLogMixins:
    """
    Mixin to track user actions

    :cvar log_message:
        Log message to populate remarks in LogAction
        type --> str
        set this value or override get_log_message
        If not set then, default log message is generated
    """

    log_message = None

    def _get_action_type(self, request) -> str:
        return self.action_type_mapper().get(f"{request.method.upper()}")

    def _build_log_messsage(self, request) -> str:
        return f"User: {self._get_user(request)} -- Action Type: {self._get_action_type(request)}"

    def get_log_message(self, request) -> str:
        return self.log_message or self._build_log_messsage(request)

    @staticmethod
    def action_type_mapper():
        return {
            "GET": READ,
            "POST": CREATE,
            "PUT": UPDATE,
            "PATCH": UPDATE,
            "DELETE": DELETE,
        }

    @staticmethod
    def _get_user(request):
        return request.user if request.user.is_authenticated else None

    def _write_log(self, request, response):
        status = SUCCESS if response.status_code < 400 else FAILED
        actor = self._get_user(request)

        if actor and not getattr(settings, "TESTING", False):
            logging.info("Started Log Entry")

            data = {
                "actor": actor,
                "action_type": self._get_action_type(request),
                "status": status,
                "remarks": self.get_log_message(request),
            }
            try:
                data["content_type"] = ContentType.objects.get_for_model(
                    self.get_queryset().model
                )
                data["content_object"] = self.get_object()
            except (AttributeError, ValidationError):
                data["content_type"] = None
            except AssertionError:
                pass

            ActivityLog.objects.create(**data)

    def finalize_response(self, request, *args, **kwargs):
        response = super().finalize_response(request, *args, **kwargs)
        self._write_log(request, response)
        return response
