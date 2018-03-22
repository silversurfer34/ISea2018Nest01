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

def main():
    print('hello isea')
    fileDir = os.path.dirname(os.path.realpath(__file__))

    route = Routing.Route()
    route.initFromFile(os.path.join(fileDir,'files/route.json'))

    #boat = Boat()
    #boat.start()
    servopi = ServoPI(pd.ServoPin)
    Gps.TraceThread(os.path.join(fileDir,'files/trace.json')).start()

    controller = Controller.Steering(route, servopi)
    controller.start()
    controller.join()

    Kml.exportToKML(route, os.path.join(fileDir,'files/trace.json'), os.path.join(fileDir,'files/route.kml'), os.path.join(fileDir,'files/trace.kml'))



if __name__ == '__main__':
    main()

