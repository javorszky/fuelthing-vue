<script setup>
import { onMounted, ref } from "vue";
import { supabase } from "../supabase";
import { store } from "../store";

const newVehicle = ref("");

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
    const { data, error, status } = await supabase
      .from("vehicles")
      .insert([{ name: newVehicle, user_id: store.user.id }]);

    store.vehicles[data[0].id] = data[0];
  } catch (error) {
    console.error("there was an error with creating a new vehicle", error);
  }
};

const deleteVehicle = async (vehicleID) => {
  try {
    const { data, error, status } = await supabase
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
  <table>
    <thead>
      <tr>
        <th>vehicle name</th>
        <th>actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="vehicle in store.vehicles" :key="vehicle.id">
        <td>{{ vehicle.name }}</td>
        <td>
          <button @click="setActive(vehicle.id)">select</button>
          <button @click="deleteVehicle(vehicle.id)">delete</button>
        </td>
      </tr>
      <tr v-if="Object.keys(store.vehicles).length == 0">
        No vehicles yet
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="2">
          <form @submit.prevent="addVehicle(newVehicle)">
            <label for="vehicle-name"
              >Name your vehicle
              <input type="text" v-model="newVehicle" />
            </label>
            <button>Add vehicle</button>
          </form>
        </td>
      </tr>
    </tfoot>
  </table>
</template>