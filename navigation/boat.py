import threading
from position import CurrentPosition
import math
import time

class Boat ( threading.Thread ):
   def __init__ ( self ):
       self.helmAngle = 0
       CurrentPosition.lock.acquire()
       CurrentPosition.latitude = 43.552598
       CurrentPosition.longitude = 3.963942
       CurrentPosition.bearing = 0
       CurrentPosition.time = time.time()
       CurrentPosition.speed = 2
       CurrentPosition.lock.release()
       threading.Thread.__init__ ( self )

   def setHelmAngle(self, angle):
       self.helmAngle = angle

   def run ( self ):
      while (True):
          newTime = time.time()
          timeDelta = newTime - CurrentPosition.time
          CurrentPosition.lock.acquire()
          CurrentPosition.latitude += CurrentPosition.speed * (timeDelta / 3600) * math.cos(math.radians(CurrentPosition.bearing)) / 60
          CurrentPosition.longitude += CurrentPosition.speed * (timeDelta /3600) * math.sin(math.radians(CurrentPosition.bearing)) / 60
          CurrentPosition.bearing += 0.5 * self.helmAngle
          CurrentPosition.time = newTime
          CurrentPosition.speed = CurrentPosition.speed
          CurrentPosition.lock.release()
          time.sleep(1)

