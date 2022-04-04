<template>
  <div v-if="can('configuration.bussines')">
    Diseñar Dashboar para datos a mostrar
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "Index",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
    };
  },
  computed: {
    ...mapGetters("generals", ["can"]),
  },
  methods: {
  },
};
</script>