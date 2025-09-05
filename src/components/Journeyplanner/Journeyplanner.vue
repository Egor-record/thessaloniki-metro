<template>
  <section class="journey-planner_wrapper">
      <div class="journey-planner">
        <div class="journey-planner_inner">
          <div class="passanger-img">
            <img src="/photos/pass.jpg" alt="Passanger Paying for tickets">
          </div>
          <form class="form-wrapper" @submit.prevent="goToMap">
            <h2 class="mt-md-0 mt-sm-4">{{ $t('whereTo') }}</h2>            
            <div class="journey-inputs">
              <div class="input-group">
                <StationInput 
                  v-model="inputs.from"
                  v-model:showDropdowns="showDropdowns"
                  :lang="lang"
                  :filteredStations="filteredStations"
                  direction="from"
                  @use-geo="useGeo"
                  @select-station="selectStation"
                  @filter-stations="filterStations"
                />
                <!-- Swap button -->
                <button class="swap-button" type="button">&#x21c4;</button>
                <StationInput 
                  v-model="inputs.to"
                  v-model:showDropdowns="showDropdowns"
                  :lang="lang"
                  :filteredStations="filteredStations"
                  direction="to"
                  @use-geo="useGeo"
                  @select-station="selectStation"
                  @filter-stations="filterStations"
                />
              </div>
              <div class="options-group">
                <div class="option-buttons">
                  <label class="option-button" :class="{ selected: selectedOption === 'departure' }">
                    <input 
                      type="radio" 
                      value="departure" 
                      v-model="selectedOption" 
                      hidden
                    />
                    {{ $t('departure') }}
                  </label>

                  <label class="option-button" :class="{ selected: selectedOption === 'arrival' }">
                    <input 
                      type="radio" 
                      value="arrival" 
                      v-model="selectedOption" 
                      hidden
                    />
                    {{ $t('arrival') }}
                  </label>
                </div>
                <Datepicker v-model="departureDateTime" />
              </div>
              <div class="input-group">
                  <!-- Plan button -->
                  <input type="submit" class="plan-button btn" :value="$t('plan')" >
              </div>
            </div>
            <p v-if="error" class="error">{{ error }}</p>
          </form>
        </div>
    </div>
  </section>
</template>

<script>
import { STATIONS, TRANSLATION } from "./consts.js";
import { GeoPositioner } from "./utils.js"
import StationInput from './StationInput.vue';
import Datepicker from './Datepicker.vue'
export default {
  name: 'Journeyplanner',
  components: {
    StationInput,
    Datepicker
  },
  provide() {
    return {
      t: this.$t
    }
  },
  data () {
    return { 
      inputs: {
        from: "",
        to: "",
      },
      directions: {
        from: "",
        to: ""
      },
      showDropdowns: {
        from: false,
        to: false
      },
      filteredStations: {
        from: [],
        to: []
      },
      departureDateTime: "2024-09-10T21:14",
      error: null,
      selectedOption: "departure"
    }
  },
  props: {
    lang: {
      type: String,
      required: true,
      default: 'el',
    },
  },
  methods: {
    $t (word) {
      return TRANSLATION[this.lang][word]
    },
    async useGeo(field) {
      this.error = null
      if (!navigator.geolocation) {
        this.error = this.$t("geolocationNotSupported")
        return
      }

      try {
        const nearest = await new GeoPositioner().getGeopositions(field)
        if (!nearest) {
          this.error = geo.error
          return
        }
        this.inputs[field] = `${nearest.name[this.lang]} (${nearest.distance.toFixed(2)} km)`
        this.directions[field] = nearest.name[this.lang]
      } catch (error) {
        console.error(error)
        this.error = this.$t('geolocationNotSupported')
      }

    },
    filterStations(field) {
      const query = this.inputs[field].toLowerCase();
      if (!query) {
        this.filteredStations[field] = [];
        this.showDropdowns[field] = false;
        return;
      }
      this.filteredStations[field] = STATIONS.filter(s =>
        s.name[this.lang].toLowerCase().includes(query)
      );
      this.showDropdowns[field] = true;
    },
    selectStation(name, field) {
      this.inputs[field] = this.directions[field] = name;
      this.showDropdowns[field] = false;
    },
    goToMap() {
      const params = new URLSearchParams({
        from: this.directions.from,
        to: this.directions.to,
        departureDateTime: this.departureDateTime,
        arrival: this.selectedOption === 'arrival' ? 'true' : 'false'
      })
      const url = (this.lang && this.lang !== '' && this.lang == 'en') 
        ? `/${this.lang}/map?${params.toString()}` 
        : `/map?${params.toString()}`

      window.location.href = url
    }
  }
}
</script>

