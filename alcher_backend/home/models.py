from django.db import models

# Create your models here.
class Userdetails(models.Model):


    name=models.TextField(max_length=1000)
    username=models.TextField(max_length=1000)
    email=models.EmailField( max_length=254)
    def __str__(self):
        return self.name