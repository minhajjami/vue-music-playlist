<template>
  <div class="navbar">
    <nav>
      <h1><router-link :to="{ name: 'Home' }"> YOLO Music </router-link></h1>
      <div class="links">
        <div v-if="user">
          <router-link :to="{ name: 'UserPlayLists' }">My PlayList</router-link>
          <router-link :to="{ name: 'CreatePlayList' }"
            >Create PlayList</router-link
          >
          <span>Hi there, {{ user.displayName }}</span>
          <button @click="handleLogout">Logout</button>
        </div>
        <div v-else>
          <router-link class="btn" :to="{ name: 'Signup' }">Signup</router-link>
          <router-link class="btn" :to="{ name: 'Login' }">Login</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import useLogout from "@/composables/useLogout";
import getUser from "@/composables/getUser";
import { useRouter } from "vue-router";
export default {
  setup() {
    const { error, logout, isPending } = useLogout();
    const { user } = getUser();
    const router = useRouter();

    //logout
    const handleLogout = async () => {
      await logout();
      if (!error.value) {
        router.push({ name: "Login" });
      }
    };

    return { handleLogout, user };
  },
};
</script>

<style scoped>
.navbar {
  padding: 16px 10px;
  margin-bottom: 60px;
  background: white;
}
nav {
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}
nav img {
  max-height: 60px;
}
nav h1 {
  margin-left: 20px;
}
nav .links {
  margin-left: auto;
}
nav .links a,
button {
  margin-left: 16px;
  font-size: 14px;
}
span {
    font-size: 14px;
    display: inline-block;
    margin-left: 16px;
    padding-left: 16px;
    border-left: 1px solid #eee;
  }
</style>