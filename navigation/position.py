from threading import Lock

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
        CurrentPosition.aGPS.lock.acquire()
        #position = Position(CurrentPosition.time, CurrentPosition.latitude, CurrentPosition.longitude, CurrentPosition.speed, CurrentPosition.bearing)
        position = Position(CurrentPosition.aGPS)
        CurrentPosition.aGPS.lock.release()
        return position

