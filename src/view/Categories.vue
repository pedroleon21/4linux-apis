<template>
  <b-container>
    <b-row>
      <b-col>
        <h3>Categories</h3>
      </b-col>
    </b-row>
    <b-card>
      <b-form-select
        @change="listAndFilter"
        v-model="selected"
        :options="categories"
      ></b-form-select>
    </b-card>
    <b-card v-if="listApisIsNotNull">
      <b-row v-if="apiList.length == 0" class="justify-content-center">
        <b-spinner variant="primary"></b-spinner>
      </b-row>
      <b-row v-else>
        <b-table
          :items="apiList"
          :fields="fieldsApiList"
          :per-page="perPage"
          :current-page="currentPage"
          responsive
        >
          <template v-slot:cell(Link)="data">
            <b-row>
              <b-col>
                <b-button
                  @click="openTab(data.item.Link)"
                  size="smal"
                  variant="info"
                  >open</b-button
                >
              </b-col>
            </b-row>
          </template>
        </b-table>
      </b-row>
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
      ></b-pagination>
    </b-card>
  </b-container>
</template>

<script>
export default {
  name: "categories",
  data() {
    return {
      currentPage: 0,
      rows: 0,
      perPage: 5,
      fieldsApiList: [
        { key: "API", label: "Name", sortable: true },
        { key: "Auth", label: "Auth", sortable: true },
        { key: "Description", label: "Description", sortable: true },
        {
          key: "HTTPS",
          label: "HTTPS",
          formatter: (b) => (b ? "Yes" : "No"),
          sortable: true,
        },
        { key: "Link", label: "Navigate" },
      ],
      categories: [],
      selected: null,
      apiList: null,
    };
  },
  methods: {
    openTab(url) {
      window.open(url, "_blank");
    },
    buscarApis() {
      let vm = this;
      vm.$api.get(`/apis/categories`).then((res) => {
        let list = [];
        res.data.categories.forEach((c, index) => {
          list.push({ value: index, text: c });
        });
        vm.categories = list;
        vm.rows = list.length;
        console.log(list);
      });
    },
    listAndFilter(event) {
      let vm = this;
      let selectedCategory = vm.categories.find((c) => c.value == event);
      console.log(selectedCategory);
      vm.apiList = [];
      vm.$api
        .get(`/apis/entries`)
        .then((res) => {
          vm.apiList = res.data.entries.filter((e) =>
            e.Category.localeCompare(selectedCategory.text)
          );
        })
        .catch((err) => {
          console.error(err);
          vm.apiList = null;
        });
    },
  },
  computed: {
    listApisIsNotNull() {
      return this.apiList != null || this.apiList != undefined;
    },
  },
  created() {
    let vm = this;
    vm.buscarApis();
  },
};
</script>

<style>
</style>