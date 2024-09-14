<template>
  <section class="journey-planner_wrapper">
      <img src="https://i.pinimg.com/originals/27/f6/87/27f687bb9376be731661403630a2a313.jpg" alt="Photo of Athens on site about Thessaloniki" width="1920" height="384">
      <div class="journey-planner">
        <div class="journey-planner_inner">
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
  </section>
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

<style lang="scss">
    .journey-planner_wrapper {
      padding: 20px 0;
      display: grid;
      width: 100%;
      grid-template-rows: repeat(2,12rem) repeat(2,auto);
      grid-template-columns: 1rem minmax(0,1fr) 1rem;
      img {
        object-fit: cover;
        object-position: 49.7396% 21.3542%;
        grid-row-start: 1;
        width: 100%;
        height: 100%;
        grid-column-start: 1;
        grid-column: 1/-1;
      }
    }

    .journey-planner {
      background-color: white;
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
      padding-left: 4rem;
      padding-right: 4rem;
      padding-top: 3rem;
      padding-bottom: 3rem;
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