# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Category(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=64)

    class Meta:
        managed = False
        db_table = 'category'


class Product(models.Model):
    id = models.IntegerField(primary_key=True)
    product_name = models.CharField(max_length=255)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    product_description = models.TextField()
    price = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'product'


class Users(models.Model):
    id = models.IntegerField(primary_key=True)
    username = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    admin = models.IntegerField()
    registered = models.DateTimeField()
    last_login = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'users'


class ProductReview(models.Model):
    id = models.IntegerField(primary_key=True)
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    review_text = models.TextField()
    posted_date = models.DateTimeField()
    last_updated = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'product_review'


