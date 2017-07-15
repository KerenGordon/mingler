<template>
  <div id="app" class="container">
    <MainNav class="navbar" />
    <router-view></router-view>
  
  </div>
</template>
<script>
import MainNav from '@/components/MainNav';
import { GET_VALS_FROM_STORAGE } from './store/store'

export default {
  name: 'app',
  data() {
    return {
    }
  },
    created() {
      this.getValsFromStorage() ;
    },
    methods: {
        getValsFromStorage(){
            var msg = {dommy:'dommy'}
            this.$store.dispatch({ type: GET_VALS_FROM_STORAGE, msg: msg })

        }
    },
  components: {
    MainNav,
  }
}
</script>


<style lang="scss">

@import url('https://fonts.googleapis.com/css?family=Kurale');
#app {
  // display: flex;
  // flex-direction: column;  
  font-family: 'Kurale', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #652456;
  background: rgba(230, 230, 230, 0.7);
  max-width: 768px;
  height: 100%;
  ;
  margin: auto;
}

.navbar {
  border-bottom: 1px solid lightgrey;
  width: 100%;
}

body {
  background: #C02425; 
  background: linear-gradient(to bottom, #eb5757, #000000); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  margin: 0;
  height:100%;
  overflow-y: hidden;
  a {
    text-decoration: none!important;
  }
}

</style>
