from django.contrib import admin
from .models import Users, Category, Product, ProductReview

# Register your models here.
admin.site.register(Users)
admin.site.register(Category)
admin.site.register(Product)
admin.site.register(ProductReview)
