import { ref } from 'vue'
import { projectAuth } from '../firebase/config'

const error = ref(null)
const isPending=ref(false)

const signup = async (email, password, displayName) => {
  error.value = null

  try {
    isPending.value=true
    const res = await projectAuth.createUserWithEmailAndPassword(email, password)
    if (!res) {
      throw new Error('Could not complete signup')
    }
    await res.user.updateProfile({ displayName })
    error.value = null
    isPending.value=false
    return res
  }
  catch(err) {
    isPending.value=false
    console.log(err.message)
    error.value = err.message
  }
}

const useSignup = () => {
  return { error, signup,isPending }
}

export default useSignup