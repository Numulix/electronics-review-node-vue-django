from django.shortcuts import render, redirect, get_object_or_404
from .models import *
from django.db.models import Sum
from .forms import *
from random import randint

# Create your views here.
def home(request):
    categories = Category.objects.all()
    num_of_products_per_category = []
    colors = []
    for c in categories:
        num_of_products_per_category.append(c.product_set.count())
        colors.append(f'{randint(0, 256)}, {randint(0, 256)}, {randint(0, 256)}')
    return render(request, 'electronics/home.html', { 'categories': categories,
                                                      'num_of_products': num_of_products_per_category,
                                                      'colors': colors })


def category_sums(request):
    categories = Category.objects.all()
    sums = []
    colors = []
    for c in categories:
        if type(c.product_set.aggregate(Sum('price'))['price__sum']).__name__ == 'NoneType':
            sums.append(0)
        else:
            sums.append(c.product_set.aggregate(Sum('price'))['price__sum'])
        colors.append(f'{randint(0, 256)}, {randint(0, 256)}, {randint(0, 256)}')
    return render(request, 'electronics/cat_sums.html', { 'categories': categories,
                                                          'sums': sums,
                                                          'colors': colors })


def top_reviewers(request):
    users = Users.objects.all()[:5]
    user_reviews = []
    colors = []
    for u in users:
        user_reviews.append(u.productreview_set.count())
        colors.append(f'{randint(0, 256)}, {randint(0, 256)}, {randint(0, 256)}')
    users = [x for _, x in sorted(zip(user_reviews, users), key=lambda pair: pair[0], reverse=True)]
    return render(request, 'electronics/top_reviewers.html', { 'users': users,
                                                               'user_reviews': sorted(user_reviews, reverse=True),
                                                               'colors': colors })


def top_reviewed_products(request):
    products = Product.objects.all()[:10]
    prod_review_count = []
    colors = []
    for p in products:
        prod_review_count.append(p.productreview_set.count())
        colors.append(f'{randint(0, 256)}, {randint(0, 256)}, {randint(0, 256)}')
    products = [x for _, x in sorted(zip(prod_review_count, products), key=lambda pair: pair[0], reverse=True)]
    return render(request, 'electronics/product_reviews.html', { 'products': products,
                                                                 'prod_review_count': sorted(prod_review_count, reverse=True),
                                                                 'colors': colors })


def table_products(request):
    products = Product.objects.all()
    return render(request, 'electronics/product_table.html', { 'products': products })
