from threading import Lock
class Position:
    def __init__(self, time, latitude, longitude, speed, bearing):
        self.time = time
        self.latitude = latitude
        self.longitude = longitude
        self.speed = speed
        self.bearing = bearing

class CurrentPosition:
    time = 0
    latitude = 0
    longitude = 0
    speed = 0
    bearing = 0
    lock = Lock()

    @staticmethod
    def getCurrentPosition():
        CurrentPosition.lock.acquire()
        position = Position(CurrentPosition.time, CurrentPosition.latitude, CurrentPosition.longitude, CurrentPosition.speed, CurrentPosition.bearing)
        CurrentPosition.lock.release()
        return position

