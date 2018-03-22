import threading
import time
from route import Route
from bearingcalculator import BearingCalculator
from position import CurrentPosition
#from boat import Boat
import sys
sys.path.insert(0, '/home/pi/gitRepo/ISea2018Nest01/backend/modules')
from servopi import ServoPI
import json
import modules.motorpi as Motor

class Steering ( threading.Thread ):

    def __init__ ( self, route, servopi, motor ):
        threading.Thread.__init__ ( self )
        self.route = route
        #self.boat = boat
        self.servopi = servopi
        self.motor = motor

    def run ( self ):
        print(self.route)
        print('Going towards waypoint: lat=' + str(self.route.nextWaypoint().latitude) + ',long=' + str(self.route.nextWaypoint().longitude))

        waypointprecision = 2
        helmgain = 0.5
        helmmax = 45
        helmtrim = 0
        motorspeed = 1500
        controlfrequency = 1

        while not self.route.finished():

            filename = 'files/config.txt'

            with open(filename, 'r') as file:
                data = json.load(file)
                waypointprecision = data['waypointprecision']
                helmgain = data['helmgain']
                helmmax = data['helmmax']
                helmtrim = data['helmtrim']
                motorspeed = data['motorspeed']
                controlfrequency = data['controlfrequency']

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
            if bearingDif > helmmax:
                angle = helmmax
            elif bearingDif < -helmmax:
                angle = -helmmax
            else:
                angle = bearingDif
            #self.boat.setHelmAngle(angle)
            self.servopi.setTrim(helmtrim)
            self.servopi.setAngle(helmgain*angle)
            self.motor.start(motorspeed)

            if distance < waypointprecision:
                self.route.passWaypoint()
                print('Passed waypoint')
                print(self.route)

            sys.stdout.flush()

            time.sleep(controlfrequency)

        print('Finished')


