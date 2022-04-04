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
            <b-button @click="authenticate" variant="success">access</b-button>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="mt-3 w-100">
            <b-alert :show="showAlert" :variant=" isErro ? 'danger' : 'primary'">{{ msgAlerta }}</b-alert>
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
      msgAlerta: "Erro",
      isErro: true,
      showAlert: false,
    }
  },
  methods: {
    authenticate(){
      let vm = this;
      let {login , password} = vm.form;
      vm.isErro=false;
      vm.msgAlerta = "Logando...";
      vm.showAlert = true;
      vm.$api.auth(login,password)
      .then(res=>{
        console.log(res.data);
        localStorage.setItem("token",JSON.stringify(res.data));
        vm.$router.push({
          name: "categories",
        })
      })
      .catch(err=>{
        if(err.response.status == 500){
          vm.isErro = true;
          vm.msgAlerta = "Erro na autenticação";
          vm.showAlert = true;
        }
      })
    }
  }
};
</script>

<style>
</style>