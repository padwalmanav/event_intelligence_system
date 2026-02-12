send_subject_to_user = "Welcome to MyEventsIQ: Driving Growth with Actionable Intelligence"
send_subject_to_admin = "Congrats You have got a new user!"

def send_confirmation_body_to_user(first_name: str):
    return f"""
    <p>Dear {first_name},</p>

    <p>
    Welcome to <strong>MyEventsIQ!</strong> Your account is now active, and you’re one step closer to moving 
    <strong>from scattered data to actionable intelligence.</strong>
    </p>

    <p>
    We don’t just track events; we centralize and enrich data so your Sales, Marketing, and Strategy teams know exactly where to engage. 
    As you explore the platform, keep an eye on our proprietary metrics designed to help you prioritize your resources:
    </p>

    <ul>
        <li>
            <strong>Event Intelligence &amp; Density Score:</strong> 
            Identify which events have the highest concentration of relevant opportunities.
        </li>
        <li>
            <strong>Decision Maker Density Score:</strong> 
            Stop guessing who is in the room; we pinpoint the concentration of high-level stakeholders.
        </li>
        <li>
            <strong>ROI Indicators &amp; Success Metrics:</strong> 
            Move beyond "gut feelings" with data-backed predictors of event performance.
        </li>
    </ul>

    <p>
    To help us refine your <strong>Strategic Fit Assessment and Final Recommendation</strong>, 
    could you please reply with any <strong>particular events or specific geographies</strong> you are currently targeting?
    </p>

    <p>
    We’re excited to help you replace unreliable spreadsheets with verified intelligence.
    </p>

    <p>
    Regards,<br>
    Winit<br>
    Co-Founder | myEventsIQ
    </p>
    """

def send_confirmation_body_to_admin(user_count: int):
    return f"""
        Hi,

        You have got a new user on myeventsiq.com
        Total users: {user_count}
    """