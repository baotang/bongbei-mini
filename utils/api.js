var config = require('./config')
import { getToken,setToken } from './token'

function $api({method='GET',url,data={},success,fail,complete}) {
    url = config.serverUrl + url;
    if(method == 'GET'){
        data = {params: JSON.stringify(data)}
    }
    wx.request({
        method,
        url,
        data,
        header: {
            token: getToken(),
            'content-type': 'application/json' // 默认值
        },
        success: function(res){
            if(res.header.token){
                setToken(res.header.token)
            }
            if(res.statusCode >= 200 && res.statusCode < 300){
                success(res.data.data, res.data)
            }else{
                fail && fail()
            }
        },
        fail,
        complete(msg){
            complete && complete(msg)
        }
    })
}

export {
    $api  
}