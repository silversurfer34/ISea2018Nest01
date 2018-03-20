#!/usr/bin/env python
# -*- coding: utf-8 -*-
#
# Test du port série
import serial
import threading
from pynmea2 import nmea

MEAS_1_s=b"$PMTK300,1000,0,0,0,0*1C\r\n"
MEAS_5_s=b"$PMTK300,5000,0,0,0,0*18\r\n"

class GPSPosition:
    longitude = 0
    latitude = 0
    speed = None
    direction = None
    timestamp = 0
    num_sats = None
    horizontal_dil = None
    

       
def refresh(aGPSPosition, serialPort):
    while True:
        data =serialPort.readline()
        data = data.decode('ascii', errors='ignore')
        start = data.find("$GP")
        if start < 0:
            continue
        data = data[start:]
        gp = nmea.NMEASentence.parse(data)
        if 'GGA' == gp.sentence_type:
            print (gp.sentence_type)
            print (gp.timestamp)
            aGPSPosition.num_sats = gp.num_sats
            aGPSPosition.horizontal_dil = gp.horizontal_dil
            print (aGPSPosition.num_sats)
            print (aGPSPosition.horizontal_dil)
        elif 'RMC' == gp.sentence_type:
            print (gp.sentence_type)
            aGPSPosition.timestamp = gp.timestamp
            aGPSPosition.longitude = gp.longitude
            aGPSPosition.latitude = gp.latitude
            aGPSPosition.speed = gp.spd_over_grnd
            aGPSPosition.direction = gp.true_course
            print (aGPSPosition.timestamp)
            print (aGPSPosition.longitude)
            print (aGPSPosition.latitude)
            print (aGPSPosition.speed)
            print (aGPSPosition.direction)

        
port = "/dev/serial0"
serialPort = serial.Serial(port, 38400, bytesize=serial.EIGHTBITS, parity=serial.PARITY_NONE, stopbits=serial.STOPBITS_ONE)
serialPort.write(MEAS_1_s)
serialPort.flushInput()
    
lastPosition = GPSPosition()

refreshThread = threading.Thread(target=refresh, args=(lastPosition, serialPort))
refreshThread.start()

