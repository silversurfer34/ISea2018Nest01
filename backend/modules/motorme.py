#!/usr/bin/env python
import RPi.GPIO as GPIO
import time

class Motor:
	def __init__(self, pinA, pinB):
		self.pinA = pinA
		self.pinB = pinB
		GPIO.setup(self.pinA, GPIO.OUT)
		GPIO.setup(self.pinB, GPIO.OUT)
		self.motorStop()
		self.pwm_B = GPIO.PWM(self.pinB, 2000) # create pwm and set frequece to 2KHz

	def motorStop(self):
		GPIO.output(self.pinA, GPIO.HIGH)
		GPIO.output(self.pinB, GPIO.LOW)

	def motor(self, status, direction, speed):
		### status 1 run else stop, direction 1 clockwise else counter clockwise, speed from 0 to 100%
		#print (status, direction, speed)
		if status == 1:  # run
			if direction == 1:
				GPIO.output(self.pinA, GPIO.HIGH)
				self.pwm_B.start(100)
				self.pwm_B.ChangeDutyCycle(100-speed)
			else:
				GPIO.output(self.pinA, GPIO.LOW)
				self.pwm_B.start(0)
				self.pwm_B.ChangeDutyCycle(speed)
		else:  # stop
			self.motorStop()
	
	def motorIncrease(self, status, direction, fromSpeed, toSpeed):
		increment = 1
		if(fromSpeed > toSpeed):
			increment = -1
		for speed in range(fromSpeed, toSpeed, increment):
			self.motor(status, direction, speed)
			time.sleep(0.01)

	def cleanup(self):
		self.motorStop()
