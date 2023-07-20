import random
import smtplib
from datetime import datetime, timedelta
import mailtrap as mt

def generate_pin():
    digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    pin = ''

    for _ in range(6):
        random_index = random.randint(0, len(digits) - 1)
        digit = digits[random_index]
        digits.pop(random_index)
        pin += str(digit)

    return pin

pin = generate_pin()
print(pin)


def send_email(recipient, pin):
    # SMTP configuration for sending email
    smtp_host = 'smtp.mail.yahoo.com'
    smtp_port = 587
    sender_email = 'a_tomaaa@yahoo.com'
    sender_password = ''

    # Compose the email message
    subject = '2FA Code'
    message = f'Your 2FA code is: {pin}. This code will expire in 3 minutes.'

    # Connect to the SMTP server
    server = smtplib.SMTP(smtp_host, smtp_port)
    server.starttls()
    server.login(sender_email, sender_password)

    # Send the email
    server.sendmail(sender_email, recipient, f'Subject: {subject}\n\n{message}')
    server.quit()

def verify_pin(user_pin, entered_pin):
    # Compare the entered PIN with the user's PIN
    return user_pin == entered_pin

# Generate a PIN and send it via email
pin = generate_pin()
recipient_email = 'a_tomaaa@yahoo.com'
send_email(recipient_email, pin)

# Prompt the user to enter the PIN
entered_pin = input('Enter the 6-digit PIN received via email: ')

# Verify the entered PIN and check for expiration
if verify_pin(pin, entered_pin):
    current_time = datetime.now()
    expiration_time = current_time + timedelta(minutes=3)
    if current_time <= expiration_time:
        print('PIN verification successful. Access granted.')
    else:
        print('PIN has expired. Access denied.')
else:
    print('PIN verification failed. Access denied.')
