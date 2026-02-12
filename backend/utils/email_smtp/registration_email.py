import os
import smtplib
from email.message import EmailMessage
import ssl
from dotenv import load_dotenv
load_dotenv()

def send_registration_email(receiver_email:str, subject: str, body:str):
    smtp_server = "smtp.gmail.com"
    smtp_port = 587
    sender_email = os.getenv("SENDER_EMAIL")
    sender_password = os.getenv("SENDER_APP_PASSWORD")

    context = ssl.create_default_context()

    try:
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls(context=context)
            server.login(sender_email, sender_password)
            
            msg = EmailMessage()
            msg.set_content(body)
            msg['Subject'] = subject
            msg['From'] = sender_email
            msg['To'] = receiver_email
            
            msg.set_content("Welcome to MyEventsIQ! Your email client does not support HTML.")

            msg.add_alternative(body, subtype="html")
            
            server.send_message(msg)
        print(f"Email sent successfully")

    except smtplib.SMTPAuthenticationError:
        print("Authentication failed. Check your email and App Password.")
    except Exception as e:
        print(f"An error occurred: {e}")
