// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数

const db = cloud.database()

exports.main = async(event, context) => {

    if (event.cmd == "put") {

        let token = await db.collection('token').where({
            openid: event.userInfo.openId // 填入当前用户 openid
        }).get()
        if (token.data.length) {
            return await db.collection('token').where({ openid: event.userInfo.openId}).update({
                // data 字段表示需新增的 JSON 数据
                data: {
                    token: event.token,
                    // openid: event.userInfo.openId,
                    time: new Date().getTime() + 10 * 60000
                }
            })

          
        }else{
            return await db.collection('token').add({
                // data 字段表示需新增的 JSON 数据
                data: {
                    token: event.token,
                    openid: event.userInfo.openId,
                    time: new Date().getTime() + 10 * 60000
                }
            })
        }
  
    } else if (event.cmd == "get") {
        
        let token = await db.collection('token').where({
            openid: event.userInfo.openId // 填入当前用户 openid
        }).get()
        
        if (token.data.length) {
            if (new Date().getTime() <  token.data[0].time) {
                return {
                    'token': token.data[0].token
                }
            }else{
                return (new Date().getTime() - token.data[0].time)
            }
        }
        return {
            token: null
        }

    } else if (event.cmd == "del") {
     return  await db.collection('token').where({
            openid: event.userInfo.openId
        }).remove()

    }
}