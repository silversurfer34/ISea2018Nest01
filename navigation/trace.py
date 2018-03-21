import threading
import time
from navigation.position import CurrentPosition
import json
import random
import os

class TraceThread ( threading.Thread ):
   def __init__ ( self, tracefile ):
      self.tracefile = tracefile
      open(self.tracefile, "w").close()
      threading.Thread.__init__ ( self )

   def run ( self ):
      print('Tracing to file:', self.tracefile)
      trace = {}
      trace['TraceName'] = ''
      points = []
      trace['Points'] = points
      isFirstElement = True
      with open(self.tracefile, 'a') as file:
          file.write(json.dumps(trace, indent=4))

      while True:
          point = {}
          with open(self.tracefile, 'r+') as file:
              file.seek(0, os.SEEK_END)
              if isFirstElement == True:
                  pos = file.tell() - 4
              else:
                  pos = file.tell() - 10
              file.seek(pos, os.SEEK_SET)
              file.truncate()
              if isFirstElement == False:
                  file.write(',\n')
              else:
                  file.write('\n')
                  isFirstElement = False

              position = CurrentPosition.getCurrentPosition()
              point["time"] = position.time
              point["latitude"] = position.latitude
              point["longitude"] = position.longitude
              point["bearing"] = position.bearing
              point["speed"] = position.speed

              file.write(json.dumps(point, indent=8))
              file.write('\n    ]\n}')
          time.sleep(1)

