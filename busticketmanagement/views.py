from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from Busticketsystem.busticketmanagement.serializers import TicketSerializer
from Busticketsystem.busticketmanagement.models import Ticket
@csrf_exempt

def busticketApi(request,id=0):
    if request.method=='GET':
        ticket = Ticket.objects.all()
        ticket_serializer=TicketSerializer(ticket,many=True)
        return JsonResponse(ticket_serializer.data,safe=False)
    
    elif request.method=='POST':
        ticket_data=JSONParser().parse(request)
        ticket_serializer=TicketSerializer(data=ticket_data)
        if ticket_serializer.is_valid():
            ticket_serializer.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed to Add",safe=False)
    
    elif request.method=='PUT':
        ticket_data=JSONParser().parse(request)
        ticket=Ticket.objects.get(id=id)
        ticket_serializer=TicketSerializer(ticket,data=ticket_data)
        if ticket_serializer.is_valid():
            ticket_serializer.save()
            return JsonResponse("Updated Successfully",safe=False)
        return JsonResponse("Failed to Update")
    
    elif request.method=='DELETE':
        ticket=Ticket.objects.get(id=id)
        ticket.delete()
        return JsonResponse("Deleted Successfully",safe=False)
    