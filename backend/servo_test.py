import pindefinition as pd
import modules.servo as servo
import time
import RPi.GPIO as GPIO
import atexit
atexit.register(GPIO.cleanup)  

def main():
	myServo = servo.Servo(pd.ServoPin)
	angles = [0, 45, 60, 45, 0, -35, -50, -35, 60, -50, 0]
	for i in range(10):
		for angle in angles:
			#print "Setting angle", angle
			myServo.setAngle(angle)
			#time.sleep(0.1)
	myServo.cleanup();

	
	
	
if __name__ == "__main__":
	main()
