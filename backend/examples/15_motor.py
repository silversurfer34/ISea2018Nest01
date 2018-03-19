#!/usr/bin/env python
import RPi.GPIO as GPIO
import time


MotorPin_A         = 16
MotorPin_B         = 18

g_sta =  1
g_dir =  1
speed = 50

pwm_B = 0

def motorStop():
	GPIO.output(MotorPin_A, GPIO.HIGH)
	GPIO.output(MotorPin_B, GPIO.LOW)

def setup():
	GPIO.setwarnings(False)
	GPIO.setmode(GPIO.BOARD)
	GPIO.setup(MotorPin_A, GPIO.OUT)
	GPIO.setup(MotorPin_B, GPIO.OUT)
	motorStop()
	global pwm_B
	pwm_B = GPIO.PWM(MotorPin_B, 2000) # create pwm and set frequece to 2KHz

def motor(status, direction, speed):
	print status, direction, speed
	global pwm_B
	if status == 1:  # run
		if direction == 1:
			GPIO.output(MotorPin_A, GPIO.HIGH)
			pwm_B.start(100)
			pwm_B.ChangeDutyCycle(100-speed)
		else:
			GPIO.output(MotorPin_A, GPIO.LOW)
			pwm_B.start(0)
			pwm_B.ChangeDutyCycle(speed)
	else:  # stop
		motorStop()

def loop():
	while True:
#		print 'test....2...'
		#btnScan()
#		print 'test....3...'
		global g_sta
		global g_dir 
		global speed
		time.sleep(2.101)
		g_sta = 1
		g_dir = 1
		speed = 100
		motor(g_sta, g_dir, speed)
		time.sleep(2.101)
		
		g_sta = 0
		g_dir = 1
		speed = 100
		motor(g_sta, g_dir, speed)
		time.sleep(2.01)	
		g_sta = 1
		g_dir = -1
		speed = 100
		motor(g_sta, g_dir, speed)
		time.sleep(2.01)	
		motor(0, g_dir, speed)
		time.sleep(2.01)

def destroy():
	motorStop()
	GPIO.cleanup()             # Release resource

if __name__ == '__main__':     # Program start from here
	setup()
	try:
		loop()
	except KeyboardInterrupt:
		destroy()

