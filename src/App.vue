<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/> -->
  <!-- <router-view> -->
  <!-- <app-start></app-start> -->
<router-view />

</template>

<script>

import AppStart from './components/Start.vue'
// import axios from 'axios'

export default({

  components:{
    AppStart,
  }, 
//   data(){
//     return {
// info:null
//     }
//   },
  // mounted() {
  //   axios
  //     .get('https://api.sbercloud.ru/content/v1/bootcamp/frontend')
  //     .then(response => (this.info = response));
  // },

})
</script>

<style>
#app {
  margin:0;
  padding:0;
  
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50; */
}

/* nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
