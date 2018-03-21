#!/usr/bin/env python  

import RPi.GPIO as GPIO
import time

relayPin = 27
GPIO.setmode(GPIO.BCM)
GPIO.setup(relayPin, GPIO.OUT)   # Set pin mode as output
GPIO.output(relayPin, GPIO.HIGH)  # led on

while True:
	print ('...led on')
	GPIO.output(relayPin, GPIO.LOW)  # led on
	time.sleep(2)
	print ('led off...')
	GPIO.output(relayPin, GPIO.HIGH) # led off
	time.sleep(2)
