


import serverService from './service'
import axios from 'axios'

//=====================================================================
const uploadPhoto = msg => {
      console.log('service.uploadPhoto.msg:', msg);
        // return
        var req             = msg.req;
        var cloud_name      = 'ilanbeyos';
        var upload_preset   = 'vlwm5wec';

        let formData = new FormData();
      formData.append('file', req.file);
      formData.append('upload_preset', upload_preset);

       return axios({
        url: `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        method: 'POST',
        headers: {
            'Content-Type': undefined,
            'X-Requested-With': 'XMLHttpRequest'
        },
        data: formData,
      }).then( (res) => {
        if (res.status === 200){
          console.log('upload sucsess', res);
          var imageUrl = res.data.url;
          return imageUrl;
        }
        else{
          console.info('oops, something went wrong', res);
        }
      }).catch( (err) => {
        console.error(err);
      });
//===========  
  // return axios.get('http://localhost:3003/uploadPhoto', msg)
  //   .then(function (response) {
  //     console.log('service.uploadPhoto:', response.data);
  //     return response.data;
  //   })
}
//=====================================================================
const restartUsers = msg => {
      console.log('service.restartUsers1:', msg);
  return axios.get('http://localhost:3003/restartUsers', msg)
    .then(function (response) {
      console.log('service.restartUsers2:', response.data);
      return response.data;
    })
}
//=====================================================================
//  return axios.get('http://localhost:3003/restartUsers', msg)
const getUser = msg => {
      console.log('service.getUser:', msg);
  return axios.get('http://localhost:3003/getUser', msg)
    .then(function (response) {
      console.log('service.getUser:', response.data.data);
      return response.data.data;
    })
}
//=====================================================================
const sendMsg = msg => {
      console.log('service.sendMsg1:', msg);
  return axios.post('http://localhost:3003/data/msg', msg)
    .then(function (response) {
      console.log('service.sendMsg2:', response.data.data);
      return response.data.data;
    })
}
//=====================================================================
const addUser = msg => {
      console.log('service.addUser start:', msg);
  return axios.post('http://localhost:3003/users/addUser', msg)
    .then(function (response) {
      console.log('service.addUser response:', response);
      console.log('service.addUser response.data:', response.data);
      return response.data;
    })
}
//=====================================================================
const logIn = msg => {
      console.log('service.logIn:', msg);
  return axios.post('http://localhost:3003/logIn', msg)
    .then(function (response) {
      console.log('service.logIn:', response.data);
      return response.data;
    })
}
//=====================================================================
const logOut = msg => {
      console.log('service.logOut1:'+ msg);
  return axios.post('http://localhost:3003/logOut', msg)
    .then(function (response) {
      console.log('service.logOut2:', response);
      return response.data;
    })
}
//=====================================================================
const like = msg => {
      console.log('service.like1 message:',msg);
  return axios.put('http://localhost:3003/likeUser', msg)
    .then(function (response) {
      console.log('service.like2:', response);
      return response.data;
    })
}

//=====================================================================
//app.get('/data/:objType/:filter/:id', function (req, res) {

const getBrowsed = _id => {//
      console.log('service.getBrowsed1:', _id);
  return axios.get(`http://localhost:3003/data/users/browsed/${_id}`)
    .then(function (response) {
      console.log('service.getBrowsed2:', response.data);
      return response.data;
    })
}

//=====================================================================
// const getBrowsed = msg => {//
//       console.log('service.getBrowsed1', msg);
//   return axios.get('http://localhost:3003/getMatched', msg)
//     .then(function (response) {
//       console.log('service.getBrowsed2:', response.data);
//       return response.data;
//     })
// }
//=====================================================================
//app.get('/data/:objType/:filter/:id', function (req, res) {

const getMatched = _id => {//
      console.log('service.getmatched1:', _id);
  return axios.get(`http://localhost:3003/data/users/matched/${_id}`)
    .then(function (response) {
      console.log('service.getMatched2:', response.data);
      return response.data;
    })
}

// const getMatched = msg => {//
//       console.log('service.getmatched1:', msg);
//   return axios.get('http://localhost:3003/getMatched', msg)
//     .then(function (response) {
//       console.log('service.getMatched2:', response.data);
//       return response.data;
//     })
// }
//=====================================================================
//=====================================================================
const sendMsg1111 = msg => {
      console.log('service.msg1:', msg);
      console.log('service.msg1.data:', msg.data);
      return msg.data


}
//=====================================================================


export default {
  sendMsg,
  addUser,
  uploadPhoto,
  like,
  restartUsers,
  getMatched,
  getBrowsed,
  logIn,
  logOut,
  getUser
}
