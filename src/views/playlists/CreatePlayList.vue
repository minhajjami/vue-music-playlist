<template>
  <form @submit.prevent="handleSubmit">
    <h4>Create a New Playlist</h4>
    <input type="text" placeholder="Playlist title" v-model="title" />
    <textarea
      placeholder="Playlist description..."
      v-model="description"
    ></textarea>
    <label>Upload playlist cover</label>
    <input type="file" @change="handleChange" />
    <div class="error">{{ fileError }}</div>
    <button v-if="!isPending">Create</button>
    <button disabled v-if="isPending">Saving...</button>
  </form>
</template>

<script>
import { ref } from "vue";
import useStorage from "@/composables/useStorage";
import getUser from "@/composables/getUser";
import useCollection from "@/composables/useCollection";
import { timestamp } from "@/firebase/config";
import { useRouter } from 'vue-router'

export default {
  setup() {
    const { url, filePath, uploadImage } = useStorage();
    const { user } = getUser();
    const { error, addDoc } = useCollection("playlists");
   const router = useRouter()

    const title = ref("");
    const description = ref("");
    const file = ref(null);
    const fileError = ref("");
    const isPending = ref(false);

    const handleSubmit = async () => {
      if (file.value) {
        isPending.value = true;
        await uploadImage(file.value);
          const res = await addDoc({
          title: title.value,
          description: description.value,
          userId: user.value.uid,
          userName: user.value.displayName,
          coverUrl: url.value,
          filePath: filePath.value,
          songs: [],
          createdAt: timestamp(),
        });
        isPending.value = false;
        if (!error.value) {
          router.push({ name: 'PlayListDetails', params: { id: res.id }})
        }
      }
    };

    const fileTypes = ["image/png", "image/jpeg"];

    const handleChange = (e) => {
      const selected = e.target.files[0];
      if (selected && fileTypes.includes(selected.type)) {
        file.value = selected;
        fileError.value = "";
      } else {
        file.value = null;
        fileError.value = "Please select an image file (png or jpg)";
      }
    };

    return {
      handleSubmit,
      handleChange,
      title,
      description,
      fileError,
      isPending,
    };
  },
};
</script>

<style>
form {
  background: white;
}
input[type="file"] {
  border: 0;
  padding: 0;
}
label {
  font-size: 12px;
  display: block;
  margin-top: 30px;
}
button {
  margin-top: 20px;
}
</style>