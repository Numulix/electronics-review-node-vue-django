from django.urls import path
from . import views

app_name = 'electronics'

urlpatterns = [
    path('', views.home, name='home'),
    path('category-sums', views.category_sums, name='category-sums'),
    path('top-reviewers', views.top_reviewers, name='top-reviewers')
]
