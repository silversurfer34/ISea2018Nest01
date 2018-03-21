import math
import sys
from geographiclib.geodesic import Geodesic

class BearingCalculator:

    @staticmethod
    def requiredChangeOfDirection(position, wayPoint):
        result = Geodesic.WGS84.Inverse(position.latitude, position.longitude, wayPoint.latitude, wayPoint.longitude)

        azimuth = result['azi1']
        distance = result['s12']

        if azimuth < 0:
            azimuth = 360 + azimuth

        return azimuth, distance

    @staticmethod
    def rerouteToNearestPoint(position, wayPoint1, wayPoint2, intervalInMeters):

        geod = Geodesic.WGS84.Inverse(wayPoint1.latitude, wayPoint1.longitude, wayPoint2.latitude, wayPoint2.longitude)
        if geod['s12'] < intervalInMeters:
            raise ValueError('IntervalInMeters is upper than the distance between wayPoint1 and wayPoint2.')

        geodesicLine = Geodesic.WGS84.InverseLine(wayPoint1.latitude, wayPoint1.longitude, wayPoint2.latitude, wayPoint2.longitude)
        n = int(math.ceil(geodesicLine.s13 / intervalInMeters))
        shortestDistance = sys.float_info.max
        azimuth = 0
        latitude = 0
        longitude = 0
        dictWayPoints = []
        perpendicularIndexPoint = -1
        for i in range(n + 1):
            s = min(intervalInMeters * i, geodesicLine.s13)
            geodesicDict = geodesicLine.Position(s, Geodesic.STANDARD | Geodesic.LONG_UNROLL)

            geodesicDictInverse = Geodesic.WGS84.Inverse(position.latitude, position.longitude, geodesicDict['lat2'], geodesicDict['lon2'])

            distance = geodesicDictInverse['s12']
            azimuth = geodesicDictInverse['azi1']
            latitude = geodesicDict['lat2']
            longitude = geodesicDict['lon2']

            dictWayPoints.append([latitude, longitude, azimuth, distance])

            if distance < shortestDistance:
                shortestDistance = distance
                perpendicularIndexPoint = i

        #geodesicPositionToNewPoint = Geodesic.WGS84.Inverse(position.latitude, position.longitude, dictWayPoints[perpendicularIndexPoint][0], dictWayPoints[perpendicularIndexPoint][1])

        nbIdxToAdd = 2
        #if geodesicPositionToNewPoint['s12'] > intervalInMeters:
        #   nbIdxToAdd = int(round(geodesicPositionToNewPoint['s12']/intervalInMeters))

        idx = perpendicularIndexPoint + nbIdxToAdd
        while idx > len(dictWayPoints) - 1:
            idx = idx - 1

        return dictWayPoints[idx][0], dictWayPoints[idx][1], dictWayPoints[idx][2], dictWayPoints[idx][3]