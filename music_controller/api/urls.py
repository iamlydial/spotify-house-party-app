from django.urls import path
from .views import RoomView, CreateRoomView, GetRoom, JoinRoom,  get_user_id

urlpatterns = [
    path("room/", RoomView.as_view()),
    path("create/", CreateRoomView.as_view()),
    path("room/<str:roomCode>", RoomView.as_view()),
    path("get-room/", GetRoom.as_view(),  name="get-room"),
    path("get-user-id/", get_user_id, name="get_user_id"),
    path("join", JoinRoom.as_view(), name="create")
]
