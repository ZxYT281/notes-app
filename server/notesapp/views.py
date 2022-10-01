from django.http import HttpRequest
from django.shortcuts import get_object_or_404
from userauth.views import APIView, get_user_from_token
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied, APIException
from notesapp.models import Note
from notesapp.serializers import NoteSerializer


class NoteView(APIView):

    def get(self, request: HttpRequest, id: int):
        note = get_object_or_404(Note, id=id)
        if not note.is_public:
            user = get_user_from_token(request)
            if note.user == user:
                return Response(NoteSerializer(note).data)
            raise PermissionDenied("You do not have access to the note")
        else:
            return Response(NoteSerializer(note).data)

    def post(self, request: HttpRequest, id: int = None):
        if id is not None:
            raise APIException("Cannot do that")
        user = get_user_from_token(request)
        data = request.data
        data['user'] = user.id

        serializer = NoteSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        else:
            return Response(serializer.data, status=400)

    def delete(Self, request: HttpRequest, id: int):
        note = get_object_or_404(Note, id=id)
        user = get_user_from_token(request)
        if not note.user == user:
            raise PermissionDenied("Forbidden")

        note.delete()
        return Response({"message": "success"}, 200)


class UserNotes(APIView):

    def get(self, request):
        user = get_user_from_token(request)
        notes = Note.objects.filter(user=user).order_by("-timestamp")
        serializer = NoteSerializer(notes, many=True)

        return Response(serializer.data)
