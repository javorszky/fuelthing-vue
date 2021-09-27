<script setup>
import { onMounted, ref } from "vue";
import { supabase } from "../supabase";
import { store } from "../store";
import Notification from "./Notification.vue";

const newVehicle = ref("");
const ruhRoh = ref("");

const fetchVehicles = async () => {
  try {
    const { data, error, status } = await supabase
      .from("vehicles")
      .select(`id, name`)
      .eq("user_id", store.user.id);

    if (error && status !== 406) {
      throw error;
    }

    data.forEach((el) => {
      store.vehicles[el.id] = el;
    });
  } catch (error) {
    console.error(error);
  }
};

const addVehicle = async (newVehicle) => {
  try {
    let { data, error, status } = await supabase
      .from("vehicles")
      .insert([{ name: newVehicle, user_id: store.user.id }]);

    store.vehicles[data[0].id] = data[0];
  } catch (error) {
    console.error("there was an error with creating a new vehicle", error);
  }
};

const deleteVehicle = async (vehicleID) => {
  try {
    let { data, error, status } = await supabase
      .from("vehicles")
      .delete({ returning: "minimal" })
      .match({ id: vehicleID });

    delete store.vehicles[vehicleID];
  } catch (error) {
    console.error("there was an error with deleting a vehicle", error);
  }
};

onMounted(() => fetchVehicles());
</script>

<template>
  <div class="container">
    <Notification v-if="ruhRoh" :message="ruhRoh" type="is-danger" />
    <table class="table is-striped is-hoverable">
      <thead>
        <tr>
          <th>vehicle name</th>
          <th>actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="vehicle in store.vehicles" :key="vehicle.id">
          <td>{{ vehicle.name }}</td>
          <td class="field is-grouped">
            <p class="control">
              <button
                class="button is-link is-small"
                @click="store.activeVehicle = vehicle.id"
              >
                select
              </button>
            </p>

            <p class="control">
              <button class="delete" @click="deleteVehicle(vehicle.id)">
                delete
              </button>
            </p>
          </td>
        </tr>
        <tr v-if="Object.keys(store.vehicles).length == 0">
          No vehicles yet
        </tr>
      </tbody>
      <form class="box" @submit.prevent="addVehicle(newVehicle)">
        <div class="field">
          <label for="vehicle-name"
            >Name your vehicle
            <input class="input" type="text" v-model="newVehicle" />
          </label>
        </div>
        <div class="field">
          <button>Add vehicle</button>
        </div>
      </form>
    </table>
  </div>
</template>