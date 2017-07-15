

import moment from 'moment';

import ioClient from 'socket.io-client'
//==============================================
const msgs = [];
const msgLocalId = 0;

// const onlineUsers = [];
const currUser =   null;

const socket = ioClient('http://localhost:3003');
//const socket = ioClient('http://localhost:3003');
// const state = {
//   msgs:[],
//   currUser :  null
// }
console.log('socket!!!!!!-', socket);
// sendUser();
//==============================================
socket.on('msg received', function (strMsg) {
    var msg = JSON.parse(strMsg);
    // msg.atFormated= moment(msg.at).format('HH:mm');
    //       if (nickName === msg.from && msgs.length>0) {
    //         console.log('msgs len', msg);
    //       msgs[msgs.length-1].processed = true;
    //         // console.log('msg.anickName === msg.from-', msg);
    // }else {
    //     console.log('msg.atFormated-', msg);
    //     msgs.push(msg);
    //     if(msg.type1 == 'typing') deleteTypingMsg(msg)
    // }

      
      
      
      switch (msg.type1) {
        case 'getMyHistory':
            msgs.splice(0,msgs.length,...msg.msgs);
            // msgs.concat(msg.msgs);getMyHistory
            console.log('msg.service.return.getMyHistory-',msgs.length )
        break;
        case 'sendMsgToUser'://
            msgs.push(msg);
        break;
        case 'updateMsgs'://
            updateMsgs(msg.msgs);
        break;
        case 'initUser'://
            initUser(msg);
        break;
        case 'askUserToInit':
            if (currUser) sendUser({type1:'initUser',from:currUser, socket:socket.id})
        break;
      }

});
//==============================================
function updateMsgs(msgsToUpdate){
  msgsToUpdate.forEach((msg)=>{
      var idx = getMsgIdxById(msg.id);
        msgs.splice(idx,1,msg);
      console.log('msg.service.updateMsg-', msg);
  });
}

//====================================================================================
function getMsgIdxById(id) {
	var index = msgs.findIndex((user) => user.id === id);
	return index;
}
//====================================================================================
function updateVals(msg){
  // var userObj = {id:msg.from,password:password}
  // localStorage.setItem('testObject', JSON.stringify(userObj));

}
//==============================================
function pushToMsgs(msgsToAdd){
      console.log('msg.service.pushToMsgs. msgs.length-', msgs.length);
      // msgs = msgsToAdd;
}
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
// const getOnlineUsers = () =>{
//   return onlineUsers;
// }
//==============================================
 const send = (msg) => {
    updateVals(msg);
    console.log('msg.service.send:, type1:', msg.type1)
    //msg.type = 'msg';
    // if(msg.type1 !== 'typing' ) msgs.push(msg);
    
    console.log('msg',msgs)
    socket.emit('sendMsg', JSON.stringify(msg));
 }
//==============================================
 const sendTyping = (msg) => {
    msg.type = 'typing';
    socket.emit('sendMsg', JSON.stringify(msg));
 }
//==============================================
 const closeSocket = () => {
    msg.type = 'msg.service.closeSocket';
    // socket.disconnect();
 }
//==============================================
 const sendUser = (msg) => {
    updateVals(msg)
    console.log('send user:', currUser);
    msg.from = currUser;
    msg.type = 'sendUser';
    socket.emit('sendMsg', JSON.stringify(msg));
 }
//==============================================
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
  // getOnlineUsers
}
