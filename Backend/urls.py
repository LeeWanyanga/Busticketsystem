from django.contrib import admin
from django.urls import re_path

from Backend import views

urlpatterns = [
    # path('admin/', admin.site.urls),
    re_path(r'^ticket$',views.busticketApi),
    re_path(r'^ticket$',views.busticketApi),
    re_path(r'^ticket/([0-9]+)$',views.busticketApi),
    re_path('admin/', admin.site.urls),
]
