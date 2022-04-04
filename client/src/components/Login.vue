<template>
  <q-form class="q-pt-xl q-gutter-md">
    <q-input
      type="email"
      dense
      rounded
      outlined
      label="Correo"
      v-model="form.email"
    >
    </q-input>
    <q-input
      dense
      rounded
      outlined
      label="Contraseña"
      type="password"
      v-model="form.password"
    >
    </q-input>
    <div>
      <vs-button
        :loading="loading"
        :disabled="loading"
        class="bg-primary"
        size="md"
        outlined
        block
        @click="save"
      >
        Acceder
      </vs-button>
      <div class="col text-center q-mt-sm">
        <div class="row text-center justify-center items-center">
          <div class="text-center q-mt-sm q-gutter-lg">
            <router-link style="text-decoration: none" to="/register"
              >¿No tienes cuenta?</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </q-form>
</template>
<script>
import { mapMutations, mapActions } from "vuex";
import { required, email } from "vuelidate/lib/validators";
export default {
  validations: {
    form: {
      email: { required, email },
      password: { required },
    },
  },
  data() {
    return {
      form: {},
      loading: false,
    };
  },
  mounted() {
    this.logout();
    this.$q.dark.set(false);
  },
  methods: {
    ...mapActions("generals", ["logout"]),
    ...mapMutations("generals", ["login"]),
    async save() {
      this.$v.form.$touch();
      if (this.$v.form.$error) {
        this.$vs.notification({
          icon: `<box-icon name='bug-alt' animation='tada' flip='vertical' ></box-icon>`,
          progress: "none",
          color: "danger",
          position: "top-center",
          title: "Error",
          text: `Por favor, verifica los campos y completa los datos`,
        });
      } else {
        this.loading = true;
        this.$q.loading.show();
        this.$api.post("login", this.form).then((res) => {
          this.$q.loading.hide();
          this.loading = false;
          if (res) {
            this.login(res);
            this.$router.push("/menu");
          }
        });
      }
    },
  },
};
</script>