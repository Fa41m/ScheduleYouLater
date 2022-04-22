import smtplib
from email.message import EmailMessage
# For linking javascript and python together
import sys

# Alert function
def email_alert(subject, body, to):
    msg = EmailMessage()
    msg.set_content(body)
    msg['subject'] = subject
    msg['to'] = to
    # Email that is being used to send the email
    user = "ScheduleYouLater@gmail.com"
    # Whoever the email is being sent to
    msg['from'] = user
    # Password to access the email
    password = "aanttynkcmxngwxd"
    # Starts the server
    server = smtplib.SMTP("smtp.gmail.com", 587)
    server.starttls()
    server.login(user, password)
    server.send_message(msg)

    server.quit()
# Testing function that will only work if this is the main file
if __name__ == "__main__":
    # email_alert("Yoyo", "Testing 123", "Fabrar1738@gmail.com")
    # Using javascript to send the email
    email_alert(str(sys.argv[1]), str(sys.argv[2]), str(sys.argv[3]))