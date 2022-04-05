<template>
  <div>
    <q-page class="q-pa-sm">
      <List :ruta="rute" />
    </q-page>
  </div>
</template>
<script>
import List from "src/components/List.vue";
export default {
  components: {
    List,
  },
  mounted() {
    this.$emit("setTittle", "Metodos de Pago");
  },
  data() {
    return {
      large: 0,
      rute: "paymentMethod",
    };
  },
  methods: {
  },
};
</script>
