from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView


# Create your views here.
class DeleteAccount(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        user = self.request.user
        user.delete()

        return Response(
            {"result": "user deleted"},
            status=status.HTTP_200_OK,
        )
