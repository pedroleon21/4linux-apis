<template>
  <div>
    <b-container>
      <b-card class="justify-contet-center">
        <b-row>
          <b-col >Login</b-col>
        </b-row>
        <b-row class="justify-content-center">
          <b-col cols=6>
            <label>Login:</label>
            <b-form-input v-model="form.login">
            </b-form-input>
          </b-col>
        </b-row>
        <b-row class="justify-content-center">
          <b-col cols=6>
            <label>password:</label>
            <b-form-input type="password" v-model="form.password">
            </b-form-input></b-col>
        </b-row>
        <b-row class="justify-content-center">
          <b-col cols=6 class="mt-3 w-100">
            <b-button @click="autenticate" variant="success">access</b-button>
          </b-col>
        </b-row>
      </b-card>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "Login",
  data(){
    return {
      form: {},
    }
  },
  methods: {
    autenticate(){
      let vm = this;
      let {login , password} = vm.form;
      vm.$api.auth(login,password)
      .then(res=>{
        console.log(res.data);
        localStorage.setItem("token",JSON.stringify(res.data));
        vm.$router.push({
          name: "categories",
        })
      })
      .catch(console.error);
    }
  }
};
</script>

<style>
</style>