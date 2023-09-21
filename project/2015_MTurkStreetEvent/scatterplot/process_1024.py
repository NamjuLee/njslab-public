import json, os
img_index = False
json_filepath = 'index_w_aggregated_answers_and_sets.json'
with open (json_filepath) as j:
    img_index = json.load(j)
    j.close()


img_index['meta']['plot_keys'] = ('buildingness','pleasantness','landscapeness','occupiness')

#web_json = []


ignore_keys = ('visited', 'id', 'link', 'location')
for key,item in img_index['data'].items():
    if not 'filename_th' in item:
        item['filename_th'] = os.path.basename(item['filename'])
    else:
        item['filename_th'] = os.path.basename(item['filename_th'])
    item['filename'] = os.path.basename(item['filename'])
    item['guid'] = key
    
    #web_json.append(item)


filename = 'index_viz'
html_path = filename+'.js'
json_path = filename+'.json'
#overwrite file with new information
with open (html_path, 'w') as k:
    #k.write("plot_keys = ['{0}'];".format("','".join(plot_keys)))
    k.write(filename+"_meta="+json.dumps(img_index['meta'])+";")
    k.write(filename+"_data="+json.dumps([value for key,value in img_index['data'].items() ])+";")
    k.close()
    
with open (json_path, 'w') as k:
    #k.write("plot_keys = ['{0}'];".format("','".join(plot_keys)))
    k.write(json.dumps(img_index, indent=4))
    k.close()