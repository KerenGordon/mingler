<template>
<!--TODO - REQUIRED FIELDS-->

  <section class="user-zone">
    <div v-if="currUser" class="edit-header">
      <h2 >Edit your profile</h2>
      <el-button size="mini"  @click.stop="logoutUser">Logout</el-button>
    </div>
      <div v-else class="edit-header">
    <h2 >Create your new account</h2>
    <el-button size="mini"  @click.stop="logoutUser">Have an account? Login</el-button>
    </div>
   
    <el-form class="form" label-position="top">
      <el-form-item>
        <el-col :span="11" :xs="24">
          <el-input v-model="user.name" class="input" placeholder="Your Name"></el-input>
        </el-col>
        <el-col :span="11" :offset=2 :xs="{span:24, offset:0}">
          <el-date-picker type="text" placeholder="Year of birth" v-model="user.birth"
           style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="11" :xs="24">
          <el-input v-model="user.userName" class="input" placeholder="Choose username"></el-input>
        </el-col>
        <el-col :span="11" :offset=2 :xs="{span:24, offset:0}">
          <el-input type="password" class="input" placeholder="Choose password" v-model="user.password" 
          auto-complete="off"></el-input>
        </el-col>
      </el-form-item>
      <section class="details">
  
        <el-form-item label="Gender" class="form-item">
          <el-radio-group v-model="user.gender">
            <el-radio label="Male" value="m" ></el-radio>
            <el-radio label="Female" value="f"></el-radio>
          </el-radio-group>
        </el-form-item>

      </section>
  
      <el-form-item label="Tell us about yourself...">
        <el-input type="textarea" v-model="user.description"></el-input>
      </el-form-item>
      <el-form-item>


    <div>

            <el-upload
              class="avatar-uploader"
              action=""
              :show-file-list="false"
              :http-request="httpRequest">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
      
      </div>


        <el-button @click="moveToBrowse">Cancel</el-button>
        <el-button type="md-accent" @click.stop="submitForm">Submit</el-button>
        <div v-if="loadingFlag" class="loading-gif"> <img  class="loading-image" src="../assets/loading.gif"></div>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
import { ADD_USER } from '../store/store'
import { LOG_OUT } from '../store/store'//
import { UPLOAD_PHOTO } from '../store/store'
import axios from 'axios';

export default {
  data() {
    return {
      loadingFlag: false,
      //photo loader=========
          cloud_name: 'ilanbeyos',
          upload_preset: 'vlwm5wec',
          msg: 'Simple Img Uploader Using cloudinary & axios & Vue',
          imageUrl: '',
      //photo loader=========
      user: {
     //   id: '',
        name: '',
        birth: '',
        gender: '',
        description: '',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Orang_Utan%2C_Semenggok_Forest_Reserve%2C_Sarawak%2C_Borneo%2C_Malaysia.JPG',
        userName: '', // TBD replace all userName with login
        // login: '', // TBD replace all userName with login
        password: '',
        email: ''
      }
      }
  },

  created(){
    var currUserInit = this.$store.getters.fetchCurrUser;
    console.log ('Edit - created - currUserInit:' , currUserInit)
    if(currUserInit) this.user = currUserInit;
 },
   watch:{
      currUser: function(userExist){
      console.log('EDIT: user logged in - move to BROWSE?');
      if(userExist){
      console.log('EDIT: user logged in - user exists - move to BROWSE!!!');
      this.$router.push('Browse');      } 
      }
  },
    computed: {
    // loginStatus() {
    //   console.log('LOGIN: submit form clicked: ', this.user)
    //   return this.$store.getters.fetchLoginStatus === false;
    // },

    currUser() {
      console.log('EDIT: curreUser: ', this.$store.getters.fetchCurrUser)
      return this.$store.getters.fetchCurrUser;
    }
    },
  methods: {
    submitForm() {
      console.log('Edit: submit form: ', this.user)
      this.loadingFlag = true;
      this.$store.dispatch({ type: ADD_USER, data: this.user })
        this.loadingFlag = false  
    },
       moveToBrowse() {
      console.log('Edit: move to browse ')
      this.$router.push('Browse')
    },
       logoutUser() {
      console.log('Edit: perform logout ')
      this.$store.dispatch({ type: LOG_OUT});
      this.$router.push('/') 
    },
  httpRequest(req){
        // this.$store.dispatch({ type: UPLOAD_PHOTO});

      let formData = new FormData();
      formData.append('file', req.file);
      formData.append('upload_preset', this.upload_preset);

      axios({
        url: `https://api.cloudinary.com/v1_1/${this.cloud_name}/image/upload`,
        method: 'POST',
        headers: {
            'Content-Type': undefined,
            'X-Requested-With': 'XMLHttpRequest'
        },
        data: formData,
      }).then( (res) => {
        if (res.status === 200){
          console.log('upload sucsess', res);
          this.imageUrl = res.data.url;
        }
        else{
          console.info('oops, something went wrong', res);
        }
      }).catch( (err) => {
        console.error(err);
      });
    }
  }
}
  
</script>

<style lang="scss" scoped>

.edit-header{
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: auto;
}


.el-button--mini {
    height: 2em;
    align-self: center;
}
a {
  color: #652456;
  text-decoration: none;
  text-transform: uppercase;
  &:hover {
    color: #FE761C;
  }
}

.btn:hover,
a:hover {
  transition: all 0.3s ease-in-out;
}

.form {
  display: flex;
  flex-direction: column;
  width: 90%;
  max-height: 100%;
  margin: auto;
  background-color: rgba(239, 237, 234, 0.7);
  box-shadow: 0 0 10px 3px rgba(220, 220, 220, 0.3);
  padding: {
    top: 2em;
    left: 2em;
    right: 2em;
    bottom: 0;
  }
  .form-item {
    margin: 0;
  }
}

.details {
  display: flex;
  justify-content: space-around;
}

.loading-gif{
  z-index: 1000;
   position: fixed;
   margin: auto;
  top:0;
  left:0;
   width: 100%;
  height: 100%;
  background-color: gray;
  display: flex;
  justify-content: center;
  align-items:center;
  opacity: 0.5;
}

.loading-image{
width: 10%;

}
.avatar-uploader .el-upload {
    border: 1px dashed black;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }



</style>