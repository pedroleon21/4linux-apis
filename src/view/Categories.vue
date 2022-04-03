<template>
  <b-container>
    <b-row>
      <b-col>
        <h3>Categories</h3>
      </b-col>
    </b-row>
    <b-card v-for="(category,index) in categories" :key="index">
        {{ category }}
    </b-card>
  </b-container>
</template>

<script>
export default {
  name: "categories",
  data(){
      return {
          categories:[],
      };
  },
  methods:{
      buscarApis(){
          let vm = this;
          vm.$api.get(`/apis/categories`);
      }
  },
  created(){
      let vm = this;
      vm.buscarApis();
  }
};
</script>

<style>
</style>