from django.urls import path
from .views import RoomView, CreateRoomView, GetRoom, JoinRoom, UserInRoomView, LeaveRoom, UpdateRoom

urlpatterns = [
    path("room/", RoomView.as_view()),
    path("create/", CreateRoomView.as_view()),
    path("room/<str:roomCode>", RoomView.as_view()),
    path("get-room/", GetRoom.as_view(),  name="get-room"),
    path("join", JoinRoom.as_view(), name="create"),
    path("user-in-room", UserInRoomView.as_view(), name="user-in-room"),
    path("leave-room", LeaveRoom.as_view(), name="leave-room"),
    path("update-room", UpdateRoom.as_view(), name="update-room"),
]
