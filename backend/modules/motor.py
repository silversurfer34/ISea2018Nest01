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
		self.previousSpeed = 0

	def motorStop(self):
		GPIO.output(self.pinA, GPIO.HIGH)
		GPIO.output(self.pinB, GPIO.LOW)

	def start(self, speed):
		### Speed between -100 and 100 negqtive vqlues for reverse
		toSpeed = speed
		if(speed < -100 or speed > 100):
			return
		
		self.__motorIncrease(self.previousSpeed, toSpeed)
		self.previousSpeed = toSpeed
			
		
	
	def __motorIncrease(self, fromSpeed, toSpeed):
		increment = 1
		if(fromSpeed > toSpeed):
			increment = -1
		for speed in range(fromSpeed, toSpeed, increment):
			self.__motorInternal(speed)
			time.sleep(0.01)

	def __motorInternal(self, speed):
		### speed from 0 to 100%
		if speed > 0:
			GPIO.output(self.pinA, GPIO.HIGH)
			self.pwm_B.start(100)
			self.pwm_B.ChangeDutyCycle(100-speed)
		else:
			speed = - speed
			GPIO.output(self.pinA, GPIO.LOW)
			self.pwm_B.start(0)
			self.pwm_B.ChangeDutyCycle(speed)


	def cleanup(self):
		self.start(0)
		self.motorStop()
