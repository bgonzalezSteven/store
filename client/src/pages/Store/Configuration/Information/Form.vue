<template>
  <q-page class="q-pa-sm" style="min-height: 420px">
    <div
      class="row items-center justify-center text-center"
      style="margin-top: -2em"
    >
      Datos de informatión necesarios para el correcto funcionamiento
    </div>
    <div>
      <section block class="row justify-around q-pt-md">
        <!--Div principal donde esta la información-->
        <section
          style="max-width: 100% !important"
          class="q-pt-md col-md-8 justify-center items-center"
        >
          <q-card flat color="white">
            <p class="q-pa-md text-h6 text-bold">General</p>
            <q-card-section>
              <q-card-section>
                <section class="q-pa-sm row items-center justify-center">
                  <div
                    class="center content-inputs"
                    style="padding-right: 10px"
                  >
                    <vs-input
                      style="width: 23em; padding-top: 1em"
                      block
                      success
                      class="col col q-ma-sm"
                      placeholder="CaffeTour"
                      v-model="form.name"
                      label="Nombre de Compañia"
                    >
                      <template v-if="!$v.form.name.required" #message-danger>
                        Requerido
                      </template></vs-input
                    >
                  </div>
                  <div
                    class="center content-inputs"
                    style="padding-right: 10px"
                  >
                    <vs-select
                      label="Estructura legal"
                      v-model="legalStructure"
                      style="min-width: 23em; padding-top: 1em"
                      @input="verification"
                    >
                      <template
                        v-if="!$v.form.legalStructure.required"
                        #message-danger
                      >
                        Requerido
                      </template>
                      <vs-option
                        v-for="index in structure"
                        :key="index.label"
                        :label="index.label"
                        :value="index.value"
                      >
                        {{ index.label }}
                      </vs-option>
                    </vs-select>
                  </div>
                  <div
                    class="center content-inputs"
                    style="padding-right: 10px"
                  >
                    <vs-input
                      label="Número de identificación"
                      v-model="form.nif"
                      block
                      success
                      class="col col q-ma-sm"
                      style="width: 23em; padding-top: 1em"
                    >
                      <template v-if="!$v.form.nif.required" #message-danger>
                        Requerido
                      </template>
                    </vs-input>
                  </div>
                  <div
                    class="center content-inputs"
                    style="padding-right: 10px"
                  >
                    <vs-input
                      label="Número VAT "
                      v-model="form.vatNumber"
                      block
                      success
                      class="col col q-ma-sm"
                      style="width: 23em; padding-top: 1em"
                    >
                    </vs-input>
                  </div>
                  <div
                    class="center content-inputs"
                    style="padding-right: 10px"
                  >
                    <vs-input
                      style="width: 23em; padding-top: 1em"
                      block
                      success
                      class="col col q-ma-sm"
                      placeholder="J-12345678"
                      v-model="form.phone"
                      label="Teléfono"
                    >
                      <template v-if="!$v.form.phone.required" #message-danger>
                        Requerido
                      </template></vs-input
                    >
                  </div>
                  <div
                    class="center content-inputs"
                    style="padding-right: 10px"
                  >
                    <p
                      style="margin-bottom: 0px"
                      class="text-center text-caption text-bold"
                    >
                      Numero de empleados
                    </p>
                    <div class="row items-center justify-center">
                      <vs-button
                        :active="active == index.id"
                        v-for="index in btns"
                        :key="index.label"
                        border
                        @click="
                          (form.empleyersNumber = index.value),
                            (active = index.id)
                        "
                      >
                        {{ index.label }}
                      </vs-button>
                    </div>
                  </div>
                </section>
              </q-card-section>
            </q-card-section>
          </q-card>
          <q-card class="q-mt-lg" flat color="white">
            <p class="q-pa-md text-h6 text-bold">Dirección</p>
            <q-card-section>
              <q-card-section>
                <section class="q-pa-sm row items-center justify-center">
                  <div
                    class="center content-inputs"
                    style="padding-right: 10px"
                  >
                    <vs-input
                      style="width: 23em; padding-top: 1em"
                      block
                      success
                      class="col col q-ma-sm"
                      placeholder="J-12345678"
                      v-model="form.country"
                      label="Dirección"
                    >
                      <template
                        v-if="!$v.form.country.required"
                        #message-danger
                      >
                        Requerido
                      </template></vs-input
                    >
                  </div>
                  <div
                    class="center content-inputs"
                    style="padding-right: 10px"
                  >
                    <vs-input
                      style="width: 10em; padding-top: 1em"
                      block
                      success
                      class="col col q-ma-sm"
                      placeholder="Madrid"
                      v-model="form.city"
                      label="Ciudad"
                    >
                      <template v-if="!$v.form.city.required" #message-danger>
                        Requerido
                      </template></vs-input
                    >
                  </div>
                  <div
                    class="center content-inputs"
                    style="padding-right: 10px"
                  >
                    <vs-input
                      style="width: 10em; padding-top: 1em"
                      block
                      success
                      class="col col q-ma-sm"
                      v-model="form.postalCode"
                      label="Codigo Postal"
                    >
                      <template
                        v-if="!$v.form.postalCode.required"
                        #message-danger
                      >
                        Requerido
                      </template></vs-input
                    >
                  </div>
                  <div
                    class="center content-inputs"
                    style="padding-right: 10px"
                  >
                    <vs-input
                      style="width: 10em; padding-top: 1em"
                      block
                      success
                      class="col col q-ma-sm"
                      v-model="form.pais"
                      label="País"
                    >
                      <template v-if="!$v.form.pais.required" #message-danger>
                        Requerido
                      </template></vs-input
                    >
                  </div>
                  <div
                    class="center content-inputs"
                    style="padding-right: 10px"
                  >
                    <vs-input
                      style="width: 10em; padding-top: 1em"
                      block
                      success
                      class="col col q-ma-sm"
                      v-model="form.region"
                      label="Región"
                    >
                      <template v-if="!$v.form.region.required" #message-danger>
                        Requerido
                      </template></vs-input
                    >
                  </div>
                </section>
              </q-card-section>
            </q-card-section>
          </q-card>
          <q-card class="q-mt-lg" flat color="white">
            <p class="q-pa-md text-h6 text-bold">Preferencias</p>
            <q-card-section>
              <q-card-section>
                <section class="q-pa-sm row items-center justify-center">
                  <div
                    class="center content-inputs"
                    style="padding-right: 10px"
                  >
                    <vs-select
                      label="Moneda"
                      v-model="currency"
                      style="min-width: 10em; padding-top: 1em"
                      @input="form.currency = currency"
                    >
                      <template
                        v-if="!$v.form.currency.required"
                        #message-danger
                      >
                        Requerido
                      </template>
                      <vs-option
                        v-for="index in currencyList"
                        :key="index.label"
                        :label="index.label"
                        :value="index.value"
                      >
                        {{ index.label }}
                      </vs-option>
                    </vs-select>
                  </div>
                  <div
                    class="center content-inputs"
                    style="padding-right: 10px"
                  >
                    <vs-input
                      style="width: 10em; padding-top: 1em"
                      block
                      success
                      class="col col q-ma-sm"
                      placeholder="20"
                      v-model="form.percentage"
                      label="Porcentaje de ganancia"
                      type="number"
                    >
                      <template
                        v-if="!$v.form.percentage.required"
                        #message-danger
                      >
                        Requerido
                      </template></vs-input
                    >
                  </div>
                </section>
              </q-card-section>
            </q-card-section>
            <q-card-section>
              <q-card-section> </q-card-section>
            </q-card-section>
          </q-card>
        </section>
        <!--Div secondario donde esta la foto-->
        <section
          :class="{
            'full-width': !$q.screen.md,
          }"
          class="q-pt-md col-md-3"
        >
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
                        style="
                          height: 200px;
                          max-width: 190px;
                          border-radius: 50%;
                        "
                      >
                      </q-img>
                    </q-avatar>

                    <div
                      class="col"
                      style="padding-bottom: 3%; padding-top: 2em"
                    >
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
          </q-card>
        </section>
      </section>
      <div class="q-pt-md" style="padding-bottom: 1em">
        <section class="row items-center justify-center text-center">
          <vs-button class="bg-primary" block @click="save">Guardar</vs-button>
        </section>
      </div>
    </div>
  </q-page>
