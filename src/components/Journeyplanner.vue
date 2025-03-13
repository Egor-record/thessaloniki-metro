<template>
  <section class="journey-planner_wrapper">
      <div class="journey-planner">
        <div class="journey-planner_inner">
          <div class="passanger-img">
            <img src="/photos/pass.jpg" alt="Passanger Paying for tickets">
          </div>
          <div class="form-wrapper">
            <h2 class="mt-md-0 mt-sm-4">{{ $t('whereTo') }}</h2>
            <div class="journey-inputs">
              <div class="input-group">
                <input type="text" :placeholder="$t('from')" />
                <button class="swap-button">&#x21c4;</button>
                <input
                  type="text"
                  :placeholder="$t('to')"
                />
                <button class="plan-button btn">{{ $t('plan') }}</button>
              </div>
              <div class="options-group">
                <div class="option-buttons">
                  <button class="option-button btn selected">{{ $t('departure') }}</button>
                  <button class="option-button btn">{{ $t('arrival') }}</button>
                </div>
                <div class="datetime-picker">
                  <input type="date" value="2024-09-10" />
                  <input type="time" value="21:14" />
                </div>
                <button class="now-button btn">{{ $t('now') }} &#8635;</button>
                <button class="extra-options-button btn">{{ $t('extra') }} &#9662;</button>
              </div>
            </div>
          </div>
        </div>
    </div>
  </section>
</template>

<script>
const TRANSLATION = {
  el: {
     whereTo: 'Πού θέλετε να πάτε;',
     from: 'Από: Διεύθυνση, οδός, σταθμός',
     to: 'Προς: Διεύθυνση, οδός, σταθμός',
     plan: 'Προγραμματίστε τη διαδρομή σας',
     departure: 'Αναχώρηση',
     arrival: 'Άφιξη',
     now: 'Τώρα',
     extra: 'Πρόσθετες επιλογές'
  },
  en: {
    whereTo: 'Where do you want to go?',
    from: 'From: Address, street, station',
    to: 'To: Address, street, station',
    plan: 'Plan your journey',
    departure: 'Departure',
    arrival: 'Arrival',
    now: 'Now',
    extra: 'Extra options'
  }
}
export default {
  name: 'Journeyplanner',
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
    margin-bottom: 20px;
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

  .input-group input {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 6px;
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
    border-radius: 6px;
    cursor: pointer;
    width: 100%; /* Full width on mobile */
    margin-top: 20px; /* Added for spacing */
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

  /* Media Queries for larger screens (tablets and desktops) */
  @media screen and (min-width: 768px) {
    .journey-planner {
      max-width: 1100px;
      padding: 0 4rem 0 0;
    }

    .journey-planner_inner {
      flex-direction: row;
      gap: 20px;
    }

    .form-wrapper {
      padding-top: 30px;
    }

    .input-group {
      flex-direction: row; /* Side-by-side inputs for larger screens */
      gap: 10px;
    }

    .swap-button {
      width: auto; /* Button width adjusts for larger screens */
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