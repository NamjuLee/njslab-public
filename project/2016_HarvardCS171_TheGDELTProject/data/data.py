import csv
import json
dataIndex = 0


def SaveJson(path, data): # "source\\K-town_streetviews.json"
    with open(path, 'w') as f:
        f.write(json.dumps(data, indent=4 , ensure_ascii=False, encoding="latin1"))
        f.close()

def ConvertFromCSVtoDic(path):
	out = []
	with open(path, 'rb') as csvfile:
	    spamreader = csv.reader(csvfile, delimiter=' ', quotechar='|')
	    
	    for row in spamreader:
	    	if len(row) != 0:
	    		data = row[1].split("\t")
	    		theDic = {}
	    		if len(data) > 1:
	    			theDic["Country "] = data[0];
	    			theDic["CountryID1"] = data[1];
	    			theDic["CountryID2"] = data[2];
	    			theDic["Coordinates"] = [data[3] , data[4]];
	    			out.append(theDic)
	    			# print theDic
	    			# print "---------------------------"
	return out	

dataOut = ConvertFromCSVtoDic("map2.csv")
SaveJson("map.json", dataOut) 