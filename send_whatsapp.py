import pywhatkit
import sys
import time
from datetime import datetime, timedelta

def send_msg(number, msg, schedule_time=None):
    try:
        print(f"Attempting to send message to {number}")
        
        if schedule_time:
            # Convert schedule_time string to datetime object
            schedule_datetime = datetime.strptime(schedule_time, "%Y-%m-%dT%H:%M")
            now = datetime.now()
            
            if schedule_datetime <= now:
                print("Scheduled time is in the past. Sending immediately.")
                schedule_datetime = now + timedelta(seconds=10)
            
            # Calculate wait time in seconds
            wait_seconds = (schedule_datetime - now).total_seconds()
            
            print(f"Message will be sent at {schedule_datetime}")
            pywhatkit.sendwhatmsg(
                phone_no=number,
                message=msg,
                time_hour=schedule_datetime.hour,
                time_min=schedule_datetime.minute,
                wait_time=int(wait_seconds)
            )
        else:
            pywhatkit.sendwhatmsg_instantly(
                phone_no=number,
                message=msg,
                wait_time=10,
                tab_close=True,
                close_time=5
            )
        
        print("Message scheduled/sent successfully")
        time.sleep(15)  # Wait for 15 seconds to ensure the message is sent
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) < 3 or len(sys.argv) > 4:
        print("Error: Incorrect number of arguments")
        sys.exit(1)
    
    number = sys.argv[1]
    msg = sys.argv[2]
    schedule_time = sys.argv[3] if len(sys.argv) == 4 else None
    send_msg(number, msg, schedule_time)