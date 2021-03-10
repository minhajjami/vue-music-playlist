<template>
   <form @submit.prevent="handleSubmit">
    <h3>Signup</h3>
     <input type="text" placeholder="Display Name" v-model="displayName" />
    <input type="text" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <div v-if="error">{{ error }}</div>
    <button v-if="!isPending">Sign up</button>
    <button v-if="isPending" disabled>Loding...</button>
  </form>
</template>

<script>
import { ref } from 'vue'
import useSignup from '../../composables/useSignup'
import {useRouter} from 'vue-router'
export default {
    setup(){
         const{error,signup,isPending} = useSignup()
         const router= useRouter()
         
         const displayName = ref('')
         const email= ref('')
         const password=ref('')

         const handleSubmit = async ()=>{
             await signup(email.value,password.value,displayName.value)
             if(!error.value){
                  router.push({name:'UserPlayLists'})
             }
         }

         return{error,displayName,email,password,isPending,handleSubmit}
    }
   
}
</script>

<style>

</style>