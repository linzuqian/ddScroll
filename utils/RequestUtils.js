  let app = getApp();
  let url = "http://ad.api.dingoffice.com/api/"
  export function postTo(path,data,success,fail,complate){
    request(path,"POST",data,success,fail,complate)
  }
  export function getTo(path,data,success,fail,complate){
    request(path,"GET",data,success,fail,complate)
  }

  function request(path,method,data,success,fail,complate){
    var requestUrl = url + path
    var token = app.globalData.token
    dd.httpRequest({
      url:requestUrl,
      method:method,
      data:data,
      headers:{"token":token},
      dataType:"json",
      success:success,
      fail:fail,
      complate:complate
    });
  }
