<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Auth from "./components/Auth.vue";
import Account from "./components/Account.vue";

import { supabase } from "./supabase";
import { store } from "./store";

store.user = supabase.auth.user();
supabase.auth.onAuthStateChange((_, session) => {
  store.user = session.user;
});
</script>

<template>
  <Account v-if="store.user" />
  <Auth v-else />
</template>
