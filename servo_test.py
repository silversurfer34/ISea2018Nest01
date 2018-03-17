import pindefinition as pd
import modules.servo as servo
import time
import RPi.GPIO as GPIO
import atexit
atexit.register(GPIO.cleanup)  

def main():
	print pd.ServoPin	
	myServo = servo.Servo(pd.ServoPin)
	angles = [10, 180, 45, 135, 90]
	for i in range(5):
		for angle in angles:
			print "Setting angle", angle
			myServo.setAngle(angle)
	myServo.cleanup();

	
	
	
if __name__ == "__main__":
	main()
