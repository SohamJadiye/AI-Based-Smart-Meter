import datetime
import mysql.connector
from flask import Flask,render_template,jsonify,redirect,request, session
import smtplib
from email.mime.text import MIMEText
import json, base64
import urllib.request
from random import choice
import time
s = smtplib.SMTP('smtp.gmail.com', 587)

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="*Sor7jad*",
  auth_plugin='mysql_native_password',
  database="smart_home"
)
app = Flask(__name__)

@app.route('/')
def homepage():
    return render_template('Home.html')

@app.route('/overview')
def overview():
    
    return render_template('overview.html')
    

@app.route('/login', methods=['POST', 'GET'])
def login():
    
    if request.method == 'POST':
        
        pno = request.form['pno']
        userid = request.form['userid']
        password = request.form['password']
        mycursor1 = mydb.cursor()
        mycursor1.execute('SELECT * FROM Users WHERE phone_number = %s AND login_password = %s AND userid = %s', (pno, password,userid))
        account = mycursor1.fetchone()
       
        if account:
            return redirect('/overview')
        else:
            # Account doesnt exist or username/password incorrect
            return render_template('login.html')
        
    return render_template('login.html')



@app.route('/new_account', methods=['POST', 'GET'])
def create():
    if request.method == 'POST':
        emailid = request.form['emailid']
        username = request.form['fname']
        lastname = request.form['lname']
        pno = request.form['pno']
        password = request.form['password']
        mycursor = mydb.cursor()
        
        sql = 'INSERT INTO Users(Email_Id, FirstName, LastName, Login_Password, Phone_number) VALUES (%s, %s, %s, %s, %s)'
        values = (emailid, username, lastname, password, pno)
        mycursor.execute(sql, values)
        mydb.commit()
        mycursor.execute("SELECT userid FROM Users WHERE Phone_Number = %s", (pno,))        
        userid = mycursor.fetchone()
        sender_email = "sohamjadiye@gmail.com"
        receiver_email = emailid
        subject = "Login Credentials"
        
        
       
        
        body = f"UserId :{userid}"

        # Create a MIMEText object
        message = MIMEText(body)
        message["Subject"] = subject
        message["From"] = sender_email
        message["To"] = receiver_email

        # SMTP server configuration
        smtp_server = "smtp.gmail.com"
        smtp_port = 587
      

        # Create an SMTP session
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login("sohamjadiye@gmail.com", "hncv cwct smwz yqlk")

        # Send the email
        server.sendmail(sender_email, receiver_email, message.as_string())

        # Quit the SMTP session
        server.quit()
        mycursor.close()
       
        
        return redirect('/login')
        
       
        
    return render_template('new_account.html')

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





@app.route('/api/update/<string:data>', methods=['GET','POST'])
def update_values(data):
    
    
        data = decode(data)
        
        
        if (len(data) == 6) and (type(data) is list):
                mycursor2 = mydb.cursor()
               
                userid = data[0]
                Temperature = data[1]
                Current = data[2]
                Voltage = data[3]
                Humidity = data[4]
                times = data[5]
                print(data)
                
                sql = 'INSERT INTO Information(fk_Userid,Temperature,Current,Voltage,Humidity,Timestamp) VALUES (%s, %s, %s, %s, %s,%s)'
                values = (userid,Temperature, Current, Voltage,Humidity,times)
                mycursor2.execute(sql, values)
                mydb.commit()
                return ("Values Updated")
        else:
                return "Data Decoding Error!"
        

    
    
@app.route('/api/data',methods=['GET', 'POST'])
def data():
    query = 'Select * from information where fk_userid = 1 order by timestamp desc limit 1'
    mycursor3 = mydb.cursor()
    mycursor3.execute(query)
    data1 = mycursor3.fetchone()
    print(data1)
   
    return jsonify(data1);


randlist = [i for i in range(0, 100)]

@app.route("/api/temperature", methods=["GET", "POST"])
def get_temperature():
    
    randData = choice(randlist)
    time = datetime.now()
    time = time.strftime("%H:%M:%S")
    response = [time, randData]
    return jsonify(response)

@app.route("/api/current", methods=["GET", "POST"])
def get_current():
    
    randData = choice(randlist)
    time = datetime.now()
    time = time.strftime("%H:%M:%S")
    response = [time, randData]
    return jsonify(response)

@app.route("/api/humidity", methods=["GET", "POST"])
def get_humidity():
    
    randData = choice(randlist)
    time = datetime.now()
    time = time.strftime("%H:%M:%S")
    response = [time, randData]
    return jsonify(response)

@app.route("/api/voltage", methods=["GET", "POST"])
def get_voltage():
    
    randData = choice(randlist)
    time = datetime.now()
    time = time.strftime("%H:%M:%S")
    response = [time, randData]
    return jsonify(response)


    




if __name__ == '__main__':
    app.run(debug=True)