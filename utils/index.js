
import { $api } from './api';

let fetchUserInfo = function(success,err){
    $api({
        method:'GET',
        url: '/user',
        success: function(res){
            wx.setStorageSync('userInfo',res.data)
            success(res.data)
        },
        fail:function(){
            wx.removeStorageSync('userInfo')
            err && err()
        }
    })
}


let getUserInfo = function(success,err){
    try {
        var value = wx.getStorageSync('userInfo')
        if (value) {
            success(value)
        }else{
            fetchUserInfo(success,err)
        }
    } catch (e) {
        err && err()
    }
}

let register = function(code){
    //调用登录接口
    wx.getUserInfo({
        withCredentials: true,
        success: function(res) {
            // res.code = code
            let {encryptedData,iv} = res
            $api({
              method: 'POST',
              url:'/user/onlogin',
              data:{
                code,encryptedData,iv
              },
              success:function(res){
                wx.setStorageSync('userInfo',res.data)
              },
              fail: function(err){
                wx.removeStorageSync('userInfo')
                console.log(err)
              }
            })
        }
      })
}

let login = function(){
    wx.login({
        success: function(res) {
          let code = res.code;
          register(code)
        }
    });
}
export {
    fetchUserInfo,
    getUserInfo,
    login
}