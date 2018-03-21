#!/usr/bin/env python
# -*- coding: utf-8 -*-
#
# Test du port série
import serial
import threading
import datetime
import time
from pynmea2 import nmea

MEAS_1_s=b"$PMTK300,1000,0,0,0,0*1C\r\n"
MEAS_5_s=b"$PMTK300,5000,0,0,0,0*18\r\n"

class GPSPosition:
    longitude = 0
    latitude = 0
    speed = 0
    direction = 0
    datetime = 0
    num_sats = 0
    horizontal_dil = 0
       
    def refresh(self, serialPort):
        print ("refresh")
        while True:
            try:
                data =serialPort.readline()
                data = data.decode('ascii', errors='ignore')
                start = data.find("$GP")
                if start < 0:
                    continue
                data = data[start:]
                gp = nmea.NMEASentence.parse(data)
                if 'GGA' == gp.sentence_type:
                    #print (gp.sentence_type)
                    #print (gp.timestamp)
                    self.num_sats = gp.num_sats
                    self.horizontal_dil = gp.horizontal_dil
                    #print (self.num_sats, self.horizontal_dil)
                elif 'RMC' == gp.sentence_type:
                    #print (gp.sentence_type)
                    self.longitude = gp.longitude
                    self.latitude = gp.latitude
                    self.speed = gp.spd_over_grnd
                    self.direction = gp.true_course
                    self.datetime = gp.datetime
                    self.datetime = self.datetime.isoformat()
                    #print (self.datetime, self.longitude, self.latitude, self.speed, self.direction)
            except:
                pass
            #    print ("wait for data")
            #    time.sleep(1)
                
                
    def run(self):
        port = "/dev/serial0"
        #time.sleep(15)
        serialPort = serial.Serial(port, 38400, bytesize=serial.EIGHTBITS, parity=serial.PARITY_NONE, stopbits=serial.STOPBITS_ONE)
        serialPort.write(MEAS_1_s)
        serialPort.flushInput()
        refreshThread = threading.Thread(target=GPSPosition.refresh, args=(self, serialPort))
        refreshThread.start()        
    

#aGPS = GPSPosition()
#aGPS.run()
        


