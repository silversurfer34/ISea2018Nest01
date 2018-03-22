import route as Routing
import trace as Gps
import boatcontroller as Controller
from boat import Boat
import io
import kmlexport as Kml
import os
import datetime

def main():
    print('hello isea')
    fileDir = os.path.dirname(os.path.realpath('__file__'))

    route = Routing.Route()
    route.initFromFile(os.path.join(fileDir,'files/route.json'))

    tracefilename = os.path.join(fileDir,'files/trace.json') + str(datetime.no)
    Gps.TraceThread(os.path.join(fileDir,'files/trace.json')).start()

    controller = Controller.Steering(route)
    controller.start()
    controller.join()

    Kml.exportToKML(route, os.path.join(fileDir,'files/trace.json'), os.path.join(fileDir,'files/route.kml'), os.path.join(fileDir,'files/trace.kml'))

if __name__ == '__main__':
    main()

