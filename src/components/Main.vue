<script setup>
import { ref } from "vue";
const emit = defineEmits(["login"]);
const email = ref("");
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