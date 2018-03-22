#!/usr/bin/env python  

import RPi.GPIO as GPIO
import time

class Transistor:
	def __init__(self, pin):
		self.pin = pin
		#print "TransistorPin : ", self.pin
		GPIO.setup(self.pin, GPIO.OUT)
		self.pmw = GPIO.PWM(self.pin,1000) #50 Hz
		self.previousPower = 50
		self.pmw.start(0) # start it with 0 duty cycle so it does not let AC pass

	def rampUpPower(self, percentage):
		if(percentage < 50 or percentage > 100):
			return;
		increment = 1
		if(self.previousPower > percentage):
			increment = -1
		for perc in range(self.previousPower, percentage, increment):
			#print(perc)
			self.setPower(perc)
			time.sleep(0.05)
		self.previousPower = percentage


	def setPower(self, percentage):
		### From 0 to 100 %
		GPIO.output(self.pin, True)
		self.pmw.ChangeDutyCycle(percentage)
	
	def cleanup(self):
		self.rampUpPower(50)
		GPIO.output(self.pin, False)
		self.pmw.stop()

	
