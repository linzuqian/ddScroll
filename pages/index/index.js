Page({
  data: {
    list: [
      { id: 111, name: "滚动1" },
      { id: 222, name: "滚动2" },
      { id: 333, name: "滚动3" },
      { id: 444, name: "滚动4" },
      { id: 555, name: "滚动5" },
      { id: 666, name: "滚动6" },
      { id: 777, name: "滚动7" },
      { id: 888, name: "滚动8" },
      { id: 999, name: "滚动9" },
      { id: 1010, name: "滚动10" },
      { id: 1111, name: "滚动11" },
      { id: 1212, name: "滚动12" },
      { id: 1313, name: "滚动13" },
      { id: 1414, name: "滚动14" },
      { id: 1515, name: "滚动15" },
      { id: 1616, name: "滚动16" },
      { id: 1717, name: "滚动17" },
      { id: 1818, name: "滚动18" },
    ],
  },
  onShow() {
    this.getGroupLists();
  },
  getGroupLists() {
    let groupLists = this.data.list.concat(this.data.list)
    this.setData({
      list: groupLists
    })
  },
  lower(e) {
    this.getGroupLists()
  },
  toDetails() {
    dd.navigateTo({
      url: "../setting/index"
    });
  }
})
