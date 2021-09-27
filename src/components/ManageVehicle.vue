<script setup>
import { onMounted } from "@vue/runtime-core";
import { ref } from "vue";

import Notification from "./Notification.vue";

import { supabase } from "../supabase";
import { store } from "../store";

const props = defineProps({
  vehicle: Object,
});

const ukGalPerLitre = 4.54609188;
const fuels = ref([]);
const t1dist = ref("");
const t1mpg = ref("");
const t2dist = ref("");
const t2mpg = ref("");
const fuelName = ref("");
const fuelPrice = ref("");
const fuelAmount = ref("");
const ruhRoh = ref("");

const fetchData = async () => {
  try {
    let { data, error, status } = await supabase
      .from("fuels")
      .select(
        `id, vehicle_id, trip1_distance, trip1_mpg, trip2_distance, trip2_mpg, fuel_name, fuel_price, fuel_amount, inserted_at`
      )
      .eq("vehicle_id", props.vehicle.id);

    if (error) {
      throw error;
    }

    fuels.value = data;
  } catch (error) {
    ruhRoh.value = "oh noes, error fetching fuels for the vehicle\n\n" + error;
  }
};

const resolveMPG = (distance, mpg, fuel_amount) => {
  const gals = fuel_amount / ukGalPerLitre;
  const calcedMPG = distance / gals;

  return mpg ? mpg : calcedMPG;
};

const toFixed = (x) => {
  return Number.parseFloat(x).toFixed(2);
};

const prettyDate = (d) => {
  return new Date(d).toLocaleString();
};

const addFuel = async () => {
  try {
    const { data, error, status } = await supabase.from("fuels").insert([
      {
        vehicle_id: props.vehicle.id,
        trip1_distance: t1dist.value,
        trip1_mpg: t1mpg.value,
        trip2_distance: t2dist.value,
        trip2_mpg: t2mpg.value,
        fuel_name: fuelName.value,
        fuel_price: fuelPrice.value,
        fuel_amount: fuelAmount.value,
      },
    ]);

    if (error) {
      throw error;
    }

    fuels.value.push(data[0]);
  } catch (error) {
    ruhRoh.value = "error while trying to insert a fuel\n\n" + error.message;
  }
};

const hide = () => {
  ruhRoh.value = "";
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <h1 class="title">Fuel list for {{ props.vehicle.name }} <a href="#" class="button is-link" @click="store.activeVehicle= ''">Go back</a></h1>
  <Notification @hide-yo-self="hide" v-if="ruhRoh" :message="ruhRoh" type="is-danger"/>
  <tbody class="table is-hoverable is-striped is-narrow is-fullwidth">
    <thead>
      <th>date</th>
      <th>trip 1 distance</th>
      <th>trip 1 mpg</th>
      <th>trip 2 distance</th>
      <th>trip 2 mpg</th>
      <th>fuel amount</th>
      <th>fuel price</th>
      <th>fuel name</th>
    </thead>
    <tbody>
        <tr v-for="f in fuels" :key="f.id">
            <td>{{prettyDate(f.inserted_at)}}</td>
            <td>{{f.trip1_distance}}</td>
            <td>{{toFixed(resolveMPG(f.trip1_distance, f.trip1_mpg, f.fuel_amount))}}</td>
            <td>{{f.trip2_distance}}</td>
            <td>{{toFixed(resolveMPG(f.trip2_distance, f.trip2_mpg, f.fuel_amount))}}</td>
            <td>{{f.fuel_amount}}</td>
            <td>{{f.fuel_price}}</td>
            <td>{{f.fuel_name}}</td>
        </tr>
    </tbody>

  </tbody>
  <form @submit.prevent="addFuel" className="box">

    <h2 className="subtitle">Add fuel entry</h2>
    <div className="columns">
        <div className="column is-quarter">
            <div className="field">
                <label className="label" for="trip1Distance">Trip 1 distance</label>
                <input className="input" type="number"
                    step="0.1"
                    id="trip1Distance"
                    v-model.number="t1dist"  />
            </div>
        </div>
        <div className="column is-quarter">
            <div className="field">
                <label className="label" for="trip1MPG">Trip 1 MPG (optional)</label>
                <input className="input" type="number"
                    step="0.1"
                    id="trip1MPG"
                    v-model.number="t1mpg" />
            </div>
        </div>
        <div className="column is-quarter">
            <div className="field">
                <label className="label" for="trip2Distance">Trip 2 distance</label>
                <input className="input" type="number"
                    step="0.1"
                    id="trip2Distance"
                    v-model.number="t2dist" />
            </div>
        </div>
        <div className="column is-quarter">
            <div className="field">
                <label className="label" for="trip2MPG">Trip 2 MPG (optional)</label>
                <input className="input" type="number"
                    step="0.1"
                    id="trip2MPG"
                    v-model.number="t2mpg" />
            </div>
        </div>
    </div>

    <div className="columns">
        <div className="column is-half">
            <div className="field">
                <label className="label" for="fuelName">Fuel name</label>
                <input className="input" type="text"
                    id="fuelName"
                    v-model="fuelName" />
            </div>
        </div>
        <div className="column is-quarter">
            <div className="field">
                <label className="label" for="fuelPrice">Fuel Price</label>
                <input className="input" type="number"
                    step="0.01"
                    id="fuelPrice"
                    v-model.number="fuelPrice" />
            </div>
        </div>
        <div className="column is-quarter">
            <div className="field">
                <label className="label" for="fuelAmount">Fuel amount</label>
                <input className="input" type="number"
                    step="0.01"
                    id="fuelAmount"
                    v-model.number="fuelAmount" />
            </div>
        </div>
    </div>

    <div className="field">
        <button className="button is-primary" type="submit">Add fuel record</button>
    </div>
</form>
</template>