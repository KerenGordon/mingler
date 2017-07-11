<template>
  <section class="user-zone">
    <div v-if="currUser" class="edit-header">
      <h2 >Edit your profile</h2>
      <el-button size="mini"  @click.stop="logoutUser">Logout</el-button>
    </div>
      <div v-else class="edit-header">
    <h2 >Create your new account</h2>
    <el-button size="mini"  @click.stop="logoutUser">already have an account? Login</el-button>
    </div>
   
    <el-form class="form" label-position="top">
      <el-form-item>
        <el-col :span="11" :xs="24">
          <el-input v-model="user.name" class="input" placeholder="Your Name"></el-input>
        </el-col>
        <el-col :span="11" :offset=2 :xs="{span:24, offset:0}">
          <el-date-picker type="date" placeholder="Date of birth" v-model="user.birth"
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
  
        <!--<el-form-item label="Upload picture">
          <el-upload class="upload-demo" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="user.photo">
            <el-button size="small" type="accent">Click to upload</el-button>
          </el-upload>
        </el-form-item>-->
      </section>
  
      <el-form-item label="Tell us about yourself...">
        <el-input type="textarea" v-model="user.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="md-accent" @click.stop="submitForm">Submit</el-button>
        <el-button @click="moveToBrowse">Cancel</el-button>
      </el-form-item>
    </el-form>
    <!--
    <div class="form-user">
      <input type="text" placeholder="Your Name" v-model="user.name">
      <input type="text" placeholder="Your Birth (dd/mm/yyy)" v-model="user.birth">
      <input type="text" placeholder="gender (m/f)" v-model="user.gender">
      <input type="text area" placeholder="Free text about yourself" v-model="user.description">
      <input type="text " placeholder="link to your photo" v-model="user.photo">
      <img :src=user.photo class="user-photo"> 
      <input type="login " placeholder="login" v-model="user.login">
      <input type="password " placeholder="password" v-model="user.password">
      <el-button @click="submitForm"> SUBMIT </el-button>
      <el-button @click="moveToBrowse"> CANCEL </el-button>
    </div>
    -->
  </section>
</template>

<script>
import { ADD_USER } from '../store/store'
import { LOG_OUT } from '../store/store'

export default {
  data() {
    return {
      //currUser:  this.$store.state.user.currUser,
      user: {
     //   id: '',
        name: '',
        birth: '',
        gender: '',
        description: '',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Orang_Utan%2C_Semenggok_Forest_Reserve%2C_Sarawak%2C_Borneo%2C_Malaysia.JPG',
        userName: '', // TBD replace all userName with login
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
      this.$store.dispatch({ type: ADD_USER, data: this.user });
    },
       moveToBrowse() {
      console.log('Edit: move to browse ')
      this.$router.push('Browse')
    },
       logoutUser() {
      console.log('Edit: perform logout ')
      this.$store.dispatch({ type: LOG_OUT});
      this.$router.push('/')
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
</style>