<template>
  <div>
    <section>
      <header>
        <section class="row">
          <div class="col q-pa-md text-bold text-h6">Empleado</div>
        </section>
        <section class="q-pa-sm row items-center justify-center">
          <div class="center content-inputs" style="padding-right: 10px">
            <vs-input
              style="width: 15em; padding-top: 0.5em"
              block
              success
              class="col col q-ma-sm"
              v-model="form.name"
              label-placeholder="Nombres"
            >
              <template v-if="!$v.form.name.required" #message-danger>
                Requerido
              </template></vs-input
            >
          </div>
          <div class="center content-inputs" style="padding-right: 10px">
            <vs-input
              style="width: 15em; padding-top: 0.5em"
              block
              success
              class="col col q-ma-sm"
              v-model="form.lastname"
              label-placeholder="Apellidos"
            >
              <template v-if="!$v.form.lastname.required" #message-danger>
                Requerido
              </template></vs-input
            >
          </div>
          <div class="center content-inputs" style="padding-right: 10px">
            <vs-input
              style="width: 10em; padding-top: 0.5em"
              block
              success
              class="col col q-ma-sm"
              v-model="form.nif"
              label-placeholder="NIF"
            >
              <template v-if="!$v.form.nif.required" #message-danger>
                Requerido
              </template></vs-input
            >
          </div>
          <div class="center content-inputs" style="padding-right: 10px">
            <vs-input
              style="width: 10em; padding-top: 0.5em"
              block
              success
              class="col col q-ma-sm"
              v-model="form.phone"
              label-placeholder="Teléfono"
            >
              <template v-if="!$v.form.phone.required" #message-danger>
                Requerido
              </template></vs-input
            >
          </div>
          <div class="center content-inputs" style="padding-right: 10px">
            <vs-input
              style="width: 15em; padding-top: 0.5em"
              block
              success
              class="col col q-ma-sm"
              v-model="form.email"
              label-placeholder="Correo"
            >
              <template #message-danger>
                <template v-if="!$v.form.email.required"> Requerido </template>
                <template v-else-if="!$v.form.email.email">
                  Correo inválido
                </template>
              </template></vs-input
            >
          </div>
          <div class="center content-inputs" style="padding-right: 10px">
            <vs-input
              style="width: 10em; padding-top: 0.5em"
              block
              success
              class="col col q-ma-sm"
              v-model="form.workstation"
              label-placeholder="Puesto"
            >
              <template v-if="!$v.form.workstation.required" #message-danger>
                Requerido
              </template></vs-input
            >
          </div>
        </section>
      </header>
    </section>
    <section class="q-pa-sm row items-center justify-center">
      <div class="center content-inputs" style="padding-right: 10px">
        <vs-switch v-model="paymethodList">
          <template #off> Ganancia por ventas </template>
          <template #on> Ganancia neta </template>
        </vs-switch>
      </div>

      <div class="center content-inputs" style="padding-right: 10px">
        <vs-switch v-model="form.activate">
          <template #off> Sin usuario </template>
          <template #on> Con usuario </template>
        </vs-switch>
      </div>
    </section>
    <section v-if="!paymethodList">
      <section class="row">
        <div class="col q-pa-md text-bold text-h6">Ganancia por ventas</div>
      </section>
      <section class="q-pa-sm row items-center justify-center">
        <div class="center content-inputs" style="padding-right: 10px">
          <vs-input
            style="width: 10em; padding-top: 0.5em"
            block
            success
            class="col col q-ma-sm"
            v-model.number="paymetho.percentage"
            label-placeholder="Porcentaje"
            type="number"
          >
          </vs-input>
        </div>
      </section>
    </section>
    <section v-else>
      <section class="row">
        <div class="col q-pa-md text-bold text-h6">Ganancia neta</div>
      </section>
      <section class="q-pa-sm row items-center justify-center">
        <div class="center content-inputs" style="padding-right: 10px">
          <vs-input
            style="width: 10em; padding-top: 0.5em"
            block
            success
            class="col col q-ma-sm"
            v-model.lazy="paymetho.neto"
            label-placeholder="Sueldo Base"
            v-money="money"
          >
            <template v-if="!$v.paymetho.neto.required" #message-danger>
              Requerido
            </template>
          </vs-input>
        </div>
        <div class="center content-inputs" style="padding-right: 10px">
          <vs-input
            style="width: 12em; padding-top: 0.5em"
            block
            success
            class="col col q-ma-sm"
            v-model="paymetho.entryDate"
            label-placeholder="Fecha de entrada"
            type="date"
          >
            <template v-if="!$v.paymetho.entryDate.required" #message-danger>
              Requerido
            </template>
          </vs-input>
        </div>
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
  validations: {
    form: {
      name: { required },
      lastname: { required },
      nif: { required },
      phone: { required },
      email: { required, email },
      workstation: { required },
    },
    paymetho: {
      neto: { required },
      entryDate: { required },
    },
  },
  props: ["id"],
  data() {
    return {
      money: {
        decimal: ".",
        thousands: ",",
        prefix: "",
        precision: 2,
        masked: true /* doesn't work with directive */,
      },
      form: {
        activate: false,
      },
      paymethodList: false,
      paymetho: {},
    };
  },
  mounted() {
    this.verificate(this.id);
    this.information();
  },
  methods: {
    async information() {
      this.$q.loading.show();
      await this.$api.get("information").then((res) => {
        if (res) {
          this.$q.loading.hide();
          this.money.prefix = `${res.currency === "usd" ? "$ " : "€ "} `;
        }
      });
    },
    verificate(id) {
      if (id) {
        this.$api.get(`paymentMethod/${id}`).then((res) => {
          this.form = res;
          this.typeContact = this.form.contact_type;
        });
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
        if (this.paymethodList) {
          this.$v.paymetho.$touch();
          if (this.$v.paymetho.$error) {
            this.$vs.notification({
              icon: `<box-icon name='bug-alt' animation='tada' flip='vertical' ></box-icon>`,
              title: "Error",
              text: "Faltan datos",
              color: "danger",
              position: "top-center",
              time: 4000,
            });
          } else {
            delete this.form.percentage;
            this.form.neto = this.paymetho.neto;
            this.form.entryDate = this.paymetho.entryDate;
            this.saveChanges();
          }
        } else {
          if (this.paymetho.percentage) {
            delete this.form.neto;
            delete this.form.entryDate;
            this.form.percentage = this.paymetho.percentage;
            this.saveChanges();
          } else {
            this.$vs.notification({
              icon: `<box-icon name='bug-alt' animation='tada' flip='vertical' ></box-icon>`,
              title: "Error",
              text: "Faltan datos",
              color: "danger",
              position: "top-center",
              time: 4000,
            });
          }
        }
      }
    },
    async saveChanges() {
      this.$q.loading.show();
      this.$api.post(`employee`, this.form).then((res) => {
        this.$q.loading.hide();
        if (res) {
          console.log(res);
          this.$router.go();
        }
        if (res === undefined) {
          this.$vs.notification({
            icon: `<box-icon name='bug-alt' animation='tada' flip='vertical' ></box-icon>`,
            title: "Error",
            text: "Alcanzo su limite de empleados",
            color: "danger",
            position: "top-center",
          });
          setTimeout(() => {
            this.$router.go();
          }, 3000);
        }
      });
    },
  },
};
</script>