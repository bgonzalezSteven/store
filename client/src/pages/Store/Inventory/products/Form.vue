<template>
  <q-page class="q-pa-sm" style="min-height: 420px">
    <div>
      <section block class="row justify-around q-pt-md">
        <!--Div principal donde esta la información-->
        <section
          style="max-width: 100% !important"
          class="q-pt-md col-md-8 justify-center items-center"
        >
          <!--Informacion del producto-->
          <q-card class="q-mt-lg" flat color="white">
            <p class="q-pa-md text-h6 text-bold">Información del producto</p>
            <q-card-section>
              <q-card-section>
                <section class="q-pa-sm row items-center justify-center">
                  <div
                    class="center content-inputs"
                    style="padding-right: 10px"
                  >
                    <vs-input
                      autofocus
                      style="width: 13em; padding-top: 1em"
                      block
                      success
                      class="col col q-ma-sm"
                      placeholder="CaffeTour"
                      v-model="form.name"
                      label="Nombre"
                    >
                      <template v-if="!$v.form.name.required" #message-danger>
                        Requerido
                      </template>
                    </vs-input>
                  </div>
                  <div
                    class="center content-inputs"
                    style="padding-right: 10px"
                  >
                    <vs-input
                      autofocus
                      style="width: 23em; padding-top: 1em"
                      block
                      success
                      class="col col q-ma-sm"
                      placeholder="CaffeTour"
                      v-model="form.description"
                      label="Descripción"
                    >
                      <template
                        v-if="!$v.form.description.required"
                        #message-danger
                      >
                        Requerido
                      </template>
                    </vs-input>
                  </div>
                </section>
              </q-card-section>
            </q-card-section>
          </q-card>
          <q-card class="q-mt-lg" flat color="white">
            <p class="q-pa-md text-h6 text-bold">Precio</p>
            <q-card-section>
              <q-card-section>
                <section class="q-pa-sm row items-center justify-center">
                  <div
                    class="center content-inputs"
                    style="padding-right: 10px"
                  >
                    <vs-input
                      autofocus
                      style="width: 13em; padding-top: 1em"
                      block
                      success
                      class="col col q-ma-sm"
                      placeholder="1230"
                      v-model.lazy="form.price"
                      label="Precio"
                      v-money="money"
                    >
                      <template v-if="!$v.form.price.required" #message-danger>
                        Requerido
                      </template>
                    </vs-input>
                  </div>
                  <div
                    class="center content-inputs"
                    style="padding-right: 10px"
                  >
                    <vs-input
                      autofocus
                      style="width: 8em; padding-top: 1em"
                      block
                      success
                      class="col col q-ma-sm"
                      placeholder="1.12"
                      v-model="form.iva"
                      label="Iva"
                    >
                      <template v-if="!$v.form.iva.required" #message-danger>
                        Requerido
                      </template>
                    </vs-input>
                  </div>
                  <div
                    class="center content-inputs"
                    style="padding-right: 10px"
                  >
                  <p class="text-caption text-bold">Total:</p>
                  <p class="text-bold text-caption">{{total}}</p>
                  </div>
                </section>
              </q-card-section>
            </q-card-section>
          </q-card>
        </section>

        <section
          :class="{
            'full-width': !$q.screen.md,
          }"
          class="q-pt-md col-md-3"
        >qq
        </section>
      </section>
    </div>
  </q-page>
</template>
<script>
import currency from "currency.js";
import { VMoney } from "v-money";
import { required } from "vuelidate/lib/validators";
export default {
  validations: {
    form: {
      name: { required },
      description: { required },
      price: { required },
      iva: { required },
      total: { required },
    },
  },
  computed: {
    total() {
      return this.addProduct();
    },
  },
  mounted() {
    this.$emit("setTittle", "Producto");
    this.information();
  },
  directives: { money: VMoney },
  data() {
    return {
      form: {},
      categories: [],
      money: {
        decimal: ".",
        thousands: ",",
        prefix: "",
        precision: 2,
        masked: true /* doesn't work with directive */,
      },
    };
  },
  methods: {
    formatPrice (value) {
      const total = (parseFloat((value/100).toFixed(3)))
      const price = total+currency(this.form.price).value
      const val = (price / 1).toFixed(3).replace('.', ',')
      return val.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    addProduct() {
      const value = currency(this.form.price)
      this.form.total = (value.multiply((this.form.iva)));
      return (this.formatPrice(this.form.total));
    },
    async save() {
      this.$v.form.$touch();
      if (this.$v.form.$error) {
        this.$vs.notification({
          color: "danger",
          position: "center",
          title: "¡Ojo!",
          text: "Por favor, ingresa los datos necesarios",
        });
        return;
      } else {
        console.log(this.form);
      }
    },
    async information() {
      this.$q.loading.show();
      this.$api.get("information").then((res) => {
        if (res) {
          this.$q.loading.hide();
          this.money.prefix = `${res.currency === "usd" ? "$ " : "€ "} `;
          this.form.iva = parseFloat(res.percentage);
        }
      });
    },
  },
};
</script>

