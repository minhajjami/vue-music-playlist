import { projectStorage } from '@/firebase/config'
import getUser from '@/composables/getUser'
import { ref } from 'vue'
import { projectFireStore } from '../firebase/config'

const useStorage = () => {

    const {user} = getUser()
    const error = ref(null)
    const url = ref(null)
    const filePath = ref(null)

    const uploadImage = async (file) => {
        filePath.value = `covers/${user.value.uid}/${file.name}`
        const storageRef = projectStorage.ref(filePath.value)

        try {

            const res = await storageRef.put(file)
            url.value = await res.ref.getDownloadURL()

        } catch (err) {
            console.log(err.message)
            error.value = err.message
        }
    }

    const deleteImage = async (path)=>{
        const storageRef=projectStorage.ref(path)
        try {
            await storageRef.delete()
        } catch (err) {
            console.log(err.message)
            error.value = err
        }
    }

    return {error,url,filePath,uploadImage,deleteImage}
}

export default useStorage