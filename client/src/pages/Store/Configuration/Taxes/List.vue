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
    this.$emit("setTittle", "Impuestos");
  },
  data() {
    return {
      large: 0,
      rute: "tax",
    };
  },
  methods: {
  },
};
</script>
