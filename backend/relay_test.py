#!/usr/bin/env python  

import pindefinition as pd
import modules.relay as relay
import time
import RPi.GPIO as GPIO
import atexit
atexit.register(GPIO.cleanup)  

def main():
	myRelay = relay.Relay(pd.RelayPin)
	time.sleep(1)
	myRelay.setRelay(1);
	time.sleep(1)
	myRelay.setRelay(0);
	time.sleep(1)
	myRelay.setRelay(1);
	time.sleep(1)	
	myRelay.cleanup();

	
	
	
if __name__ == "__main__":
	main()
