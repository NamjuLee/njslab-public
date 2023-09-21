import json, os
img_index = False
filepath_in = 'index_w_aggregated_answers_and_sets.json'
with open (filepath_in) as j:
    img_index = json.load(j)
    j.close()


for key,item in img_index.items():
    pass

    
filepath_out = filepath_in[:-4]+"_FAKED.json"
#overwrite file with new information
with open (filepath_out, 'w') as k:
    k.write(json.dumps(img_index, indent=4))
    k.close()