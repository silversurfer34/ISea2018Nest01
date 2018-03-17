#!/usr/bin/env python  

import RPi.GPIO as GPIO
from time import sleep
import signal
import atexit
#GPIO.setmode(GPIO.BCM)
#atexit.register(GPIO.cleanup)  
class Servo:
	def __init__(self, pin):
		self.pin = pin
		GPIO.setup(self.pin, GPIO.OUT, initial=False)
		self.pmw = GPIO.PWM(self.pin,50) #50 Hz
		self.pmw.start(0) # start it with 0 duty cycle so it doesn't set any angles on startup

	def setAngle(self, angle):
		### From 0 to 180, 90 is the neutral position
		duty = 2.5 + 10 * angle / 180
		GPIO.output(self.pin, True)
		self.pmw.ChangeDutyCycle(duty)
		sleep(0.5) # Evqluate needed time for the servo to go to the desired position
		GPIO.output(self.pin, False)
		self.pmw.ChangeDutyCycle(0)
	
	def cleanup(self):
		self.pmw.stop()

	
