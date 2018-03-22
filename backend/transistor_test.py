import pindefinition as pd
import modules.transistor as transistor
import time
import RPi.GPIO as GPIO
import atexit
  

myTrans = transistor.Transistor(pd.TransistorPin)

def  cleanup():
	myTrans.cleanup()
	GPIO.cleanup()

atexit.register(cleanup)


def main():

	#~ powers = range(0, 100, 1)
	#~ while(True):
		#~ for power in powers:
			#~ print(power)
			#~ myTrans.setPower(power)
			#~ time.sleep(0.5)
	myTrans.rampUpPower(100)
	time.sleep(3)
	myTrans.rampUpPower(50)
	time.sleep(3)
	#~ myTrans.rampUpPower(25)
	#~ time.sleep(3)
	
if __name__ == "__main__":
	main()
