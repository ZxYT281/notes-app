from django.urls import path

from notesapp.views import NoteView, UserNotes

urlpatterns = [
    path("note/", NoteView.as_view()),
    path("note/<int:id>/", NoteView.as_view()),
    path("note/<int:id>/delete", NoteView.as_view()),
    path("notes/", UserNotes.as_view())
]
