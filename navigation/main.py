import navigation.route as Routing
import navigation.gpsreaderthread as Gps
import navigation.boatcontroller as Controller
from navigation.boat import Boat
import io
import navigation.kmlexport as Kml

def main():
    print('hello isea')

    route = Routing.Route()
    route.initFromFile('C:\\Code\\iSea\\route.json')

    boat = Boat()
    boat.start()
    Gps.TraceThread('C:\\Code\\iSea\\trace.json').start()

    controller = Controller.Steering(route, boat)
    controller.start()
    controller.join()

    Kml.exportToKML(route, 'C:\\Code\\iSea\\trace.json', 'C:\\Code\\iSea\\route.kml', 'C:\\Code\\iSea\\trace.kml')



if __name__ == '__main__':
    main()

