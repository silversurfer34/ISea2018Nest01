import pindefinition as pd
import modules.servo as servo
import time
import RPi.GPIO as GPIO
import atexit
  

myServo = servo.Servo(pd.ServoPin)

def  cleanup():
	myServo.cleanup()
	GPIO.cleanup()

atexit.register(cleanup)


def main():
	angles = [0, 45, 90, 135, 180, 135, 90, 45]
	while(True):
		for angle in angles:
			myServo.setAngle(angle)
			time.sleep(3)

	
if __name__ == "__main__":
	main()
