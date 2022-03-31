<template>
  <q-layout view="lHh LpR lFf" class="bg-grey-2">
    <div class="header-backup">
      <q-header
        style="
          height: 75px;
          margin-top: 16px;
          transform: translateY(0px);
          left: 16px;
          right: 16px;
          border-radius: 1em;
        "
        class="text-black"
      >
        <q-toolbar style="height: 75px" class="bg-white text-black">
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
          <!---//*Boton de cambio de modo*/
          <vs-switch v-model="info.darkMode" @click="changeMode()">
            <template #off>
              <q-icon style="padding-right: 4px" name="close" />
            </template>
            <template #on>
              <q-icon style="padding-right: 4px" name="done" />
            </template>
          </vs-switch>-->
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
                      <vs-button
                        flat
                        size="sm"
                        v-close-popup
                      >Cerrar
                      </vs-button>
                    </div>
                    <div style="margin-left: 6%"></div>
                    <div class="col">
                      <vs-button
                        danger
                        size="sm"
                        @click="exit"
                      >
                      Salir</vs-button>
                    </div>
                  </div>
                </div>
              </div>
            </q-menu>
          </q-btn>
        </q-toolbar>
      </q-header>
    </div>
    <template>
      <vs-sidebar absolute v-model="active" :open.sync="left">
        <template #logo>
          <div class="justify-center items-center">
            <p class="row text-h6 text-center text-bold">
              <span class="text-red">Síndria</span>
              <span class="text-green">Mercat</span>
            </p>
            <q-img
              class="row"
              style="height: 9em; width: 9em"
              src="~assets/sandia.png"
            />
          </div>
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
      <div class="q-pa-lg">
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
  background: red;
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
              url: "/information",
              icon: "fact_check",
              permission: "bussines.information",
            },
            {
              name: "Contactos",
              url: "/",
              icon: "fact_check",
              permission: "bussines.customer",
            },
          ],
        },        
        {
          name: "Inventarios",
          url: "",
          icon: "storefront",
          permission: "bussines.inventories",
          children: [
            {
              name: "Productos",
              url: "/product",
              icon: "archive",
              permission: "bussines.inventories",
            },
          ]
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
  font-family: "PT Sans", sans-serif;
}
.q-page {
  font-family: "PT Sans", sans-serif;
}
.q-menu {
  font-family: "PT Sans", sans-serif;
  border-radius: 2em;
}
.header-backup {
  display: block;
  width: 100%;
  height: 102px;
  position: fixed;
  top: 0;
  z-index: 5;
  background: linear-gradient(
    180deg,
    hsla(0, 0%, 97.3%, 0.95) 44%,
    hsla(0, 0%, 97.3%, 0.46) 73%,
    hsla(0, 0%, 100%, 0)
  ) !important;
  left: 0;
}
.q-toolbar {
  align-items: center;
  display: flex;
  position: relative;
  z-index: 0;
  padding: 4px 16px;
  border-radius: 1em;
}
.q-layout__section--marginal,
.vs-table,
.vs-table__header,
.vs-table__footer,
.vs-table__tr,
.vs-table__thead,
.vs-table__tr,
.vs-table__th {
  background-color: #fff;
}
.vs-table__thead .vs-table__th {
  background: #fff;
}
</style>
