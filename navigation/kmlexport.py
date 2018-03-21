import json

def exportToKML(route, tracefile, kmlroutefile, kmltracefile):
    with open(kmlroutefile, 'w') as f:
        for wp in route.wplist:
            f.write('          ' + str(wp.longitude) + ',' + str(wp.latitude) + ',0\n')
    with open(kmltracefile, 'w') as fout:
        with open(tracefile, 'r') as fin:
            data = json.load(fin)
            for point in data['Points']:
                fout.write('          ' + str(point['longitude']) + ',' + str(point['latitude']) + ',0\n')
