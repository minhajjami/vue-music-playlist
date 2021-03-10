import { ref } from 'vue'
import { projectAuth } from '../firebase/config'

// refs
const error = ref(null)
const isPending=ref(false)
// logout function
const logout = async () => {
  error.value = null

  try {
    isPending.value=true
    await projectAuth.signOut()
    isPending.value=false
  }
  catch(err) {
    isPending.value=false
    console.log(err.message)
    error.value = err.message
  }
}

const useLogout = () => {
  return { error, logout ,isPending}
}

export default useLogout