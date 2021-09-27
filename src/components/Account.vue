
<script setup>
import { supabase } from "../supabase";
import { store } from "../store";
import { onMounted, ref } from "vue";
import Vehicles from "./Vehicles.vue";
import ManageVehicle from "./ManageVehicle.vue";

const loading = ref(true);
const username = ref("");
const website = ref("");
const avatar_url = ref("");

async function getProfile() {
  try {
    loading.value = true;
    store.user = supabase.auth.user();

    let { data, error, status } = await supabase
      .from("profiles")
      .select(`username, website, avatar_url`)
      .eq("id", store.user.id)
      .single();

    if (error && status !== 406) throw error;

    if (data) {
      username.value = data.username;
      website.value = data.website;
      avatar_url.value = data.avatar_url;
    }
  } catch (error) {
    console.error(error);
    alert(error.message);
  } finally {
    loading.value = false;
  }
}

async function updateProfile() {
  try {
    loading.value = true;
    store.user = supabase.auth.user();

    const updates = {
      id: store.user.id,
      username: username.value,
      website: website.value,
      avatar_url: avatar_url.value,
      updated_at: new Date(),
    };

    let { error } = await supabase.from("profiles").upsert(updates, {
      returning: "minimal", // Don't return the value after inserting
    });

    if (error) throw error;
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}

async function signOut() {
  try {
    loading.value = true;
    let { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}

onMounted(getProfile);
</script>
<template>
  <div class="container">
    <form class="form-widget box" @submit.prevent="updateProfile">
      <div class="field">
        <label for="email">Email</label>
        <input
          class="input"
          id="email"
          type="text"
          :value="store.user.email"
          disabled
        />
      </div>
      <div class="field">
        <label for="username">Name</label>
        <input class="input" id="username" type="text" v-model="username" />
      </div>
      <div class="field">
        <label for="website">Website</label>
        <input class="input" id="website" type="website" v-model="website" />
      </div>

      <div class="field is-grouped">
        <p class="control">
          <button type="submit" class="button is-primary" :disabled="loading">
            {{ loading ? "Loading ..." : "Update" }}
          </button>
        </p>

        <p class="control">
          <button class="button block" @click="signOut" :disabled="loading">
            Sign Out
          </button>
        </p>
      </div>
    </form>

    <ManageVehicle
      v-if="store.activeVehicle"
      :vehicle="store.vehicles[store.activeVehicle]"
    />
    <Vehicles v-else />
  </div>
</template>
