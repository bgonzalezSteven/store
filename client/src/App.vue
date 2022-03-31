<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import Vue from 'vue'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' //Vuesax styles
import money from 'v-money' 
// register directive v-money and component <money>
Vue.use(money, {precision: 4})
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
Vue.use(Vuesax, {
})

export default {
  name: 'App'
}
</script>
