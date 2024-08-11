from django.contrib import admin
from django.urls import path,include
from home import views

urlpatterns = [

    path("",views.index,name="home"),
    path('post-data/', views.post_data, name='post-data'),
    path("getlocaldata/",views.getlocaldata,name="getlocaldata"),
    path("postaddnew/",views.postaddnew,name="postaddnew")    

]
