from threading import Lock

import ../backend/gpsPosition as GPS

class Position:
    #def __init__(self, time, latitude, longitude, speed, bearing):
    #    self.time = time
    #    self.latitude = latitude
    #    self.longitude = longitude
    #    self.speed = speed
    #    self.bearing = bearing
        
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
    lock = Lock()
    
    aGPS = GPS()
    aGPS.run()
    

    @staticmethod
    def getCurrentPosition():
        CurrentPosition.lock.acquire()
        #position = Position(CurrentPosition.time, CurrentPosition.latitude, CurrentPosition.longitude, CurrentPosition.speed, CurrentPosition.bearing)
        position = Position(aGPS)
        CurrentPosition.lock.release()
        return position

