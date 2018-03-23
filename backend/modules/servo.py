#!/usr/bin/env python  

import RPi.GPIO as GPIO
from time import sleep
import threading

class Servo:
	lock = threading.Lock()
	def __init__(self, pin, trim=0, freq=50, minPeriod=0.5, maxPeriod=2.5, keepDuty=False):
		self.pin = pin
		self.freq = freq
		self.minPeriod = minPeriod
		self.maxPeriod = maxPeriod
		self.trim = trim
		
		GPIO.setup(self.pin, GPIO.OUT, initial=False)
		self.pmw = GPIO.PWM(self.pin,self.freq) #50 Hz
		self.pmw.start(0) # start it with 0 duty cycle so it doesn't set any angles on startup
		self.minAngle = 25.0
		self.maxAngle = 165.0
		self.keepDuty = keepDuty # if true do not set back duty to 0

	
	
	def __setAngleLock(self, angle):	
		self.lock.acquire()
		self.setAngle(angle)
		self.lock.release()
	
	def setAngleThread(self, angle):
		threading.Thread(target=self.__setAngleLock, kwargs={'angle':angle}).start()
	
	def __angleToDuty(self, angle):
		return self.__msToDuty(self.minPeriod + (self.maxPeriod - self.minPeriod ) * (angle/180.0))
				
	def __msToDuty(self, ms):
		return ms*0.001*self.freq*100		
		
	def setAngle(self, angle, delta=0):
		#~ print ("Setting angle : ", angle)
		### From 0 to 180, 90 is the neutral position
		angle+=self.trim+delta
		if(angle<0):
			angle = 0
		elif(angle>180):
			angle = 180
		duty = self.__angleToDuty(angle)
		#~ duty = 2.5 + 10.0 * angle / 180.0
		print ("Duty : ", duty)
		GPIO.output(self.pin, True)
		self.pmw.ChangeDutyCycle(duty)
		sleep(0.5) # Evaluate needed time for the servo to go to the desired position
		if not self.keepDuty:
			GPIO.output(self.pin, False)
			self.pmw.ChangeDutyCycle(0)
	
	def setDuty(self, duty):
		print ("Duty : ", duty)
		GPIO.output(self.pin, True)
		self.pmw.ChangeDutyCycle(duty)
		sleep(0.5) # Evaluate needed time for the servo to go to the desired position
		GPIO.output(self.pin, False)
		self.pmw.ChangeDutyCycle(0)
	
	def cleanup(self):
		self.pmw.stop()
import time

	
def main():
	ServoPin = 17
	GPIO.setmode(GPIO.BCM)
	myServo = Servo(ServoPin, -10, 50, 0.5, 2.5, False)
	#~ minp = mstoduty(0.5)
	#~ medp = mstoduty(1.5)
	#~ maxp = mstoduty(2.5)
	#~ duties = [minp, medp, maxp]
	#~ while(True):
		#~ for duty in duties:
			#~ myServo.setDuty(duty)
			#~ time.sleep(1)
	#angles = [0, 45, 90, 135, 180, 90]
	angles = [-90, -45, 0, 45, 90, 0]
	for i in range(2):
		for angle in angles:
			myServo.setAngle(angle, 90)
			time.sleep(1)	
	myServo.cleanup()
	GPIO.cleanup()
if __name__ == "__main__":
	main()
	
