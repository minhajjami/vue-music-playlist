import { ref } from 'vue'
import { projectFireStore } from '../firebase/config'

const useDocument = (collection, id) => {
    const error = ref(null)
    const isPending = ref(false)
    let documentRef = projectFireStore.collection(collection).doc(id)

    const deleteDoc = async () => {
        isPending.value = true
        error.value = null

        try {
            const res = await documentRef.delete()
            isPending.value = false
            return res

        } catch (err) {
            console.log(err.message)
            isPending.value = false
            error.value = 'could not delete the document'
        }
    }

    const updateDoc = async (updates) => {
        isPending.value = true
        error.value = null

        try {
            const res = await documentRef.update(updates)
            isPending.value = false
            return res

        } catch (err) {
            console.log(err.message)
            isPending.value = false
            error.value = 'could not update the document'
        }
    }

    return {error,isPending,deleteDoc,updateDoc}
}

export default useDocument