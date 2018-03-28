#!/usr/bin/env python
import pigpio
import time

class MotorPI:
    def __init__(self, pin):
        self.pi = pigpio.pi()
        self.pin = pin
        self.maxReverse = 0
        self.maxForward = 2500
        self.neutral = (self.maxReverse + self.maxForward)/2
        self.minPulse = self.neutral + (self.maxForward - self.neutral) * 0.2
        self.maxPulse = self.maxForward - (self.maxForward - self.neutral) * 0.7
        print("neutral {} minPulse {} maxPulse {}".format(self.neutral, self.minPulse, self.maxPulse) )
        self.previousSpeed = 0

    def calibrate(self):
        print("calibrate")
        self.pi.set_servo_pulsewidth(self.pin, self.maxReverse)
        time.sleep(1.5)
        self.pi.set_servo_pulsewidth(self.pin, self.maxForward)
        time.sleep(1.5)
        self.pi.set_servo_pulsewidth(self.pin, self.neutral)
        time.sleep(1.5)
        print("calibrate done")

    def setNeutral(self):
        print("neutral 3s")
        self.pi.set_servo_pulsewidth(self.pin, self.neutral)
        time.sleep(3)
        print("neutral 3s done")

    def start(self, speed):
        ### Speed between 0 and 100
        if speed < 0:
            speed = 0
        elif speed > 100:
            speed = 100
        self.__increaseSpeed(speed)

    def stop(self):
        self.pi.set_servo_pulsewidth(self.pin, self.neutral)
        self.previousSpeed = 0

    
    def cleanUp(self):
        print("clenup")
        self.pi.set_servo_pulsewidth(self.pin, 0)
        self.previousSpeed = 0

    def __increaseSpeed(self, newSpeed):
        if(newSpeed >= self.previousSpeed):
            increment = 1
        else:
            increment = -1

        for speed in range(self.previousSpeed, newSpeed + increment, increment):
            width = self.minPulse + (self.maxPulse - self.minPulse) * speed / 100.0
            #print("speed", speed, "width", width)
            self.pi.set_servo_pulsewidth(self.pin, width)
            time.sleep(0.1)

        self.previousSpeed = newSpeed
        
