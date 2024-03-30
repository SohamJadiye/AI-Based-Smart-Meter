import json, base64
import urllib.request
from random import choice
import time
import datetime

def encode(data):
    data = json.dumps(data)
    message_bytes = data.encode('ascii')
    base64_bytes = base64.b64encode(message_bytes)
    base64_message = base64_bytes.decode('ascii')
    return base64_message

def decode(base64_message):
    base64_bytes = base64_message.encode('ascii')
    message_bytes = base64.b64decode(base64_bytes)
    message = message_bytes.decode('ascii')
    return json.loads(message)

import datetime
from datetime import datetime






randlist = [i for i in range(0, 100)]


i=1
while 1:
    
        
        current_time = datetime.now()
        times = current_time.strftime("%H:%M:%S")
        mydata = ['1', choice(randlist), choice(randlist), choice(randlist), choice(randlist),i]
        i=i+1
        print(mydata)
        a = encode(mydata)
        
        url = 'http://127.0.0.1:5000/api/update/{}'.format(a)
        response = urllib.request.urlopen(url)
        print("[data]: "+ str(mydata))
        print("[Encoded Value]: "+ a)
        print("[url]: "+ url)
        html = response.read()
        print("[output]: " + str(html))
        time.sleep(2)
   
