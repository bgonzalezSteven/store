<template>
  <q-form class="q-gutter-md">
    <q-select
      :options="options"
      :error="$v.form.typeOfRegister.$error"
      error-message="Dato necesario"
      emit-value
      map-options
      dense
      rounded
      outlined
      label="Tipo de registro"
      v-model="form.typeOfRegister"
    />
    <q-input
      :error="$v.form.email.$error"
      error-message="Dato necesario"
      dense
      rounded
      outlined
      label="Correo"
      type="email"
      v-model="form.email"
    />
    <q-input
      :error="$v.form.username.$error"
      error-message="Dato necesario"
      dense
      rounded
      outlined
      label="Nombre"
      v-model="form.username"
    />
    <q-input
      :error="$v.form.password.$error"
      :error-message="
        $v.form.password.minLength
          ? 'Dato necesario'
          : 'La contraseña debe tener más de 6 caracteres'
      "
      dense
      rounded
      outlined
      label="Contraseña"
      v-model="form.password"
      :type="isPwd ? 'password' : 'text'"
    >
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
      </template>
    </q-input>
    <q-input
      :error="$v.form.confirmPassword.$error"
      :error-message="
        $v.form.confirmPassword.sameAsPassword
          ? 'Dato necesario'
          : 'Las contraseñas no coinciden'
      "
      dense
      rounded
      outlined
      label="Contraseña"
      v-model="form.confirmPassword"
      :type="isPwd2 ? 'password' : 'text'"
    >
      <template v-slot:append>
        <q-icon
          :name="isPwd2 ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd2 = !isPwd2"
        />
      </template>
    </q-input>
    <div>
      <q-btn
        class="full-width"
        color="primary"
        label="Registrar"
        type="submit"
        rounded
        @click="save"
      />
      <div class="col text-center q-mt-sm">
        <div class="row text-center justify-center items-center">
          <div class="text-center q-mt-sm q-gutter-lg">
            <router-link style="text-decoration: none" to="/"
              >¿Tienes cuenta?</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </q-form>
</template>
<script>
import { required, email, sameAs, minLength } from "vuelidate/lib/validators";
export default {
  validations: {
    form: {
      email: { required, email },
      username: { required },
      password: { required, minLength: minLength(6) },
      confirmPassword: { required, sameAsPassword: sameAs("password") },
      typeOfRegister: { required },
    },
  },
  data() {
    return {
      form: {},
      isPwd: true,
      isPwd2: true,
      options: [
        { label: "Negocio", value: "bussines" },
        { label: "Cliente", value: "client" },
        { label: "Delivery", value: "delivery" },
      ],
    };
  },
  methods: {
    async save() {
      this.$v.form.$touch();
      if (this.$v.form.$error) {
        this.$vs.notification({
          progress: "none",
          color: "danger",
          position: "top-center",
          title: "Error",
          text: `Por favor, verifica los campos y completa los datos`,
        });
      } else {
        this.$q.loading.show();
        this.$api
          .post("register", this.form)
          .then((user) => {
            if (user) {
              this.$q.loading.hide();
              this.$router.push("/");
            }
          })
          .catch((error) => {
            this.$vs.notification({
              progress: "none",
              color: "danger",
              position: "top-center",
              title: "Error",
              text: `${error.message}`,
            });
          });
      }
    },
  },
};
</script>