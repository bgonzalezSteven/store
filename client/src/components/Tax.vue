<template>
  <div>
    <section>
      <header>
        <section class="row">
          <div class="col q-pa-md text-bold text-h6">Impuestos</div>
        </section>
        <section class="q-pa-sm row items-center justify-center">
          <div class="center content-inputs" style="padding-right: 10px">
            <vs-input
              
              style="width: 10em; padding-top: 0.5em"
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
              v-model="form.description"
              label-placeholder="Descripción"
            >
              <template v-if="!$v.form.name.required" #message-danger>
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
              v-model.number="form.price"
              label-placeholder="Monto"
              type="number"
            >
              <template #message-danger>
                <template  v-if="!$v.form.price.required">
                  Requerido
                </template>
                <template v-else-if="!$v.form.price.numeric">
                  Dato numerico
              </template>
              </template>
            </vs-input
            >
          </div>
        </section>
      </header>
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
import { required, numeric } from "vuelidate/lib/validators";
export default {
  validations: {
    form: {
      name: {
        required,
      },
      description: {
        required,
      },
      price: {
        required, numeric
      },
    },
  },
  props: ["id"],
  data() {
    return {
      form: {},
    };
  },
  mounted() {
    this.verificate(this.id);
  },
  methods: {
    verificate(id) {
      if (id) {
        this.$api.get(`tax/${id}`).then((res) => {
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
        this.$q.loading.show();
        this.$api.post("tax", this.form).then((res) => {
          this.$q.loading.hide();
          this.$router.go();
        });
      }
    },
  },
};
</script>