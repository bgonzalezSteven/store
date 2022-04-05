<template>
  <div>
    <section>
      <header>
        <section class="row">
          <div class="col q-pa-md text-bold text-h6">Contactos</div>
          <div class="col q-pa-md text-right">
            <vs-button-group>
              <vs-button
                :active="form.type == 'company'"
                @click="form.type = 'company'"
                flat
                icon
              >
                Compañia
              </vs-button>
              <vs-button
                :active="form.type == 'person'"
                @click="form.type = 'person'"
                flat
                icon
              >
                Persona
              </vs-button>
            </vs-button-group>
          </div>
        </section>
        <section class="q-pa-sm row items-center justify-center">
          <div class="center content-inputs">
            <vs-select
              label="Tipo de contacto"
              v-model="typeContact"
              style="min-width: 15em; padding-top: 1em"
              @input="form.contact_type = typeContact"
            >
              <template v-if="!$v.form.contact_type.required" #message-danger>
                Requerido
              </template>
              <vs-option
                v-for="index in typesContact"
                :key="index.label"
                :label="index.label"
                :value="index.value"
              >
                {{ index.label }}
              </vs-option>
            </vs-select>
          </div>
          <div class="center content-inputs" style="padding-right: 10px">
            <vs-input
              
              style="width: 18em; padding-top: 0.5em"
              block
              success
              class="col col q-ma-sm"
              v-model="form.name"
              label-placeholder="Nombre"
            >
              <template v-if="!$v.form.name.required" #message-danger>
                Requerido
              </template></vs-input
            >
          </div>
          <div class="center content-inputs" style="padding-right: 10px">
            <vs-input
              
              style="width: 18em; padding-top: 0.5em"
              block
              success
              class="col col q-ma-sm"
              v-model="form.nfi"
              label-placeholder="NFI"
            >
              <template v-if="!$v.form.nfi.required" #message-danger>
                Requerido
              </template></vs-input
            >
          </div>
        </section>
      </header>
    </section>
    <section block class="row justify-around q-pt-md">
      <section
        style="max-width: 100% !important"
        class="q-pt-md col-md-7 justify-center items-center"
      >
        <section class="q-pa-sm row items-center justify-center">
          <div class="center content-inputs">
            <vs-input
              
              style="width: 19em; padding-top: 1em"
              block
              success
              placeholder="Dirección"
              class="col col q-ma-sm"
              v-model="form.address"
              label="Dirección"
            />
          </div>
          <div class="center content-inputs">
            <vs-input
              
              style="width: 13em; padding-top: 1em"
              block
              success
              placeholder="Ciudad"
              class="col col q-ma-sm"
              v-model="form.city"
              label="Ciudad"
            />
          </div>
          <div class="center content-inputs">
            <vs-input
              
              style="width: 13em; padding-top: 1em"
              block
              success
              class="col col q-ma-sm"
              v-model="form.postal_code"
              label="Código Postal"
              placeholder="Código Postal"
            />
          </div>
          <div class="center content-inputs">
            <vs-input
              
              style="width: 13em; padding-top: 1em"
              block
              success
              class="col col q-ma-sm"
              v-model="form.province"
              label="Provincia"
              placeholder="Provincia"
            />
          </div>
          <div class="center content-inputs">
            <vs-input
              
              style="width: 13em; padding-top: 1em"
              block
              success
              class="col col q-ma-sm"
              v-model="form.country"
              label="País"
              placeholder="País"
            />
          </div>
          <div class="center content-inputs">
            <vs-input
              
              style="width: 13em; padding-top: 1em"
              block
              success
              class="col col q-ma-sm"
              v-model="form.trade_name"
              label="Razón social"
              placeholder="Razón social"
            />
          </div>
          <div v-if="form.type === 'company'" class="center content-inputs">
            <vs-input
              
              style="width: 13em; padding-top: 1em"
              block
              success
              class="col col q-ma-sm"
              v-model="form.vat_number"
              label="NIF"
              placeholder="NIF"
            />
          </div>
        </section>
      </section>

      <section
        :class="{
          'full-width': !$q.screen.md,
        }"
        class="q-pt-md col-md-4 justify-center items-center"
      >
        <section class="q-pa-sm row items-center justify-center">
          <div class="center content-inputs">
            <vs-input
              style="width: 15em; padding-top: 1em"
              block
              success
              placeholder="Email"
              class="col col q-ma-sm"
              v-model="form.email"
              label="Email"
              type="email"
            >
              <template v-if="!$v.form.email.email" #message-danger>
                Email no valido
              </template>
            </vs-input>
          </div>
          <div class="center content-inputs">
            <vs-input
              style="width: 15em; padding-top: 1em"
              block
              success
              placeholder="Teléfono"
              class="col col q-ma-sm"
              v-model="form.phone"
              label="Teléfono"
            />
          </div>
          <div class="center content-inputs">
            <vs-input
              style="width: 15em; padding-top: 1em"
              block
              success
              placeholder="Fax"
              class="col col q-ma-sm"
              v-model="form.mobile"
              label="Móvil"
            />
          </div>
        </section>
      </section>
    </section>
    <section>
      <div>
        <vs-button class="bg-primari" style="width: 97%" @click="save">
          <q-icon name="save" style="margin-right: 0.5em" />
          <span>Guardar</span>
        </vs-button>
      </div>
    </section>
  </div>
</template>
<script>
import { required, email } from "vuelidate/lib/validators";
export default {
  props: ['id'],
  validations: {
    form: {
      name: { required },
      nfi: { required },
      email: { email },
      contact_type: { required },
    },
  },
  data() {
    return {
      typeContact: "",
      form: {
        type: "person",
      },
      typesContact: [
        {
          label: "No especificado",
          value: "unspecified",
        },
        {
          label: "Cliente",
          value: "customer",
        },
        {
          label: "Proveedor",
          value: "supplier",
        },
        {
          label: "Deudor",
          value: "debtor",
        },
        {
          label: "Acreedor",
          value: "creditor",
        },
      ],
      active: 0,
    };
  },
  mounted() {
    this.verificate(this.id)
  },
  methods: {
    verificate (id) {
      if (id) {
        this.$api.get(`customer/${id}`).then(res => {
          this.form = res
          this.typeContact = this.form.contact_type
        })
      }
    },
    async save() {
      this.$v.form.$touch();
      if (this.$v.form.$error) {
        this.$vs.notification({
          icon: `<box-icon name='bug-alt' animation='tada' flip='vertical' ></box-icon>`,
          title: "Error",
          text: "Faltan datos",
          color: "danger",
          position: "top-center",
          time: 4000,
        });
      } else {
        this.$q.loading.show();
        this.$api.post("customer", this.form).then((res) => {
          this.$q.loading.hide();
          this.$router.go()
        });
      }
    },
  },
};
</script>