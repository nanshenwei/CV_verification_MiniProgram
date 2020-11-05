//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    ip:"127.0.0.1:8000",
    is_res_img:0
  },
  change_ip(e){
    this.setData({
      ip:e.detail.value
    })
  },
  upload(){
    let that = this
    wx.chooseImage({
      success (res) {
        let starttime = Date.parse(new Date())/ 1000;
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'http://'+that.data.ip+'/main', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'raw_img',
          timeout: 60000,
          success (res){
            console.log(res)
            if(res.statusCode==200){ 
              let res_img = 'data:image/png;base64,'+ res.data
              that.setData({
                is_res_img:1,
                res_img
              })
            }
          let endtime = Date.parse(new Date())/ 1000;
          let totaltime=endtime-starttime
          that.setData({
            totaltime
          })
          }
        })
      }
    })
  }
})
