<template>
  <div>
    <img src="~assets/wave.svg" class="wave" alt="login-wave" />
    <div class="row" style="height: 100vh">
      <div class="col-0 col-md-6 flex justify-center content-center">
        <img src="~assets/login.svg" class="responsive" alt="login-image" />
      </div>
      <div
        v-bind:class="{
          'justify-center': $q.screen.md || $q.screen.sm || $q.screen.xs,
        }"
        class="col-12 col-md-6 flex content-center"
      >
        <div
          v-bind:style="$q.screen.lt.sm ? { width: '80%' } : { width: '50%' }"
          class="items-center justify-center"
        >
          <q-intersection transition="flip-left">
          <q-card style="border-radius: 2em">
            <q-card-section>
              <q-avatar size="103px" class="absolute-center">
                <img src="~assets/care.png" alt="avatar" />
              </q-avatar>
            </q-card-section>
            <q-card-section>
              <div class="q-pt-lg">
                <div class="col text-h6 ellipsis flex justify-center">
                  <h2
                    class="text-h4 q-my-none text-weight-regular"
                  >
                    {{$route.path === '/' ? 'Login' : 'Register'}}
                  </h2>
                </div>
              </div>
            </q-card-section>
            <q-card-section>
              <LoginVue v-if="$route.path === '/'" />
              <RegisterVue v-if="$route.path === '/register'" />
            </q-card-section>
          </q-card>
          </q-intersection>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import LoginVue from "src/components/Login.vue";
import RegisterVue from "src/components/Register.vue";
export default {
  components: {
    LoginVue,
    RegisterVue,
  },
  name: "Login",
  data() {
    return {
      login: {
        username: "Joabson",
        password: "a2d4g6j8",
      },
    };
  },
  methods: {
    ...mapActions("auth", ["doLogin"]),
    async submitForm() {
    },
  },
};
</script>

<style scoped>
.wave {
  position: fixed;
  height: 100%;
  left: 0;
  bottom: 0;
  z-index: -1;
}
</style>