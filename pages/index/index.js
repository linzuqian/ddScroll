import Dropdown from '../../components/dropdown';
import list from '../../components/list';
import {postTo,getTo} from '../../utils/RequestUtils.js';

let app = getApp();
Page({
  ...Dropdown,
  ...list,
  data:{
    dropdownSelectData: {
      active: false,
      selectedNav: 0,
      listData: [
        {
          nav: '投放中',
          selectedItem: '',
          data: [
            {
              title: '投放中'
            },
            {
              title: '已结束',
            }
          ]
        },
      ],
    },
    listData: {
      onItemTap: 'handleListItemTap',
      data: []
    },
  },
  // drawdown开始
  onDropdownNavItemTap(e, index) {
    const { selectedNav, active } = this.data.dropdownSelectData;
    let nextactive = !active;
    var aaa = app;
    if (selectedNav !== index) {
      nextactive = true;
    }

    this.setData({
      dropdownSelectData: {
        ...this.data.dropdownSelectData,
        active: nextactive,
        selectedNav: index
      }
    });

    
  },
  catchDropdownNavItemTap(e, parentIndex, index, title) {
    const { listData } = this.data.dropdownSelectData;
    const data = listData[parentIndex];
    data.selectedItem = index;
    this.setData({
      dropdownSelectData: {
        ...this.data.dropdownSelectData,
        active: false,
        
      }
    });
    var nav = this.data.dropdownSelectData.listData[0].data[index].title;
    this.setData({
      ['dropdownSelectData.listData[0].nav'] : nav
    });
    this.downloadAdList(index)
  },
  catchDropdownBgTap(e) {
    this.setData({
      active: false
    });
  },
  // drawdown结束

  // list开始

  // list结束

  onLoad(query) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);

  },
  onReady() {
    var a = 11;
    // 页面加载完成
    if(app.globalData.token != ''){
      this.downloadAdList()
    }else{
      this.loginAndDownloadList()
    }
  },
  onShow() {
    // 页面显示
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },
  loginAndDownloadList(){
    console.info("点击登陆");
    var that = this;
    dd.getAuthCode({
        success:function(res){
          that.loginRequest(res.authCode);
        },
        fail:function(err){
          console.info(err);
        }
    });
  },
  loginRequest(authCode){
    
    postTo("ding/login",
    {
      authCode:authCode
    },
    (res)=>{
      if(res.data.code == 200){
        app.globalData.token = res.data.data.token;
        dd.setStorageSync({
          key:"token",
          data:app.globalData.token
        })
        this.downloadAdList();
      }
      
      console.info(res)
    },
    (err)=>{
      console.index(err)
    })
  },
  downloadAdList(type = 0){
    var status = type == 1 ? "Finished":"Normal";
    var _this = this;
    getTo("adManager/list",{pageSize:0,pageIndex:0,status:status},
    (res)=>{
      if(res.data.code == 200){
        var showList = [];
        for(var i = 0;i <res.data.data.list.length;i++){
          var ad = res.data.data.list[i];
          var title = ad.buildingName;
          var extra = '';
          extra += '总计：' + ad.subCount;
          extra += ',昨日：' + ad.yestodaySubCount;
          showList.push({title:title,extra:extra,textMode:"wrap"})
        }
   
        _this.setData({
          ['listData.data'] : showList
        })
      }

        console.info(res)
    },
    (err)=>{

    })
  }
});
