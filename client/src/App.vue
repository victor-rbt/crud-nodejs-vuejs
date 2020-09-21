<template>
  <div class="app">

    <p>Lista de alunos. <button id="btn" @click="mostrarForm">Novo aluno</button></p>

    <form @submit="create" id="form" style="display: none;">
      <input type="text" placeholder="nome.." name="nome">
      <input type="number" placeholder="idade.." name="idade">
      <input type="text" placeholder="turma.." name="turma">
      <input type="text" placeholder="sexo.." name="sexo">
      <button type="submit">Enviar</button>
    </form>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Idade</th>
          <th>Turma</th>
          <th>Sexo</th>
          <th>#</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="dado in dados" :key="dado.id">
          <td>{{ dado.id }}</td>
          <td>{{ dado.nome }}</td>
          <td>{{ dado.idade }}</td>
          <td>{{ dado.turma }}</td>
          <td>{{ dado.sexo }}</td>
          <td><button class="editar">Editar</button><button class="deletar" @click="deletee(dado.id)">Deletar</button></td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data(){
    return{
      dados: {},
      turma: ''
    }
  },
  created(){
    this.read();
  },
  updated(){
    this.read();
  },
  methods:{
    create(e){
      e.preventDefault();
      const dados = {
        nome: e.target.nome.value,
        idade: e.target.idade.value,
        turma: e.target.turma.value,
        sexo: e.target.sexo.value
      }
      axios.post('http://localhost:3000/alunos', dados)
        .then(resultado => {
          console.log(resultado.data);
        })
        .catch(err => {
          console.log("Error: ", err)
        })

      const form = document.getElementById('form');
      form.style.display = 'none';
      const btn = document.getElementById('btn');
      btn.style.display = 'unset';
    },
    read(){
      axios.get('http://localhost:3000/alunos')
        .then(resultado => {
          return resultado;
        })
        .then(this.atribuirDados)
        .catch(err => {
          console.log("Error: ", err);
        })
    },
    update(value){
      const dados = {
        turma: this.turma,
        id: value
      }
      axios.put('http://localhost:3000/alunos', dados)
        .then(resultado => {
          console.log(resultado.data);
        })
        .catch(err => {
          console.log("Error: ", err)
        })
    },
    deletee(val){
      axios.delete('http://localhost:3000/alunos/' + val)
        .then(resultado => {
          console.log(resultado.data);
        })
        .catch(err => {
          console.log("Error: ", err)
        })
    },
    atribuirDados(resultado){
      this.dados = resultado.data;
    },
    mostrarForm(){
      const form = document.getElementById('form');
      const btn = document.getElementById('btn');
      form.style.display = 'unset';
      btn.style.display = 'none';
    }
  }
}
</script>

<style>
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
button{
  padding: 3px 8px;
  border: none;
  border-radius: 5px;
  color: #FFF;
  background-color: royalblue;
  cursor: pointer;
}
.editar{
  background-color: green;
}
.deletar{
  background-color: red;
}
.app{
  width: 100vw;
  height: 100%;
  padding: 4% 0;
  max-width: 1440px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.app p{
  font-size: 1.8rem;
  color: #CCC;
  margin-bottom: 40px;
}
.app form{
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 25px;
}
.app form input{
  width: 100%;
  margin-bottom: 12px;
  border: 1px solid #CCC;
  border-radius: 5px;
  padding: 5px 8px;
}
.app form button{
  width: 35%;
}
.app table{
  width: 80%;
  border-collapse: collapse;
}
.app table button{
  width: 40%;
  margin: 0 4px;
}
.app thead{
  background: royalblue;
  color: #FFF;
}
.app table td, th{
  border: 1px solid #dddddd;
}
.app tr:nth-child(even){
  background-color: #dddddd;
}
</style>
