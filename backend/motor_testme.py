import pindefinition as pd
import modules.motor as motor
import time
import RPi.GPIO as GPIO
import atexit
atexit.register(GPIO.cleanup)  

def main():
	#print (pd.MotorPin_A, pd.MotorPin_B)
	myMotor = motor.Motor(pd.MotorPin_A, pd.MotorPin_B)
	#paramsList = [[1, 1, 50], [1, 1, 60],[1, 1, 70],[1, 1, 80],[1, 1, 90],[1, 1, 100]]
	paramsList = [[1, 1, 100]]
	#for i in range(5):
	#	for params in paramsList:
	#		print "Setting parameter", params
	#		myMotor.motor(params[0], params[1], params[2]);
	#		time.sleep(10.5)
	myMotor.motorIncrease(1, 1, 0, 100)
	time.sleep(10)
	myMotor.motorIncrease(1, 1, 100, 0)
	
	myMotor.cleanup();

	
	
	
if __name__ == "__main__":
	main()
