<script setup>
import { ref } from "vue";
import { supabase } from "../supabase";

import Notification from "./Notification.vue";

const loading = ref(false);
const email = ref("");
const note = ref("");
const noteType = ref("");

const handleLogin = async () => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signIn({ email: email.value });
    if (error) throw error;
    note.value = "check your email for a login link";
    noteType.value = "is-success";
  } catch (error) {
    alert(error.error_description || error.message);
    note.value = noteType.value = "is-danger";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="container content">
    <h1 className="title">Record your refuels</h1>
    <p>
      After creating an account and logging in, you will be able to add your
      vehicles you want to track the refuels for.
    </p>
    <p>
      Once you have a vehicle, clicking 'manage' will take you to your list. In
      there the site will ask for stats: trip1 distance, trip2 distance, how
      much you fueled, how much you paid for it, and how much the fuel cost.
      Currently it's geared towards UK units.
    </p>
    <p>
      The idea is to record both trips, and reset the longer trip at every
      refuel. That way you will have data for one tank's, and two tanks' worth
      of trips.
    </p>
    <p>
      Future work includes better styling and UX (obviously, it's badly needed
      :D), and fancy graphs.
    </p>
    <p className="description">Sign in via magic link with your email below</p>

    <form class="box" @submit.prevent="handleLogin(email)">
      <div class="field">
        <label class="label" for="email">
          Email
          <input
            class="input"
            type="email"
            id="email"
            v-model="email"
            placeholder="e.g. bob@accounting.com"
          />
        </label>
      </div>
      <p class="control">
        <button class="button is-primary">Send magic link</button>
      </p>
    </form>
    <Notification :message="note" :type="noteType" />
  </div>
</template>