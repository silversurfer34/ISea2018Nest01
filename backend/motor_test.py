import pindefinition as pd
import modules.motor as motor
import time
import RPi.GPIO as GPIO
import atexit
atexit.register(GPIO.cleanup)  

def main():
	myMotor = motor.Motor(pd.MotorPinDir, pd.MotorPinSpeed)
	paramsList = [[0, 0, 100], [1, 1, 100], [1, 0, 100]]
	
	for params in paramsList:
		print "Setting parameter", params
		if(params[0] == 1):
			myMotor.start(params[1], params[2]);
		else:
			myMotor.stop()
		time.sleep(1)
	
	myMotor.stop();	
	
	
if __name__ == "__main__":
	main()
