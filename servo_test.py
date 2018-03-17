import pindefinition as pd
import modules.servo as servo
import time
import RPi.GPIO as GPIO
import atexit
atexit.register(GPIO.cleanup)  

def main():
	#GPIO.setmode(GPIO.BCM)
	print pd.servopin	
	myServo = servo.Servo(pd.servopin)
	angles = [10, 180, 45, 135, 90]
	for i in range(5):
		for angle in angles:
			print "Setting angle", angle
			myServo.setAngle(angle)
	myServo.cleanup();

	
	
	
if __name__ == "__main__":
	main()
