#!/usr/bin/env python  

import RPi.GPIO as GPIO


#~ relayPin = 27
#~ GPIO.setmode(GPIO.BCM)
#~ GPIO.setup(relayPin, GPIO.OUT)   # Set pin mode as output
#~ GPIO.output(relayPin, GPIO.HIGH)  # led on

#~ while True:
	#~ print ('...led on')
	#~ GPIO.output(relayPin, GPIO.LOW)  # led on
	#~ time.sleep(2)
	#~ print ('led off...')
	#~ GPIO.output(relayPin, GPIO.HIGH) # led off
	#~ time.sleep(2)

class Relay:
	def __init__(self, pin):
		self.pin = pin
		GPIO.setup(self.pin, GPIO.OUT)
		GPIO.output(self.pin, GPIO.LOW) 

	def setRelay(self, status):
		### 0 or 1
		if (status == 0):
			print ('...relay off')
			GPIO.output(self.pin, GPIO.LOW)  # led off
		else:
			print ('...relay on')
			GPIO.output(self.pin, GPIO.HIGH)  # led on		

	def cleanup(self):
		self.setRelay(0)
		GPIO.output(self.pin, False)

	
	
