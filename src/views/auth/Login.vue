<template>
  <form @submit.prevent="handleSubmit">
    <h3>Login</h3>
    <input type="text" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <div v-if="error" class="error">{{ error }}</div>
    <button v-if="!isPending">Login</button>
    <button v-if="isPending" disabled>Loding...</button>
  </form>
</template>

<script>
import { ref } from "vue";
import useLogin from "../../composables/useLogin";
import {useRouter} from 'vue-router'
export default {
  setup() {
    const { error, login, isPending } = useLogin();
    const router= useRouter()

    const email = ref("");
    const password = ref("");

    const handleSubmit = async () => {
      const res = await login(email.value, password.value);
      if (!error.value) {
       router.push({name:'UserPlayLists'})
      }
    };
    return { email, password, error, handleSubmit, isPending };
  },
};
</script>

<style>
</style>