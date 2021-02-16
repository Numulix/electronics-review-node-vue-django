from django.urls import path
from . import views

app_name = 'electronics'

urlpatterns = [
    path('', views.home, name='home'),
    path('category-sums/', views.category_sums, name='category-sums'),
    path('top-reviewers/', views.top_reviewers, name='top-reviewers'),
    path('top-reviewed-products/', views.top_reviewed_products, name='top-reviewed-products'),
    path('product-table/', views.table_products, name='product-table'),
    path('add-category/', views.add_category, name='add-category'),
    path('add-product/', views.add_product, name='add-product'),
    path('edit-category/<int:id>/', views.edit_category, name='edit_category'),
    path('edit-product/<int:id>/', views.edit_product, name='edit_product')
]
