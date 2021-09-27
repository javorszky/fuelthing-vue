<script setup>
import { ref } from "vue";

const typeClass = ref("");

const props = defineProps({
  type: String,
  message: String,
});

const emit = defineEmits(["hideYoSelf"]);

switch (props.type) {
  case "is-danger":
  case "is-warning":
  case "is-success":
  case "is-info":
  case "is-primary":
  case "is-link":
    typeClass.value = props.type;
}
</script>

<template>
  <div :class="typeClass" class="notification">
    <button @click="emit('hideYoSelf')" class="delete"></button>
    {{ props.message }}
  </div>
</template>