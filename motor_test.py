import pindefinition as pd
import modules.motor as motor
import time
import RPi.GPIO as GPIO
import atexit
atexit.register(GPIO.cleanup)  

def main():
	print pd.MotorPin_A, pd.MotorPin_B	
	myMotor = motor.Motor(pd.MotorPin_A, pd.MotorPin_B)
	paramsList = [[0, 0, 100], [1, 1, 100], [1, 0, 100]]
	for i in range(5):
		for params in paramsList:
			print "Setting parameter", params
			myMotor.motor(params[0], params[1], params[2]);
			time.sleep(1)
	
	myMotor.cleanup();

	
	
	
if __name__ == "__main__":
	main()
