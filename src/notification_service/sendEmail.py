import smtplib, ssl
from email.message import EmailMessage
from QRGenerator import generate_QR_code

SSLPORT = 465 
PWD = 'lgugznawuemiyomm'
BODY_booking="""\
Hello {},

YOUR BOOKING DETAILS:
Booking id: {}
Movie: {}
Theater name: {}
seats {}
Reservation date: {}
Reservation time: {}

The QR code is attched to this email!

Thank you,
TeamTheBIT
"""

BODY_passwd="""\
Hello,

YOUR ACCOUNT CREDENTIAL DETAILS:
email: {}
password: {}

Please login with the above credentials and change your password ASAP

Thank you,
TeamTheBIT
"""

def sendmail(details):
    # details={
    #     "email": "prathyand@gmail.com",
    #     "fname": "prath",
    #     "lname": "mesh",
    #     "booking_id": "6389e03431514845fcbc433f",
    #     "moviename": "Dodgeball",
    #     "theater": "amc12",
    #     "seats": 2,
    #     "price": "$20",
    #     "reservation_date": "2022-12-10",
    #     "reservation_time": "9:00",
    #     "seatIDs": "A23,B56"
    # }
    try:
        context = ssl.create_default_context()

        newMessage = EmailMessage() 
        if(len(details)>5):
            newMessage['Subject'] = "Booking Confirmation-Team TheBIT" 
            newMessage.set_content(BODY_booking.format(details['fname'],details['booking_id'],details['moviename'],details['theater'],
                details['seatIDs'],details['reservation_date'],details['reservation_time'])) 
            membuf=generate_QR_code(details['booking_id'])
            newMessage.add_attachment(membuf.getvalue(), maintype='image', subtype='png',filename='bookingQR.png')
        else:
            newMessage['Subject'] = "Password reset request-Team TheBIT" 
            newMessage.set_content(BODY_passwd.format(details['email'],details['password'])) 

        newMessage['From'] = "thebitteam4@gmail.com"  
        newMessage['To'] = details['email']  

        with smtplib.SMTP_SSL("smtp.gmail.com", SSLPORT, context=context) as server:
                server.login("thebitteam4@gmail.com", PWD)
                server.send_message(newMessage)

    except Exception as e:
        print("following exception in sendEmail.py")
        print(e)

# sendmail(None)