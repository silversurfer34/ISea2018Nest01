import json

class WayPoint:
    def __init__(self, latitude, longitude):
        self.latitude = latitude
        self.longitude = longitude
    def __str__(self):
        s = '<WayPoint '
        s += '[lat:' + str(self.latitude) + ',long:' + str(self.longitude) + ']'
        s += '>'
        return s

class Route:
    def __init__(self):
        self.wplist = []
        self.wpstatus = []

    def __str__(self):
        s = '<Route '
        for i, wp in enumerate(self.wplist):
            s += '[lat:' + str(wp.latitude) + ',long:' + str(wp.longitude) + ',' + self.wpstatus[i] + ']'
        s += '>'
        return s

    def initFromFile(self, filename):
        print(filename)
        with open(filename, 'r') as file:
            data = json.load(file)
            for point in data['Points']:
                self.addPoint(WayPoint(point['latitude'], point['longitude']))

    def addPoint(self, waypoint):
        self.wplist.append(waypoint)
        self.wpstatus.append('future')

    def nextWaypoint(self):
        for i, wp in enumerate(self.wplist):
            if self.wpstatus[i] == 'future':
                return wp

    def previousWaypoint(self):
        for i, wp in enumerate(self.wplist):
            if self.wpstatus[i] == 'future':
                if i > 0:
                    return self.wplist[i-1]
                else:
                    return

    def passWaypoint(self):
        for i, wp in enumerate(self.wplist):
            if self.wpstatus[i] == 'future':
                self.wpstatus[i] = 'passed'
                return

    def finished(self):
        if len(self.wpstatus) == 0 or self.wpstatus[-1] == 'passed':
            return True
        else:
            return False
