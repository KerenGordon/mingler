import moment from 'moment';

import ioClient from 'socket.io-client'
//==============================================
const msgs = [];
const msgLocalId = 0;

const onlineUsers = [];
var nickName = lorem();
const currUser = {nickName:nickName};
//const socket = ioClient('http://localhost:3003');
//const socket = ioClient('http://localhost:3003');


//console.log('socket!!!!!!-', socket);
//sendUser();


//==============================================
socket.on('msg received', function (strMsg) {
    var msg = JSON.parse(strMsg);
    
    // JIF
    if (nickName === msg.from && msgs.length>0) {
            console.log('msgs len', msg);
          msgs[msgs.length-1].processed = true;
            // console.log('msg.anickName === msg.from-', msg);
    }else {
        console.log('msg.atFormated-', msg);
        msgs.push(msg);
        if(msg.type1 == 'typing') deleteTypingMsg(msg)
    }
    msg.atFormated= moment(msg.at).format('HH:mm');
});
//==============================================
function deleteTypingMsg(msg){
    setTimeout(()=>{
      var idx = msgs.findIndex(function(msg1){
        return msg.id===msg1.id;
      })
      console.log('msgs.len=' , msgs.length)
      msgs.splice(idx,1);
      console.log('msgs.len=' , msgs.length)
    }, 3000)
}

//==============================================
const getMsgs = () =>{
  return msgs;
}
//==============================================
const getOnlineUsers = () =>{
  return onlineUsers;
}
//==============================================
 const send = (msg) => {
    console.log('send msg service, type1:', msg.type1)
    //msg.type = 'msg';
    if(msg.type1 !== 'typing' ) msgs.push(msg);
    socket.emit('sendMsg', JSON.stringify(msg));
 }
//==============================================
 const sendTyping = (msg) => {
    msg.type = 'typing';
    socket.emit('sendMsg', JSON.stringify(msg));
 }
//==============================================
 function sendUser(){
    currUser.type1 = 'sendUser';
    console.log('send user:', currUser)
    socket.emit('sendMsg', JSON.stringify(currUser));
 }
//==============================================


function lorem(size=5)
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for( var i=0; i < size; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
//==============================================



export default {
  getMsgs,
  send,
  nickName,
  getOnlineUsers
}
