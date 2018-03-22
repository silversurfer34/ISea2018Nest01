import sys
sys.path.insert(0, '/home/pi/gitRepo/ISea2018Nest01/backend')

import gpsPosition as GPS

class Position:

    def __init__(self, aGPS):
        self.time = aGPS.datetime
        self.latitude = aGPS.latitude
        self.longitude = aGPS.longitude
        self.speed = aGPS.speed
        self.bearing = aGPS.direction

class CurrentPosition:
    time = 0
    latitude = 0
    longitude = 0
    speed = 0
    bearing = 0

    aGPS = GPS.GPSPosition()
    aGPS.run()
    

    @staticmethod
    def getCurrentPosition():
        position = Position(CurrentPosition.aGPS)
        return position

