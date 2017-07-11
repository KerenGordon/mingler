<template>
  <div id="app" class="container">
    <MainNav class="navbar" />
    <router-view></router-view>
  
  </div>
</template>
<script>
import MainNav from '@/components/MainNav';
export default {
  name: 'app',
  data() {
    return {
    }
  },
  components: {
    MainNav,
  }
}
</script>


<style lang="scss">

#app {
  @import url('https://fonts.googleapis.com/css?family=Kurale');
  box-shadow: 0 0 23px 16px rgba(0, 0, 0, 0.2);
  font-family: 'Kurale', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #652456;
  background: rgba(230, 230, 230, 0.7);
  max-width: 768px;
  height: 100em;
  ;
  margin: auto;
}

.navbar {
  box-shadow: 0 0 10px 1px rgba(0,0,0,0.35) inset;
}

body {
  background: #C02425; 
  // background: linear-gradient(to right, #F0CB35, #C02425);
  // background: linear-gradient(to right, #070000, #4c0001, #070000); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: linear-gradient(to bottom, #eb5757, #000000); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  // background: linear-gradient(to bottom, #200122, #6f0000);
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  margin: 0;
  overflow-y: hidden;
  a {
    text-decoration: none!important;
  }
}

</style>
