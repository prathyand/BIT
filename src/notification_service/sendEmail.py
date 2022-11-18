import smtplib, ssl
from email.message import EmailMessage
from QRGenerator import generate_QR_code

SSLPORT = 465 
PWD = 'lgugznawuemiyomm'
BODY="""\
Hello!

YOUR BOOKING DETAILS:
Booking id: {}
Movie: {}
Theatre name: {}
No of seats: {}
Date: {}

QR code is attched to this email!

Thank you,
TeamTheBIT
"""

def sendmail(details):
    # details={'email':'prathyand@gmail.com', 'booking_id': '1234567','moviename':'James Bond','theatre':'abc cinema','seats':5,'date':'10/12/2022'}
    try:
        context = ssl.create_default_context()

        newMessage = EmailMessage()                         
        newMessage['Subject'] = "Your booking details" 
        newMessage['From'] = "thebitteam4@gmail.com"  
        newMessage['To'] = details['email']  


        newMessage.set_content(BODY.format(details['booking_id'],details['moviename'],details['theatre'],details['seats'],details['date'])) 

        membuf=generate_QR_code(details['booking_id'])

        newMessage.add_attachment(membuf.getvalue(), maintype='image', subtype='png',filename='bookingQR.png')

        with smtplib.SMTP_SSL("smtp.gmail.com", SSLPORT, context=context) as server:
                server.login("thebitteam4@gmail.com", PWD)
                server.send_message(newMessage)

    except Exception as e:
        print(e)

# sendmail(None)