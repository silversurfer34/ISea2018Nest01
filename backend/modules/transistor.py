#!/usr/bin/env python  

import RPi.GPIO as GPIO

#~ GPIO.setmode(GPIO.BCM)
#~ GPIO.setup(pinouille, GPIO.OUT)

#~ pwm=GPIO.PWM(pinouille,50)
#~ pwm.start(0)

#~ pwm.ChangeDutyCycle(0)
#~ #todo finish


class Transistor:
	def __init__(self, pin):
		self.pin = pin
		#print "TransistorPin : ", self.pin
		GPIO.setup(self.pin, GPIO.OUT)
		self.pmw = GPIO.PWM(self.pin,50) #50 Hz
		self.pmw.start(0) # start it with 0 duty cycle so it does not let AC pass


	def setPower(self, percentage):
		### From 0 to 100 %
		GPIO.output(self.pin, True)
		self.pmw.ChangeDutyCycle(percentage)
	
	def cleanup(self):
		GPIO.output(self.pin, False)
		self.pmw.stop()

	
