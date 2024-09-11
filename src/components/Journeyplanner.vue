<template>
  <div class="journey-planner_wrapper">
    <div class="journey-planner">
      <h2>{{ lang === 'el' ? 'Πού θέλετε να πάτε;' : 'Where do you want to go?' }}</h2>
      <div class="journey-inputs">
        <div class="input-group">
          <input
            type="text"
            :placeholder="lang === 'el' ? 'Από: Διεύθυνση, οδός, σταθμός' : 'From: Address, street, station'"
          />
          <button class="swap-button">&#x21c4;</button>
          <input
            type="text"
            :placeholder="lang === 'el' ? 'Προς: Διεύθυνση, οδός, σταθμός' : 'To: Address, street, station'"
          />
          <button class="plan-button">{{ lang === 'el' ? 'Προγραμματίστε τη διαδρομή σας' : 'Plan your journey' }}</button>
        </div>
        <div class="options-group">
          <div class="option-buttons">
            <button class="option-button selected">{{ lang === 'el' ? 'Αναχώρηση' : 'Departure' }}</button>
            <button class="option-button">{{ lang === 'el' ? 'Άφιξη' : 'Arrival' }}</button>
          </div>
          <div class="datetime-picker">
            <input type="date" value="2024-09-10" />
            <input type="time" value="21:14" />
          </div>
          <button class="now-button">{{ lang === 'el' ? 'Τώρα' : 'Now' }} &#8635;</button>
          <button class="extra-options-button">{{ lang === 'el' ? 'Πρόσθετες επιλογές' : 'Extra options' }} &#9662;</button>
        </div>
      </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'Journeyplanner',
  props: {
    lang: {
      type: String,
      required: true,
      default: 'el',
    },
  },
}
</script>

<style>
    .journey-planner_wrapper {
      background-image: url('https://wp-themes.com/wp-content/themes/twentytwentyfour/assets/images/building-exterior.webp');
      padding: 20px 0;
      background-position-y: 562px;
    }
    .journey-planner {
    background-color: white;
    padding: 15px;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    max-width: 100%;
    margin: 0 auto;
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
    background-color: #37505D;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 6px;
    cursor: pointer;
    width: 100%; /* Full width on mobile */
    margin-top: 20px; /* Added for spacing */
  }

  .plan-button:hover, .plan-button:active {
    background-color: #1c2930;
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
    background-color: #c6eaff;
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
      max-width: 800px; /* Centered container with max-width for larger screens */
      padding: 20px;
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