</template>

<script>
import env from "../../../../env";
const axios = require("axios");
import { required } from "vuelidate/lib/validators";
export default {
  validations: {
    form: {
      name: { required },
      nif: { required },
      country: { required },
      phone: { required },
      legalStructure: { required },
      city: { required },
      postalCode: { required },
      pais: { required },
      region: { required },
      currency: { required },
      percentage: { required },
    },
  },
  mounted() {
    this.baseu = env.apiUrl;
    this.$emit("setTittle", "Información");
    this.geoLocation();
    this.information();
  },
  data() {
    return {
      legalStructure: "",
      form: {},
      img: "https://placeimg.com/500/300/nature",
      file: null,
      edit: false,
      geo: "",
      baseu: "",
      active: 0,
      currency: "",
      currencyList: [
        {
          label: "U.S Dolar (usd)",
          value: "usd",
        },
        {
          label: "Euro (eur)",
          value: "eur",
        },
      ],
      structure: [
        {
          label: "Sociedad Limitada",
          value: "limitedSociety",
        },
        {
          label: "Sociedad Anonima",
          value: "anonimateSociety",
        },
        {
          label: "Entidades sin ánimo de lucro",
          value: "nonprofit",
        },
        {
          label: "Comunidad de Bienes",
          value: "communityOfGoods",
        },
        {
          label: "Asociación",
          value: "association",
        },
        {
          label: "Sociedad CIvil Personal",
          value: "civilSociety",
        },
        {
          label: "Otro",
          value: "other",
        },
      ],
      btns: [
        {
          label: "1",
          value: "1",
          id: 1,
        },
        {
          label: "2 - 5",
          value: "2 - 5",
          id: 2,
        },
        {
          label: "6 - 10",
          value: "6 - 10",
          id: 3,
        },
        {
          label: "11 - 25",
          value: "11 - 25",
          id: 4,
        },
        {
          label: "+50",
          value: "+50",
          id: 5,
        },
      ],
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
        if (res) {
          this.legalStructure = this.form.legalStructure;
          this.currency = this.form.currency;
          this.active = this.btns.find(
            (x) => x.value == this.form.empleyersNumber
          ).id;
          if (this.form.file) {
            this.img = `${this.baseu}${this.form.file}`;
          }
        }
        this.form = res;
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
          console.log(res.data);
          this.form.city = res.data.city;
          this.form.postalCode = res.data.zip;
          this.form.pais = res.data.country_name;
          this.form.region = res.data.region_name;
        });
      /* navigator.geolocation.getCurrentPosition(
        (position) => {
          axios
            .get(
              `https://fcc-weather-api.glitch.me/api/current?lat=${position.coords.latitude}&lon=${position.coords.longitude}`
            )
            .then((res) => {
              this.form.direction = `${res.data.name}, ${this.geo}`;
              console.log(res.data);
            });
        },
        (error) => {
          this.$q.notify({
            type: "negative",
            message: `${error.message}`,
          });
        }
      );*/
    },
    async save() {
      this.$v.form.$touch();
      if (this.$v.form.$error) {
        this.$vs.notification({
          icon: `<box-icon name='bug-alt' animation='tada' flip='vertical' ></box-icon>`,
          color: "danger",
          position: "center",
          title: "¡Ojo!",
          text: "Por favor, ingresa los datos necesarios",
        });
        return;
      } else {
        this.$q.loading.show();
        const formData = new FormData();
        formData.append("file", this.file);
        formData.append("dates", JSON.stringify(this.form));
        console.log(formData);
        this.$api.post("information", formData).then((res) => {
          this.$q.loading.hide();
          this.$router.go(-1);
        });
      }
    },
    verification() {
      this.form.legalStructure = this.legalStructure;
      console.log(this.form);
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