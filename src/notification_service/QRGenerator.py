import qrcode
from io import BytesIO

def generate_QR_code(booking_id):
    try:
        img = qrcode.make(booking_id)
        membuf = BytesIO()
        img.save(membuf,format="png")
        return membuf

    except Exception as e:
        print(f'caught {type(e)}: e')
        print(e)
        return False

