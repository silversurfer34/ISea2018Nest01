#!/usr/bin/env python  

import RPi.GPIO as GPIO
from time import sleep

class Servo:
	def __init__(self, pin):
		self.pin = pin
		GPIO.setup(self.pin, GPIO.OUT, initial=False)
		self.pmw = GPIO.PWM(self.pin,50) #50 Hz
		self.pmw.start(0) # start it with 0 duty cycle so it doesn't set any angles on startup

	def setAngle(self, angle):
		### Expected angle between -90 and 90, 0 is neutral position
		self.setAngleInternal(angle + 90)
	
	def setAngleInternal(self, angle):
		### From 10 to 180, 90 is the neutral position
		duty = 2.5 + 10.0 * float(angle) / 180.0
		if(duty<2.7):
			duty = 2.7
		if(duty>12.5):
			duty = 12.5
		GPIO.output(self.pin, True)
		self.pmw.ChangeDutyCycle(duty)
		print angle, duty
		sleep(0.3) # Evaluate needed time for the servo to go to the desired position
		GPIO.output(self.pin, False)
		self.pmw.ChangeDutyCycle(0)

	def setDC(self, cycle):
		GPIO.output(self.pin, True)
		self.pmw.ChangeDutyCycle(cycle)
		sleep(0.3) 
		GPIO.output(self.pin, False)
		self.pmw.ChangeDutyCycle(0)
		

	def cleanup(self):
		self.pmw.stop()

	