<style lang="scss">
  .journey-planner_wrapper {
    padding: 20px 0;
    display: grid;
    width: 100%;
    grid-template-rows: repeat(2,12rem) repeat(2,auto);
    grid-template-columns: 1rem minmax(0,1fr) 1rem;
    img.journey-planner__bg-img {
      object-fit: cover;
      object-position: 59.74% 54%;
      grid-row-start: 1;
      width: 100%;
      height: 100%;
      grid-column-start: 1;
      grid-column: 1/-1;
    }
  }

  .journey-planner {
      background-color: var(--main-white-color);
      padding: 15px;
      border-radius: 12px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      max-width: 100%;
      margin: 0 auto;
      grid-column-start: 2;
      place-self: center;
      grid-row-start: 2;
      grid-row: 1/-1;
  }

  .passanger-img img {
    max-width: 500px;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  .journey-planner_inner {
    flex-direction: column;
    display: flex;
    width: 100%;
  }

  .journey-planner h2 {
    margin: 20px 0;
    font-size: 24px;
  }

  .journey-inputs {
    display: flex;
    flex-direction: column;
    gap: 15px; /* Adjusted for mobile */
  }

  .input-group {
    display: flex;
    flex-direction: column; /* Stack inputs vertically on mobile */
    gap: 15px;
  }

  .input-wrapper {
    position: relative;
  }

  .input-group input {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 6px !important;
    width: 100%;
  }

  .swap-button {
    background-color: #e6f4ff;
    border: none;
    cursor: pointer;
    font-size: 18px;
    padding: 10px;
    border-radius: 6px;
    width: 100%; /* Full width on mobile */
  }

  .plan-button {
    background-color: #a60100;
    color: var(--main-white-color);
    border: none;
    padding: 10px 20px;
    border-radius: 6px !important;
    cursor: pointer;
    width: 100%; /* Full width on mobile */
    margin-top: 20px; /* Added for spacing */
    z-index:0 !important;
  }

  .plan-button:hover, .plan-button:active {
    background-color: #7b0100;
  }

  .options-group {
    display: flex;
    flex-direction: column; /* Stack options vertically on mobile */
    gap: 15px;
  }

  .option-buttons {
    display: flex;
    flex-direction: row; /* Keep these buttons in a row */
    justify-content: space-between;
    width: 100%;
    gap: 5px;
  }

  .option-button {
    background-color: #e6f4ff;
    border: none;
    padding: 10px 15px;
    border-radius: 6px;
    cursor: pointer;
  }

  .option-button.selected {
    background-color: #ffd32c;
    &:hover { 
      background-color: #ecc329;
    }
  }

  .datetime-picker {
    display: flex;
    flex-direction: column; /* Stack date and time vertically on mobile */
    gap: 10px;
  }

  .datetime-picker input {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 6px;
  }

  .now-button,
  .extra-options-button {
    background-color: #e6f4ff;
    border: none;
    padding: 10px;
    border-radius: 6px;
    cursor: pointer;
    width: 100%; /* Full width on mobile */
  }

  .geo-btn {
    background-color: #ecc329;
    cursor: pointer;
    font-size: 1.2rem;
    position: absolute !important;
    height: 40px;
    right: 4px;
    top: 3px;
  }

  .station-input {
    position: relative;
    width: 300px;
  }
  .dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border: 1px solid #ddd;
    max-height: 200px;
    overflow-y: auto;
    list-style: none;
    padding: 0;
    margin: 0;
    z-index: 3 !important;
  }
  .dropdown li {
    padding: 8px;
    cursor: pointer;
  }
  .dropdown li:hover {
    background: #f0f0f0;
}

  @media screen and (min-width: 768px) {
    .journey-planner {
      max-width: 1100px;
      padding: 0 2rem 0 0;
    }

    .input-group input {
      min-width: 323px;
    }

    .journey-planner_inner {
      flex-direction: row;
      gap: 20px;
    }

    .form-wrapper {
      padding: 30px 0;
    }

    .input-group {
      flex-direction: row;
      gap: 10px;
      flex-wrap: nowrap;
    }

    .swap-button {
      width: auto;
    }

    .options-group {
      flex-direction: row; /* Side-by-side options for larger screens */
      gap: 10px;
      flex-wrap: wrap; /* Allows wrapping for smaller screens */
    }

    .datetime-picker {
      flex-direction: row; /* Date and time inputs side-by-side */
      gap: 5px;
    }

    .plan-button {
      width: auto; /* Button width adjusts for larger screens */
      margin-top: 0;
      max-width: 300px;
    }

    .now-button,
    .extra-options-button {
      width: auto; /* Button width adjusts for larger screens */
    }

    .datetime-picker input {
      flex: 1;
    }

    .option-buttons {
      justify-content: flex-start;
    }
  }
</style>