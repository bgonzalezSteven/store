<template>
  <q-layout view="hHh lpR fFf">
    <q-header style="border-radius: 0em 0em 2em 2em" class="text-black">
      <q-toolbar
        style="border-radius: 0em 0em 2em 2em"
        class="bg-primary text-white"
      >
        <q-btn dense flat round icon="short_text" @click="left = !left" />
        <q-space />
        <!--<q-toggle
            v-model="dark"
            checked-icon="nights_stay"
            color="green"
            unchecked-icon="brightness_low"
            @input="darkMode(dark)"
          />--->
        <vs-button
          v-if="$route.path != '/menu'"
          class="bg-negative"
          circle
          @click="$router.go(-1)"
        >
          <q-icon style="padding-right: 4px" name="chevron_left" />
          <q-tooltip
            content-class="bg-negative text-white shadow-4"
            :offset="[10, 10]"
          >
            Atras
          </q-tooltip>
        </vs-button>
        <vs-switch v-model="info.darkMode" @click="changeMode()">
          <template #off>
            <q-icon style="padding-right: 4px" name="close" />
          </template>
          <template #on>
            <q-icon style="padding-right: 4px" name="done" />
          </template>
        </vs-switch>
        <q-btn flat round dense icon="account_circle">
          <q-menu>
            <div class="row no-wrap q-pa-md">
              <div class="column items-center">
                <q-avatar size="72px">
                  <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
                </q-avatar>
                <div class="text-weight-bold q-mt-md q-mb-xs">Usuario:</div>
                <div class="text-weight">{{ info.username }}</div>
                <div class="q-mt-md q-mb-xs"></div>
                <div class="row">
                  <div class="col">
                    <q-btn
                      color="primary"
                      label="Cancel"
                      push
                      size="sm"
                      v-close-popup
                    />
                  </div>
                  <div style="margin-left: 6%"></div>
                  <div class="col">
                    <q-btn
                      color="negative"
                      label="Logout"
                      push
                      size="sm"
                      @click="exit"
                    />
                  </div>
                </div>
              </div>
            </div>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>
    <template>
      <vs-sidebar absolute v-model="active" :open.sync="left">
        <template #logo>
          <q-img style="height: 9em; width: 9em" src="../assets/db.png" />
        </template>
        <div @click="left = false">
          <vs-sidebar-item to="/menu" v-ripple id="menu">
            <q-icon style="padding-right: 4px" name="home" />
            Home
          </vs-sidebar-item>
        </div>
        <div v-for="(item, index) in menu" v-bind:key="index">
          <vs-sidebar-group>
            <template #header>
              <vs-sidebar-item arrow v-if="can(item.permission)">
                <q-icon :name="item.icon" />
                {{ item.name }}
              </vs-sidebar-item>
            </template>

            <div
              v-for="(itemChildren, indexChildren) in menu[index].children"
              v-bind:key="indexChildren"
              @click="left = false"
            >
              <vs-sidebar-item
                v-if="can(itemChildren.permission)"
                v-ripple
                :to="itemChildren.url"
                :id="itemChildren.url"
              >
                <q-icon :name="itemChildren.icon" />
                {{ itemChildren.name }}
              </vs-sidebar-item>
            </div>
          </vs-sidebar-group>
        </div>
        <template #footer>
          <div class="text-caption jusify-center">V 0.1</div>
        </template>
      </vs-sidebar>
    </template>
    <q-page-container>
      <div class="q-pa-md">
        <div class="text-bold text-h6" align="center">
          {{ titulo }}
        </div>
      </div>
      <router-view @setTittle="setTittle" />
      <!---<div class="justify-end absolute-bottom">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#7a0000"
            fill-opacity="1"
            d="M0,192L40,208C80,224,160,256,240,272C320,288,400,288,480,288C560,288,640,288,720,272C800,256,880,224,960,229.3C1040,235,1120,277,1200,272C1280,267,1360,213,1400,186.7L1440,160L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
          ></path>
        </svg>
        <div
          style="background: #7a0000; margin-top: -6px"
          class="text-caption text-white text-center"
        >
          © 2021 Js{Code;} Corp
        </div>
      </div>-->
    </q-page-container>
  </q-layout>
</template>
<style>
.my-menu-link {
  color: white;
  background: #012d5b;
}
</style>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  beforeMount() {
    this.verify();
  },
  computed: {
    ...mapGetters("generals", ["can"]),
  },
  data() {
    return {
      titulo: "Inicio",
      left: false,
      dark: false,
      info: {},
      active: "home",
      active_link_menu: "",
      menu: [
        {
          name: "Configuración",
          url: "",
          icon: "settings",
          permission: "configuration",
          children: [
            //* Rutas de Observacion de los Negocios y Roles
            {
              name: "Negocios",
              url: "/control",
              icon: "museum",
              permission: "configuration.bussines",
            },
            {
              name: "Roles",
              url: "/rol",
              icon: "fact_check",
              permission: "configuration.role",
            },
            //* Rutas de los negocios
            {
              name: "Información",
              url: "/",
              icon: "fact_check",
              permission: "bussines.information",
            },
          ],
        },
      ],
    };
  },
  watch: {
    "$q.dark.isActive"(val) {
      console.log(val ? "On dark mode" : "On light mode");
    },
  },
  methods: {
    ...mapActions("generals", ["logout"]),
    exit() {
      this.logout();
      this.$router.push("/");
    },
    setTittle(params) {
      this.titulo = params;
    },
    changeMode() {
      this.$q.loading.show({
        message: "Estamos reconfigurando tu entorno",
      });
      this.$api.put("changeModel", this.info).then((res) => {
        this.$q.loading.hide();
        this.$router.go();
      });
    },
    getBack() {
      this.$api.get("InfoLog").then((res) => {
        this.info = res;
        this.$q.dark.set(this.info.darkMode);
      });
    },
    verify() {
      const temp = localStorage.getItem("sessionInfo");
      if (temp === null) {
        this.$q.notify({
          position: "bottom",
          textColor: "white",
          icon: "error",
          color: "red",
          message: "Intenta iniciar sesion primero",
        });
        this.logout();
        this.$router.push("/");
      } else {
        this.getBack();
      }
    },
    closs() {
      this.titulo = "Inicio";
      this.$router.push("/menu");
    },
  },
};
</script>
<style>
body.body--dark {
  --vs-background: 30, 32, 35;
  --vs-text: 255, 255, 255;
  --vs-gray-1: 24, 25, 28;
  --vs-gray-2: 20, 20, 23;
  --vs-gray-3: 15, 16, 19;
  --vs-gray-4: 10, 11, 14;
  --vs-shadow-opacity: 0.3;
  --vs-dark: 0, 0, 0;
  --vs-background-opacity: 0.6;
}
.vs-card {
  background: #eaeaea;
  color: #000;
}
.q-layout {
  font-family: 'PT Sans', sans-serif;
}
.q-page {
  font-family: 'PT Sans', sans-serif;
}
.q-menu {
  font-family: 'PT Sans', sans-serif;
}
</style>
