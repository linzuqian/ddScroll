App({
  globalData:{
    token:''
  },
  onLaunch(options) {
      console.info('测试测试');
    dd.getStorageSync({
      key:"token",
      success:(res)=>{
        var a = 1
        this.globalData.token = res.token
        console.log(111)
      },
      fail:(err)=>{
        var b = 3
        var c = 3
        console.log(222)
      }
    })
    console.info('App onLaunch');
  },
  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
  },
});
