
import pindefinition as pd
import modules.servopi as servo
import time

myServo = servo.ServoPI(pd.ServoPin)

def main():

	#~ print("init")
	#~ myServo.pi.set_servo_pulsewidth(17, 1750)
	#~ time.sleep(3)

	print("run")
	for rpm in range(1400, 1800, 10):
		print("run {}".format(rpm))
		myServo.pi.set_servo_pulsewidth(17, rpm)
		time.sleep(0.5)

	time.sleep(3)

	print("stop")
	myServo.pi.set_servo_pulsewidth(17, 1250)
	time.sleep(5)
	
	
	#~ myServo.setTrim(1)
	
	#~ while( True ):
		#~ myServo.setAngle(0)
		#~ time.sleep(2)
		#~ myServo.setAngle(40)
		#~ time.sleep(2)
		#~ myServo.setAngle(50)
		#~ time.sleep(2)
		
		#~ angles = range(0,45,5)
		#~ angles += range(0,-45,-5)
		#~ for angle in angles:
			#~ myServo.setAngle(angle)

	
if __name__ == "__main__":
	main()
