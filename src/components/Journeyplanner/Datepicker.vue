<template>
    <div class="datetime-picker">
      <input
        type="date"
        v-model="date"
        @input="emitChange"
      />
      <input
        type="time"
        v-model="time"
        @input="emitChange"
      />
      <button class="now-button btn" type="button">{{ t('now') }} &#8635;</button>
    </div>
</template>
<script setup>
import { ref, watch, inject } from "vue";

const props = defineProps({
  modelValue: {
    type: String, // ISO datetime string
    default: ""
  }
})

const emit = defineEmits(["update:modelValue"])
const date = ref("")
const time = ref("")
const t = inject("t")

if (props.modelValue) {
  const dt = new Date(props.modelValue)
  date.value = dt.toISOString().slice(0, 10)
  time.value = dt.toTimeString().slice(0, 5)
}

const emitChange = () => {
  if (date.value && time.value) {
    emit("update:modelValue", `${date.value}T${time.value}`)
  }
}
</script>