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
      <el-form-item class="details">
  
        <el-form-item label="Gender" class="form-item">
          <el-radio-group v-model="user.gender">
            <el-radio label="Male" value="m" ></el-radio>
            <el-radio label="Female" value="f"></el-radio>
          </el-radio-group>
        </el-form-item>

      </el-form-item>
      <!---->
      <el-form-item label="Tell us about yourself...">
        <el-input type="textarea" v-model="user.description"></el-input>
      </el-form-item>
      <el-form-item >

          <div label="my photo" class = "flex-row photo-container">
          
                <!--<div  v-for="(photo,idx) in user.photos" key= "idx" class="photo" >-->
            <div  class="photo" >
                  <img :src="user.photos[0]" />
            </div>
          
            <div class = "flex-col">
                  <el-upload 

                      class="md-icon-button md-list-action"
                      action=""
                      :show-file-list="false"
                      :http-request="httpRequest">
                    <md-button class="flex-center"><div>
                      <md-icon class="material-icons cloud_upload">cloud_upload</md-icon></div>
                    </md-button>
                  </el-upload >
                  
                  <md-button v-if="user.photos[0]" class="flex-center md-icon-button md-list-action" @click="deletePhoto">
                        <div>
                        <md-icon class="material-icons delete_forever">delete_forever</md-icon>
                        </div>
                  </md-button>

            </div>
          </div>
      </el-form-item>

      <el-form-item>
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
// import axios from 'axios';
import photoService from '../services/photo.service';
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
        photos: ['https://upload.wikimedia.org/wikipedia/commons/b/be/Orang_Utan%2C_Semenggok_Forest_Reserve%2C_Sarawak%2C_Borneo%2C_Malaysia.JPG'],
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
    deletePhoto(){
      console.log('Edit.deletePhoto.req:', );
       this.user.photos.splice(0);

    },
  httpRequest(req){
      console.log('Edit.httpRequest.req:', req)
      var that = this;
       var url = photoService.uploadPhoto(req).then((res)=> {
          that.user.photos.splice(0,1,res);
       });
      console.log('Edit.httpRequest.url:', url)
      
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
.user-zone{
height:calc(100% - 150px);
}

.el-button {
  margin-left:10px;
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
  overflow-y: scroll;
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
.el-form-item__content{
  display:flex;
  flex-direction: row;
}
.photo-container{
  // border: 1px solid green;
}
 .photo{
  border-radius: 4px;
  // padding:5px;

  height:100px;
  width:100px;
  border: 1px solid #bfcbd9;
  margin-right:5px;
    img{
     height:100%;
      width:auto;
      border-radius: 4px;

 }

}

.details {
  // display: flex;
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
.flex-col{
  // margin:10px;
  display:flex;
  flex-direction: column;
  justify-content: center;
  // border:1px solid blue;
}
.flex-row{
  margin:10px;
  display:flex;
  flex-direction: row;
  justify-content: center;
  // border:1px solid red;
}
.flex-center{
  // display:flex;
  justify-content: center;
  // align-items:center;
  // border:1px solid blue;
  line-height:50%;
  text-align:center;
}
.md-button:last-child{
  margin-top:5px;
}
.md-button{
  border: 1px solid #bfcbd9;
  border-radius:0;
  padding:0;
  margin:0;
  min-width:0;
  width:3em;
  height:3em;
  border-radius: 5px;
}
.md-button :hover{
  // background-color: gray;
  // border: 1px solid gray;
}
.material-icons{
  // border:1px solid green;
  border-radius:7px;
  // height:1.5em;
  // width:1.5em;
  text-align: center;
  vertical-align: middle;

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
    // border:1px solid red;
    margin:10px;

  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;

  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100%;
    height:25%;
    // line-height: 25%;
    text-align: center;
        // border:1px solid red;

  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }



</style>

