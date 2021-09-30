import picamera
import pyrebase
from mfrc522 import SimpleMFRC522 
from pyfingerprint.pyfingerprint import PyFingerprint

firebaseConfig = {

  "apiKey": "AIzaSyCNIxjGRDU73wVTfPSZYZg3TMCq47TBpdo",

  "authDomain": "test4-e0a6e.firebaseapp.com",

  "databaseURL": "https://test4-e0a6e-default-rtdb.firebaseio.com",

  "projectId": "test4-e0a6e",

  "storageBucket": "test4-e0a6e.appspot.com",

  "messagingSenderId": "837040724351",

  "appId": "1:837040724351:web:5d4ab2cf0b25798591224a"

}

rfid = SimpleMFRC522()
finger = PyFingerprint('/dev/ttyUSB0', 57600, 0xFFFFFFFF, 0x00000000)
firebase = pyrebase.initialize_app(firebaseConfig)
db = firebase.database()
finger.clearDatabase()

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
