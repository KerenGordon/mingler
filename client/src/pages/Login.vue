<template>
  <section>
<div class="form-user">
<input type="login " placeholder="login" v-model="user.login">
<input type="password " placeholder="password" v-model="user.password">
<el-button @click="submitForm"> LOGIN </el-button>
<el-button @click="createAccount"> OR create ACCOUNT </el-button>
</div>


  </section>
</template>

<script>
import { LOG_IN } from '../store/store'

export default {
  data() {
    return {
      user: {
        login: '',
        password: ''
      }
      }
  },
  methods: {
    submitForm() {
      console.log('LOGIN: submit form clicked: ', this.user)
      this.$store.dispatch({ type: LOG_IN, user: this.user })
    },
    createAccount() {
      console.log('Edit: create account clicked: ', this.user)
      this.$router.push('Edit')
    }
 
  }
}
  
</script>

<style>
.form-user{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%
}
.user-photo{
  width: 50px;

}
</style>
