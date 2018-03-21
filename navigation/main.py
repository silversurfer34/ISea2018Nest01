import route as Routing
import trace as Gps
import boatcontroller as Controller
from boat import Boat
import io
import kmlexport as Kml
import os

def main():
    print('hello isea')
    fileDir = os.path.dirname(os.path.realpath('__file__'))

    route = Routing.Route()
    route.initFromFile(os.path.join(fileDir,'files/route.json'))

    boat = Boat()
    boat.start()
    Gps.TraceThread(os.path.join(fileDir,'files/trace.json')).start()

    controller = Controller.Steering(route, boat)
    controller.start()
    controller.join()

    Kml.exportToKML(route, os.path.join(fileDir,'files/trace.json'), os.path.join(fileDir,'files/route.kml'), os.path.join(fileDir,'files/trace.kml'))



if __name__ == '__main__':
    main()

