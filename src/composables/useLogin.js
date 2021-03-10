import { ref } from 'vue'
import { projectAuth } from '../firebase/config'

const error = ref(null)
const isPending=ref(false)

const login = async (email, password) => {
  error.value = null

  try {
    isPending.value=true
    const res = await projectAuth.signInWithEmailAndPassword(email, password)
    error.value = null
    isPending.value=false
    return res
  }
  catch(err) {
    isPending.value=false
    console.log(err.message)
    error.value = 'Incorrect login credentials'
  }
}

const useLogin = () => {
  return { error, login ,isPending}
}

export default useLogin