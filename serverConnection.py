from __future__ import print_function
import paho.mqtt.publish as publish
from time import sleep
import time
import smbus
import sys
from mfrc522 import SimpleMFRC522 

rfid = SimpleMFRC522()

channelID = "1521096"
apiKey = "0BST5UWELOY5XSM3"

useUnsecuredTCP = False
useUnsecuredWebsockets = False
useSSLWebsockets = True

mqttHost = "mqtt.thingspeak.com"

if useUnsecuredTCP:
    tTransport = "tcp"
    tPort = 1883
    tTLS = None

if useUnsecuredWebsockets:
    tTransport = "websockets"
    tPort = 80
    tTLS = None

if useSSLWebsockets:
    import ssl
    tTransport = "websockets"
    tTLS = {'ca_certs':"/etc/ssl/certs/ca-certificates.crt",'tls_version':ssl.PROTOCOL_TLSv1}
    tPort = 443
        
topic = "channels/" + channelID + "/publish/" + apiKey

hora = ""

while(True):
    
    id = rfid.read_id_no_block()
    
    if id != None:
        now = time.localtime()
        hora = time.strftime("%H", now)
        print(hora)
        tPayload = "field1=" + str(hora)
        try:
            publish.single(topic, payload=tPayload, hostname=mqttHost, port=tPort, tls=tTLS, transport=tTransport)

        except (KeyboardInterrupt):
            break
