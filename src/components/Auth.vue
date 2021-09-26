<script setup>
import { ref } from "vue";
import { supabase } from "../supabase";

const emit = defineEmits(["login"]);

const loading = ref(false);
const email = ref("");
const note = ref("");

const handleLogin = async () => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signIn({ email: email.value });
    if (error) throw error;
    note.value = "check your email for a login link";
  } catch (error) {
    note.value = error.error_description || error.message;
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <form @submit.prevent="handleLogin(email)">
    <h2>Log in to fuel thing</h2>
    <label for="email">
      Email address
      <input type="email" id="email" v-model="email" />
    </label>
    <button>Send the magic link!</button>
  </form>
  <p v-if="note">{{ note }}</p>
</template>

<style scoped>
</style>