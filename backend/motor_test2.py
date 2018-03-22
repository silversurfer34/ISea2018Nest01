
import pindefinition as pd
import modules.motorpi as motor
import time

myMotor = motor.MotorPI(pd.MotorPin)

def main():    
    #myMotor.calibrate()
    myMotor.setNeutral()
        
    for speed in range(0, 101, 10):
        print("speed {}".format(speed))
        myMotor.start(speed)
        time.sleep(0.1)

    print("stop")
    myMotor.stop()
    
    
if __name__ == "__main__":
    main()
