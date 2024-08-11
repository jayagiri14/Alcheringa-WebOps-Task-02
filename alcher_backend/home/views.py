from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Userdetails
import json

# Create your views here.
def index(request):
    return render(request,"index.html")

def getlocaldata(request):
    details=list(Userdetails.objects.values())
    return  JsonResponse(details,safe=False)

@csrf_exempt
def post_data(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
 
            userdetails_instance = Userdetails(name=data[0],username=data[1],email=data[2])
            userdetails_instance.save()
                    
            response = {'status': 'success', 'message': 'Data saved successfully'}
            
           
        except json.JSONDecodeError as e:
            response = {'status': 'error', 'message': f'Invalid JSON: {str(e)}'}
        except Exception as e:
            response = {'status': 'error', 'message': f'An error occurred: {str(e)}'}
    else:
        response = {'status': 'error', 'message': 'Only POST requests are allowed'}
    
    return JsonResponse(response)


@csrf_exempt
def postaddnew(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
 
            newuserdetails= Userdetails(name=data[0],username=data[1],email=data[2])
            newuserdetails.save()   
                    
            response = {'status': 'success', 'message': 'Data saved successfully'}
            
           
        except json.JSONDecodeError as e:
            response = {'status': 'error', 'message': f'Invalid JSON: {str(e)}'}
        except Exception as e:
            response = {'status': 'error', 'message': f'An error occurred: {str(e)}'}
    else:
        response = {'status': 'error', 'message': 'Only POST requests are allowed'}
    
    return JsonResponse(response)


