var Ajax = {
  get:function(url,fn){
     var xhr = new XMLHTTPRequest();
     xhr.open('get',url,true);
     xhr.onreadystatechange = function(){
        if (xhr.readystate == 4 && xhr.status ==200){
          fn.call(this,xhr.responseText);
        }
     }
     xhr.send();
  },
  post:function(url,data,fn){
     var xhr = new XMLHTTPRequest();
     xhr.open('post',url,true);
     xhr.setRequestHead('Content-Type','application/json')
     xhr.onreadystatechange = function(){
        if (xhr.readystate == 4 && xhr.status ==200){
          fn.call(this,xhr.responseText);
        }
     }
     xhr.send(data);
  }

}
