<template>
    <div class="input-wrapper">
      <input
        type="text"
        v-model="inputValue"
        :placeholder="t(direction)"
        required
        @input="onInput"
        @blur="hideDropdown"
      />
      <ul v-if="filteredStations[direction]?.length && showDropdowns[direction]" class="dropdown">
        <li
          v-for="station in filteredStations[direction]"
          :key="station.id"
          @click="selectStation(station)"
        >
          {{ station.name[lang] }}
        </li>
      </ul>
      <button
        class="geo-btn btn"
        type="button"
        @click="$emit('useGeo', direction)"
        :aria-label="t('findMyLocation')"
        :title="t('findMyLocation')"
      >
        📍
      </button>
    </div>
  </template>
  <script>
  export default {
    name: "StationInput",
    props: {
      lang: {
        type: String,
        default: "el",
      },
      filteredStations: {
        type: Object,
        required: true,
      },
      showDropdowns: {
        type: Object,
        required: true,
      },
      direction: {
        type: String,
        default: "from",
      },
      modelValue: {
        type: String,
        default: "",
      },
    },
    inject: ['t'],
    emits: [
        "update:modelValue",
        "useGeo",
        "selectStation", 
        "filterStations",
        "update:showDropdowns" 
    ],
    data() {
      return {
        inputValue: this.modelValue,
      };
    },
    watch: {
      modelValue(newVal) {
        this.inputValue = newVal;
      },
      inputValue(newVal) {
        this.$emit("update:modelValue", newVal);
      },
    },
    methods: {
      onInput() {
        this.$emit("filterStations", this.direction);
      },
      selectStation(station) {
        this.$emit("selectStation", station.name[this.lang], this.direction);
      },
      hideDropdown() {
        setTimeout(() => {
            this.$emit("update:showDropdowns", {
                ...this.showDropdowns,
                [this.direction]: false,
            });
        }, 200);
    }
    },
  };
  </script>