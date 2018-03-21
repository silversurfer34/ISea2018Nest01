
import pindefinition as pd
import modules.servopi as servo
import time

myServo = servo.ServoPI(pd.ServoPin)

def main():
	
	myServo.setTrim(-4)
	
	while( True ):
		myServo.setAngle(0)
		time.sleep(2)
		myServo.setAngle(-45)
		time.sleep(2)
		myServo.setAngle(45)
		time.sleep(2)
		
		#~ angles = range(0,45,5)
		#~ angles += range(0,-45,-5)
		#~ for angle in angles:
			#~ myServo.setAngle(angle)

	
if __name__ == "__main__":
	main()
