

import axios from 'axios'
//==============================================
//==============================================
// const uploadPhoto = msg => {
function uploadPhoto(req){
      console.log('service.uploadPhoto.msg:', req);
        // return

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
}


export default {
  uploadPhoto
}
