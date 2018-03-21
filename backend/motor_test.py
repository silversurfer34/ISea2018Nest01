import pindefinition as pd
import modules.motor as motor
import time
import RPi.GPIO as GPIO
import atexit
atexit.register(GPIO.cleanup)  

def main():
	#print (pd.MotorPin_A, pd.MotorPin_B)
	myMotor = motor.Motor(pd.MotorPin_A, pd.MotorPin_B)
	myMotor.start(100)
	time.sleep(2)
	myMotor.start(50)
	time.sleep(2)
	myMotor.start(-50)
	time.sleep(2)
	myMotor.start(-100)
	time.sleep(2)	
	
	myMotor.cleanup();

	
	
	
if __name__ == "__main__":
	main()
