#!/usr/bin/env python
import RPi.GPIO as GPIO
import time

class Motor:
	def __init__(self, pinDir, pinSpeed):
		self.pinDir = pinDir
		self.pinSpeed = pinSpeed
		GPIO.setup(self.pinDir, GPIO.OUT)
		GPIO.setup(self.pinSpeed, GPIO.OUT)
		self.stop()
		self.pwm_speed = GPIO.PWM(self.pinSpeed, 2000) # create pwm and set frequece to 2KHz

	def stop(self):
		GPIO.output(self.pinDir, GPIO.HIGH)
		GPIO.output(self.pinSpeed, GPIO.LOW)

	def start(self, direction, speed):
		### direction 1 clockwise else counter clockwise, speed from 0 to 100%
		print direction, speed
		if direction == 1:
			GPIO.output(self.pinDir, GPIO.HIGH)
			self.pwm_speed.start(100)
			self.pwm_speed.ChangeDutyCycle(100-speed)
		else:
			GPIO.output(self.pinDir, GPIO.LOW)
			self.pwm_speed.start(0)
			self.pwm_speed.ChangeDutyCycle(speed)
			
