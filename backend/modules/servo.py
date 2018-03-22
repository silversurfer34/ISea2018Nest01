#!/usr/bin/env python  

import RPi.GPIO as GPIO
from time import sleep
import threading



class Servo:
	lock = threading.Lock()
	def __init__(self, pin):
		self.pin = pin
		#print "ServoPin : ", self.pin
		GPIO.setup(self.pin, GPIO.OUT, initial=False)
		self.pmw = GPIO.PWM(self.pin,50) #50 Hz
		self.pmw.start(0) # start it with 0 duty cycle so it doesn't set any angles on startup
		self.minAngle = 25.0
		self.maxAngle = 165.0
		self.keepDuty = False # if true do not set back duty to 0

	def f(self, txt):
		print ("b4 lock", txt)
		self.lock.acquire()
		print ("f started", txt)
		sleep(3)
		print ("f finished", txt)
		self.lock.release()
	
	def fInThread(self, msg):
		t = threading.Thread(target=self.f, kwargs={'txt':msg}).start()
		

	def setAngle(self, angle):
		#print "Setting angle : ", angle
		### From 0 to 180, 90 is the neutral position
		duty = 2.5 + 10.0 * self.interpolate(angle) / 180.0
		#print "Duty : ", duty
		GPIO.output(self.pin, True)
		self.pmw.ChangeDutyCycle(duty)
		sleep(0.5) # Evaluate needed time for the servo to go to the desired position
		if not self.keepDuty:
			GPIO.output(self.pin, False)
			self.pmw.ChangeDutyCycle(0)
	

	def interpolate(self, angle):		
		origin = angle
		if(angle < 90):
			ratio = angle / 90.0
			angle = self.minAngle + ratio * (90 - self.minAngle)
		elif(angle > 90):
			ratio = (angle - 90) / 90.0
			angle = 90 + ratio * (self.maxAngle - 90)
		#print "Angle interpolated : ", origin, " to ", angle
		return angle
	
	
	def cleanup(self):
		self.pmw.stop()

	
