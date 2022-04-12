<!---Componente general para los listados de la empresa--->
<template>
  <div>
    <div class="center">
      <q-table
        dense
        :pagination.sync="pagination"
        hide-pagination
        :filter="filter"
        :data="data.data"
        :columns="data.titles"
        row-key="name"
        no-data-label="No tengo datos"
        no-results-label="No existen resultados"
      >
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              <template v-if="col.name !== 'actions'">{{ col.value }}</template>
              <template v-else>
                <div style="float: right" class="row items-end">
                  <vs-button
                    v-for="action in col.value"
                    :key="action.icon"
                    :class="`bg-${action.color}`"
                    @click="
                      redirect(action.to, action.icon, props.row._id, props.row)
                    "
                    v-show="props.row.slug !== 'app.everyAll'"
                  >
                    <q-icon :name="action.icon" />
                    <q-tooltip
                      :content-class="`bg-${action.color} shadow-4`"
                      :offset="[10, 10]"
                    >
                      {{ action.title }}
                    </q-tooltip>
                  </vs-button>
                </div>
              </template>
            </q-td>
          </q-tr>
        </template>
        <template v-slot:top-left>
          <q-input
            borderless
            dense
            debounce="300"
            v-model="filter"
            placeholder="Search"
          >
            <q-icon slot="append" name="search" />
          </q-input>
        </template>
        <template v-slot:top-right>
          <vs-button
            class="bg-accent text-black"
            circle
            @click="(dialog = true), (copyDate_id = null)"
          >
            Nuevo
          </vs-button>
        </template>
        <template v-slot:no-data="{ icon, message, filter }">
          <div class="full-width row flex-center text-accent q-gutter-sm">
            <q-icon size="2em" name="sentiment_dissatisfied" />
            <span> Esto es triste... {{ message }} </span>
            <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
          </div>
        </template>
      </q-table>

      <div class="row justify-center q-mt-md">
        <q-pagination
          v-model="pagination.page"
          :max="pagesNumber"
          direction-links
        />
      </div>
    </div>
    <vs-dialog blur prevent-close overflow-hidden v-model="dialog">
      <div class="con-content">
        <q-scroll-area
          :thumb-style="thumbStyle"
          :bar-style="barStyle"
          style="height: 36em"
        >
          <template>
            <div v-if="ruta === 'customer'">
              <Customer :id="copyDate_id" />
            </div>
            <div v-else-if="ruta === 'paymentMethod'">
              <PaymentMethod :id="copyDate_id" />
            </div>
            <div v-else-if="ruta === 'tax'">
              <Tax :id="copyDate_id" />
            </div>
            <div v-else-if="ruta === 'employee'">
              <Employee :id="copyDate_id" />
            </div>
          </template>
        </q-scroll-area>
      </div>
    </vs-dialog>
    <!--Dialogo de eliminacion-->
    <vs-dialog width="550px" v-model="deleteDialog">
      <template #header>
        <p class="text-bold">Atención</p>
      </template>
      <div class="con-content">
        <p>¿Esta seguro de eliminar el registro?</p>
      </div>
      <template #footer>
        <div class="row item-center">
          <vs-button danger @click="DeleteItem(id)">Ok</vs-button>
          <vs-button @click="deleteDialog = false">Cancelar</vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>
<script>
import Customer from "./Customer.vue";
import PaymentMethod from "./PaymentMethod.vue";
import Tax from "./Tax.vue";
import Employee from "./Employee.vue";
export default {
  mounted() {
    this.getCustomer();
  },
  components: {
    Customer,
    PaymentMethod,
    Tax,
    Employee,
  },
  computed: {
    pagesNumber() {
      return Math.ceil(this.large / this.pagination.rowsPerPage);
    },
  },
  props: ["ruta"],
  data() {
    return {
      data: {},
      copyDate_id: null,
      large: 0,
      //Estilos de la barra de scroll
      thumbStyle: {
        right: "4px",
        borderRadius: "5px",
        backgroundColor: "#000",
        width: "5px",
        opacity: 0.75,
      },
      id: 0,
      deleteDialog: false,
      barStyle: {
        right: "2px",
        borderRadius: "9px",
        backgroundColor: "#027be3",
        width: "9px",
        opacity: 0.2,
      },
      // Estilos de la barra de scroll
      dialog: false,
      filter: "",
      pagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 6,
        // rowsNumber: xx if getting data from a server
      },
    };
  },
  methods: {
    async redirect(to, icon, id, row) {
      this.copyDate_id = null;
      this.id = 0;
      if (icon === "edit") {
        this.copyDate_id = id;
        this.dialog = true;
      } else {
        this.id = id;
        this.deleteDialog = true;
      }
    },
    async DeleteItem(id) {
      this.$q.loading.show();
      await this.$api.delete(`${this.ruta}/${id}`).then(() => {
        this.$q.loading.hide();
        this.deleteDialog = false;
        this.getCustomer();
      });
    },
    async getCustomer() {
      this.data = {};
      this.$q.loading.show();
      await this.$api.get(`${this.ruta}`).then((res) => {
        if (res.length != 0) {
          this.data = res;
          this.large = this.data.data.length;
        }
        this.$q.loading.hide();
      });
    },
  },
};
</script>
<style>
.q-table__container {
  border-radius: 1.5em;
}
.q-table th {
  font-weight: bold;
  background: #eceff1 !important;
}
.vs-dialog {
  width: 95%;
  min-width: 300px;
}
</style>