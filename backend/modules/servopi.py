#!/usr/bin/env python  

import pigpio
import time

class ServoPI:
	def __init__(self, pin):
		self.pi = pigpio.pi()
		self.pin = pin
		self.minPW = 800
		self.maxPW = 1600
		self.trim = 0
				

	def setAngle(self, angle):
		### From -45 to 45, 0 is the neutral position
		print "Setting angle : ", angle
		
		if( angle>45 ):
			angle=45
		elif( angle<-45):
			angle=-45

		angle = 45 - angle - self.trim
		width = self.minPW + (self.maxPW - self.minPW ) * angle / 90.0
		self.pi.set_servo_pulsewidth(self.pin, width)
		time.sleep(0.2)
	
	def setTrim( self, trim):
		if( trim>20 ):
			trim=20
		elif( trim<-20):
			trim=-20
		self.trim = trim
	
			
