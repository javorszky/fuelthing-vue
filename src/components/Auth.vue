<script setup>
import { ref } from "vue";
const emit = defineEmits(["login"]);
const email = ref("");

const handleLogin = async (email) => {
  try {
    setLoading(true);
    const { error } = await supabase.auth.signIn({ email });
    if (error) {
      throw error;
    }
    setAuthNotification({
      type: "is-success",
      message: "check your email inbox for a magic link!",
    });
  } catch (error) {
    setAuthNotification({
      type: "is-danger",
      message: error.error_description || error.message,
    });
  } finally {
    setLoading(false);
  }
};
</script>

<template>
  <form @submit.prevent="$emit('login', email)">
    <h2>Log in to fuel thing</h2>
    <label for="email">
      Email address
      <input type="email" id="email" v-model="email" />
    </label>
    <button>Send the magic link!</button>
  </form>
</template>

<style scoped>
</style>