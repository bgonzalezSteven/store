<template>
  <q-page class="q-pa-sm" style="min-height: 420px">
    <div
      class="row items-center justify-center text-center"
      style="margin-top: -2em"
    >
      Datos de informatión necesarios para el correcto funcionamiento
    </div>
    <div class="q-pa-lg col-xs-6 col-sm-6 col-md-4 col-lg-3 col-xl-2">
      <q-card flat color="white">
        <q-card-section>
          <q-card-section>
            <div class="text-bold text-caption text-left">Foto / Logo</div>
          </q-card-section>
          <q-card-section>
            <div class="row items-center justify-center">
              <div class="column items-center justify-center">
                <q-avatar size="200px">
                  <q-badge color="white" floating style="margin-top: 2em">
                    <vs-button
                      rounded
                      danger
                      @click="img_default"
                      v-if="file || edit"
                    >
                      <q-icon name="delete" />
                      <q-tooltip> Eliminar </q-tooltip>
                    </vs-button>
                  </q-badge>
                  <q-img
                    :src="img ? img : 'https://placeimg.com/500/300/nature'"
                    spinner-color="black"
                    style="height: 200px; max-width: 190px; border-radius: 50%"
                  >
                  </q-img>
                </q-avatar>

                <div class="col" style="padding-bottom: 3%; padding-top: 2em">
                  <label class="boton_personalizado">
                    Cargar Imagen
                    <q-file
                      v-model="file"
                      @input="upload"
                      @clear="img_default"
                      borderless
                      style="display: none"
                      accept=".jpg, image/*"
                      @rejected="onRejected"
                    />
                  </label>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card-section>
        <q-card-section>
          <div class="text-bold text-caption text-left">
            Información de {{ form.username }}
          </div>
        </q-card-section>
        <q-card-section>
          <section class="q-pa-sm row items-center justify-center">
            <div class="center content-inputs" style="padding-right: 10px">
              <vs-input
                style="width: 23em; padding-top: 1em"
                block
                success
                class="col col q-ma-sm"
                placeholder="Evan Sthephen"
                v-model="form.name"
                label="Nombres"
              >
                <template v-if="!$v.form.name.required" #message-danger>
                  Requerido
                </template></vs-input
              >
            </div>
            <div class="center content-inputs" style="padding-right: 10px">
              <vs-input
                style="width: 15em; padding-top: 1em"
                block
                success
                class="col col q-ma-sm"
                placeholder="J-12345678"
                v-model="form.nif"
                label="NIF"
              >
                <template v-if="!$v.form.nif.required" #message-danger>
                  Requerido
                </template></vs-input
              >
            </div>
            <div class="center content-inputs" style="padding-right: 10px">
              <vs-input
                style="width: 15em; padding-top: 1em"
                block
                success
                class="col col q-ma-sm"
                placeholder="651 123 456"
                v-model="form.phone"
                label="Telefono"
              >
                <template v-if="!$v.form.phone.required" #message-danger>
                  Requerido
                </template></vs-input
              >
            </div>
            <div class="center content-inputs" style="padding-right: 10px">
              <vs-input
                style="width: 23em; padding-top: 1em"
                block
                success
                class="col col q-ma-sm"
                placeholder="J-12345678"
                v-model="form.direction"
                label="Dirección"
              >
                <template v-if="!$v.form.direction.required" #message-danger>
                  Requerido
                </template></vs-input
              >
            </div>
          </section>
          <section class="row items-center justify-center text-center">            
            <vs-button class="bg-primary" block @click="save">Guardar</vs-button>
          </section>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import env from '../../../env'
const axios = require("axios");
import { required } from "vuelidate/lib/validators";
export default {
  validations: {
    form: {
      name: { required },
      nif: { required },
      direction: { required },
      phone: { required }
    },
  },
  mounted() {
    this.baseu = env.apiUrl
    this.$emit("setTittle", "Información");
    this.information();
    this.geoLocation();
  },
  data() {
    return {
      form: {},
      img: "https://placeimg.com/500/300/nature",
      file: "",
      edit: false,
      geo: '',
      baseu: '',
    };
  },
  methods: {
    async onRejected(rejectedEntries) {
      this.$q.notify({
        type: "negative",
        message: `Por favor solo se permite la imagen con extensión tipo .jgp`,
      });
    },
    async information() {
      this.$q.loading.show();
      this.$api.get("information").then((res) => {
        this.form = res;
        this.img = `${this.baseu}${this.form.file}`
        console.log(this.img)
        this.$q.loading.hide();
      });
    },
    img_default() {
      this.img = "https://placeimg.com/500/300/nature";
      this.file = "";
    },
    async upload() {
      if (this.file) {
        this.img = URL.createObjectURL(this.file);
      }
    },
    async geoLocation() {
      await axios
        .get(
          "http://api.ipapi.com/90.166.153.207?access_key=785da90d73df70ff3bcd3e3da577867a"
        )
        .then((res) => {
         this.geo = `${res.data.region_name}`
        });        
      navigator.geolocation.getCurrentPosition(
        (position) => {
          axios
            .get(
              `https://fcc-weather-api.glitch.me/api/current?lat=${position.coords.latitude}&lon=${position.coords.longitude}`
            )
            .then((res) => {
              this.form.direction = `${res.data.name}, ${this.geo}`;
            });
        },
        (error) => {
          this.$q.notify({
            type: "negative",
            message: `${error.message}`,
          });
        }
      );
    },
    async save() {
      this.$v.form.$touch();
      if (this.$v.form.$error) {
        this.$vs.notification({
          color: 'danger',
          position: 'center',
          title: '¡Ojo!',
          text: 'Por favor, ingresa los datos necesarios'
        })
        return;
      } else {
        this.$q.loading.show()
        const formData = new FormData()
        formData.append('file', this.file)
        formData.append('dates', JSON.stringify(this.form))
        console.log(formData)
        this.$api.post('information', formData).then(res => {
          this.$q.loading.hide()
          this.$router.go(-1)
        })
      }
    },
  },
};
</script>

<style>
.boton_personalizado {
  text-decoration: none;
  padding: 10px;
  font-weight: 540;
  font-size: 15px;
  color: #0016b0;
  background-color: #ffffff;
  border-radius: 6px;
  border: 2px solid #1883ba;

  cursor: pointer;
}
.boton_personalizado:hover {
  color: #ffffff;
  background-color: #0016b0;
}

.size {
  width: 100%;
  max-width: 250px;
  min-width: 200px;
}
</style>