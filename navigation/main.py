import sys
sys.path.insert(0, '/home/pi/gitRepo/ISea2018Nest01/backend')
import pindefinition as pd
import route as Routing
import trace as Gps
import boatcontroller as Controller
#from boat import Boat
from servopi import ServoPI
import io
import kmlexport as Kml
import os
import modules.motorpi as Motor
import datetime

def main():
    try:
        print('hello isea')
        fileDir = os.path.dirname(os.path.realpath(__file__))

        motor = Motor.MotorPI(pd.MotorPin)
        motor.setNeutral()

        route = Routing.Route()
        route.initFromFile(os.path.join(fileDir,'files/route.json'))

        servopi = ServoPI(pd.ServoPin)

        tracefilename = 'files/trace' + str(datetime.datetime.now().strftime("%y-%m-%d-%H-%M")) + '.json'
        tracefilename = os.path.join(fileDir, tracefilename)
        trace = Gps.TraceThread(tracefilename)
        trace.start()

        controller = Controller.Steering(route, servopi, motor)
        controller.start()
        controller.join()
        trace.stopped = True
        trace.join()

        Kml.exportToKML(route, os.path.join(fileDir,'files/trace.json'), os.path.join(fileDir,'files/route.kml'), os.path.join(fileDir,'files/trace.kml'))

    finally:
        motor.cleanUp()

if __name__ == '__main__':
    main()

