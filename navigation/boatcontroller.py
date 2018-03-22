import threading
import time
from route import Route
from bearingcalculator import BearingCalculator
from position import CurrentPosition
#from boat import Boat
import sys
sys.path.insert(0, '/home/pi/gitRepo/ISea2018Nest01/backend/modules')
from servopi import ServoPI


class Steering ( threading.Thread ):

    def __init__ ( self, route, servopi ):
        threading.Thread.__init__ ( self )
        self.route = route
        #self.boat = boat
        self.servopi = servopi

    def run ( self ):
        print(self.route)
        print('Going towards waypoint: lat=' + str(self.route.nextWaypoint().latitude) + ',long=' + str(self.route.nextWaypoint().longitude))
        while not self.route.finished():
            position = CurrentPosition.getCurrentPosition()
            bearing, distance = BearingCalculator.requiredChangeOfDirection(position, self.route.nextWaypoint())
            bearing2 = 0
            if (self.route.previousWaypoint()):
                lat, long, bearing2, distance2 = BearingCalculator.rerouteToNearestPoint(position, self.route.previousWaypoint(), self.route.nextWaypoint(), 3)
            print("distance = " + str(distance) + "; bearing = " + str(bearing) + "; bearing2 = " + str(bearing2))
            if (self.route.previousWaypoint()):
                bearing = bearing2
            bearingDif = bearing - position.bearing
            if bearingDif < -180:
                bearingDif = 360 + bearingDif
            elif bearingDif > 180:
                bearingDif = 360 - bearingDif
            angle = bearingDif
            if bearingDif > 45:
                angle = 45
            elif bearingDif < -45:
                angle = -45
            else:
                angle = bearingDif
            #self.boat.setHelmAngle(angle)
            self.servopi.setAngle(angle)

            if distance < 2:
                self.route.passWaypoint()
                print('Passed waypoint')
                print(self.route)

            sys.stdout.flush()	


            time.sleep(1)

        print('Finished')


