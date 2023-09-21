import json
img_index = False
subdir = "img_1024"
with open (subdir+'/web_index.json') as j:
    img_index = json.load(j)
    j.close()

ignore_keys = ('filename_th', 'filename', 'visited', 'id', 'link', 'location')
    
html_head = """
<!doctype html><html>
    <head>
        <title>1024</title>
        <link rel="stylesheet" type="text/css" href="1024.css">
        <script type="text/javascript">
        function showDiv(idInfo) {
          var sel = document.getElementById('large_wrapper').getElementsByTagName('div');
          for (var i=0; i<sel.length; i++) {sel[i].style.display = 'none'; }
          document.getElementById('large_image_'+idInfo).style.display = 'block';}
        </script>        
    </head>
    <body>
    
"""

html_foot = """
        </div>
    </body>
</html>
"""
    
def thumb_tag(ikey, idict):
    path_th = idict['filename_th'].replace('webimg','img_1024')
    return '<a href="#" onclick="showDiv(\'{0}\');return false"><img class="thumb" src="{1}"></a>'.format(ikey,path_th)

def key_val_row(key,val): return '<tr><td>{0}</td><td>{1}</td></tr>'.format(key,val)

def map_img(lat,long):
    latlong = lat+","+long
    size = "450x225"
    zoom = "12"
    return '<a href="https://www.google.com/maps/@{0},{2}z" target="_blank"><img src="http://maps.google.com/maps/api/staticmap?center={0}&markers={0}&size={1}&zoom={2}"></a>'.format(latlong,size,zoom)
    
def img_tag(ikey, idict):
    path_img = "img_1024/"+idict['filename']
    html_string = '<div id="large_image_{0}" style="display:none;"><img class="large_image" src="{1}">'.format(ikey,path_img)
    html_string += '<table>'
    html_string += key_val_row('','<a class="img_id_link" href="{0}" target="_blank">{1}</a>'.format(idict['link'],"%05d" % (int(idict['id']),)))
    for key, val in idict.items():
        if key not in ignore_keys:
            if key == 'other-tags' :
                if val: html_string += key_val_row("tags",", ".join(val))
            else: html_string += key_val_row(key,str(val))
    html_string += '</table>'
    if 'location' in idict and idict['location']:
        lat,long = idict['location']['latitude'], idict['location']['longitude']
        html_string += map_img(lat,long)
    html_string += '</div>'
    return html_string
    
html_string = html_head
html_string += '<div id="thumb_wrapper"><div class="row">'
for n in range(1024):
    if n>0 and n%32==0 : html_string += '</div><div class="row">'
    key = "%05d" % (n,)
    html_string += thumb_tag(key, img_index[key])
html_string += '</div></div>'

html_string += '<div id="large_wrapper">'
for n in range(1024):
    key = "%05d" % (n,)
    html_string += img_tag(key, img_index[key])
html_string += '</div>'

html_string += html_foot

html_path = '1024.html'
#overwrite file with new information
with open (html_path, 'w') as k:
    k.write(html_string)
    k.close()