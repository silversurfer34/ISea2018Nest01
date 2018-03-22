import threading
import time
from route import Route
from bearingcalculator import BearingCalculator
from position import CurrentPosition
from boat import Boat


class Steering ( threading.Thread ):

    def __init__ ( self, route):
        threading.Thread.__init__ ( self )
        self.route = route

    def run ( self ):
        print(self.route)
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

            self.boat.setHelmAngle(-angle) # set bar in opposite direction

            if distance < 3:
                self.route.passWaypoint()
                print('Passed waypoint')
                print(self.route)

            time.sleep(1)

        print('Finished')


