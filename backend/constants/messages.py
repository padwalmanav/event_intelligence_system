send_subject_to_user = "Thanks for signing up for EventSIQ 🚀"
send_subject_to_admin = "Congrats You have got a new user!"

def send_confirmation_body_to_user(first_name:str):
    return f""" 
        Hi {first_name},

        Thanks for signing up for myEventsIQ!

        Your account is now active, and you’re ready to start using EventSIQ to gain meaningful insights from your event data.

        🔐 Access your dashboard:  
        https://myeventsiq.com

        If you run into any issues or have feedback, we’d love to hear from you — just reply to this email.

        Best regards,  
        The myEventsIQ Team  

        myeventsiq.com
    """

def send_confirmation_body_to_admin(user_count: int):
    return f"""
        Hi,

        You have got a new user on myeventsiq.com
        Total users: {user_count}
    """