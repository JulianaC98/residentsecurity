import picamera
import RPi.GPIO as GPIO
import time
import pyrebase
from mfrc522 import SimpleMFRC522 
from pyfingerprint.pyfingerprint import PyFingerprint

firebaseConfig = {

  "apiKey": "AIzaSyDfcI-msQyaezXdlWtkr_WQDMjQTyPXiMw",

  "authDomain": "residentsecurity-5f4ec.firebaseapp.com",

  "databaseURL": "https://residentsecurity-5f4ec-default-rtdb.firebaseio.com",

  "projectId": "residentsecurity-5f4ec",

  "storageBucket": "residentsecurity-5f4ec.appspot.com",

  "messagingSenderId": "1060748774683",

  "appId": "1:1060748774683:web:f02f4bf9848570ed9897be"

}
i=0
GPIO.setwarnings(False)
GPIO.setup(21, GPIO.OUT)
rfid = SimpleMFRC522()
finger = PyFingerprint('/dev/ttyUSB0', 57600, 0xFFFFFFFF, 0x00000000)
firebase = pyrebase.initialize_app(firebaseConfig)
db = firebase.database()
finger.clearDatabase()

def newResident():
    casa = db.child("temp").child("casa").get()
    idu = rfid.read_id()
    db.child("residentes").child(casa.val()).update({"id":idu})
    readFingerprint = False
    while readFingerprint == False:
        rim = finger.readImage()
        if rim == True :
            finger.convertImage(0x01)
            huella = finger.downloadCharacteristics()
            db.child("residentes").child(casa.val()).update({"huella":huella})
            readFingerprint = True
            del rim		
            del idu
    db.child("temp").set({"finNewRes":"0"})

while True:

    newRes = db.child("temp").child("flagNewRes").get()
    actuador = db.child("actuador").get()

    #with picamera.PiCamera() as camera:
    #camera.capture('/home/pi/securitysystem/img.jpg')

    id = rfid.read_id_no_block()
    rim = finger.readImage()
    
    if actuador == "1" :
        #se activa un pin para el motor
        GPIO.output(21, GPIO.HIGH)
        inicio = time.time()
        
        if i < 100000:
            i = i+1
        else :
            i=0
            db.update({"actuador" : "0"})
            final = time.time()
    else:
        GPIO.output(21, GPIO.LOW)
    if newRes == "1":
        newResident()

    if id != None :
        now = time.localtime()
        current_time = time.strftime("%H:%M:%S", now)
        
        #dbId = db.child("residentes").get()
        
    elif rim == True :
        print("HUELLA")
        finger.convertImage(0x01)
        huella = finger.downloadCharacteristics()
        print(huella)
        db.child("huella").set(huella)
print("finished")
