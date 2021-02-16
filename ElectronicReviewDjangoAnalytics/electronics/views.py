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


def add_category(request):
    if request.method == 'POST':
        form = CategoryForm(request.POST or None)

        if form.is_valid():
            data = form.save(commit=False)
            data.save()
            return redirect('electronics:home')
    else:
        form = CategoryForm()
    return render(request, 'electronics/add_category.html', { 'form': form, 'controller': 'Add Category' })


def add_product(request):
    if request.method == 'POST':
        form = ProductForm(request.POST or None)

        if form.is_valid():
            data = form.save(commit=False)
            data.save()
            return redirect('electronics:home')
    else:
        form = ProductForm()
    return render(request, 'electronics/add_product.html', { 'form': form, 'controller': 'Add Product' })


def edit_category(request, id):
    cat = get_object_or_404(Category, pk=id)

    if request.method == 'POST':
        form = CategoryForm(request.POST or None, instance=cat)

        if form.is_valid():
            data = form.save(commit=False)
            data.save()
            return redirect('electronics:home')
    else:
        form = CategoryForm(instance=cat)
    return render(request, 'electronics/add_category.html', { 'form': form, 'controller': 'Edit Category' })


def edit_product(request, id):
    prod = get_object_or_404(Product, pk=id)

    if request.method == 'POST':
        form = ProductForm(request.POST or None, instance=prod)

        if form.is_valid():
            data = form.save(commit=False)
            data.save()
            return redirect('electronics:home')
    else:
        form = ProductForm(instance=prod)
    return render(request, 'electronics/add_product.html', { 'form': form, 'controller': 'Edit Product' })


def list_data(request):
    categories = Category.objects.all()
    products = Product.objects.all()
    return render(request, 'electronics/list_data.html', { 'categories': categories, 'products': products })


def delete_category(request, id):
    category = get_object_or_404(Category, pk=id)
    category.delete()
    return redirect('electronics:list-data')



def delete_product(request, id):
    product = get_object_or_404(Product, pk=id)
    product.delete()
    return redirect('electronics:list-data')