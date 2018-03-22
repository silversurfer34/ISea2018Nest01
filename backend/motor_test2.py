
import pindefinition as pd
import modules.motorpi as motor
import time
import atexit


# atexit.register(lambda x: myMotor.cleanUp())

def main():
    myMotor = motor.MotorPI(pd.MotorPin)
    try:
        #myMotor.calibrate()
        myMotor.setNeutral()
         
        myMotor.start(30)
        time.sleep(4)
        myMotor.stop()
        time.sleep(5)
        
    finally:
        myMotor.cleanUp()
    
    
if __name__ == "__main__":
    main()
