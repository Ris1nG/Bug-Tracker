from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Code, User

# Create your views here.

# Log user in the Bug tracker
@csrf_exempt
def homepage(request):
    if request.user.is_authenticated:
        return redirect('dashboard')
    if request.method == "POST" and "login" in request.POST:
        username = request.POST.get('username')
        password = request.POST.get('password')
        if username != "" and password != "":
            user = authenticate(username = username, password = password)
            if user is None:
                try:
                    obj = User.objects.get(email = username)
                    user = authenticate(username = obj.username, password = password)
                except:
                    return JsonResponse({'status': 404})
            if user is not None:
                login(request, user)
                return JsonResponse({'status': 200})
        else:
            return JsonResponse({'status': 400})
    elif request.method == "POST" and "signup" in request.POST:
        signup(request)
    return render(request, 'authentication/homepage.html')

# Register a user at the DB
def signup(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    email = request.POST.get('email')
    try:
        if User.objects.filter(email = email).count() >= 1:
            raise ValueError
        user = User()
        user.username = username
        user.set_password(password)
        user.email = email
        user.save()
        user = authenticate(username = username, password = password)
        login(request, user)
        return JsonResponse({'status': 200})
    except:
        return JsonResponse({'status': 400})