(function () {
  const formThirdStep = document.querySelector(".step-three");
  const javascript = document.querySelector("input[name=javascript]");

  if (javascript) {
    javascript.value = 1;
  }

  let checkboxes;
  let AvailableDaysRadioButtons;
  let ChosenMonth;

  if (formThirdStep) {
    const outputDate = document.querySelector('#start-time-choice')
    const totalPriceContainer = document.querySelector('#total-first-step')
    const submit = formThirdStep.querySelector('input[type="submit"]');
    const validationError = document.querySelector(".field-validation-error");
    const dayPeriodContainer = document.querySelector(".choose-day-period");
    const inputs = document.querySelectorAll(
      '.step-three .entree-options-container input[type="radio"]'
    );
    const selectMonth = document.querySelector(".monthDatePicker");
    const select = document.querySelector(".monthDatePicker");
    let data = [];

    for (let i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener("change", () => checkForm(i));
      window.addEventListener("load", () => checkForm(i));
    }

    async function checkForm(i) {
      if(outputDate){
        outputDate.parentElement.remove()
      }
      
      removeChilds(".checkboxDay");
      removeChilds(".chooseDay");
      removeChilds(".monthDatePicker");
      removeChilds(".choose-day-period");
      removeChilds(".midday-container");
      removeChilds(".morning-container");

      if (inputs[i].checked) {
        const expoID = inputs[i].dataset.id;
        let totalTickets = Number(ticketCount);
        let expoPrice = inputs[i].dataset.priceCent
        const expoPriceType = inputs[i].dataset.priceType
        console.log(expoPrice)
        
        if(expoPriceType == "per ticket"){
          expoPrice = expoPrice * totalTickets
          console.log(expoPrice)
        }
        let totalPrice = Number(totalPriceContainer.dataset.priceRaw)
        totalPrice = totalPrice + Number(expoPrice)
        console.log(totalPrice);
        
        totalPriceContainer.value = `Totale prijs: €${parseFloat(totalPrice / 100).toFixed(2)}`
        
        const dataToPush = await getExpoPeriod(expoID, totalTickets);
        data = [];
        data.push(dataToPush);

        const monthData = data[0].map((expo) => {
          const date = new Date(expo.PeriodStart);
          const month = date.getMonth();
          return month;
        });

        const uniqueMonthArray = getUnique(monthData);

        uniqueMonthArray.sort((a, b) => {
          return a - b;
        });

        const monthNames = {
          "0": "Januari",
          "1": "Februari",
          "2": "Maart",
          "3": "April",
          "4": "Mei",
          "5": "Juni",
          "6": "Juli",
          "7": "Augustus",
          "8": "September",
          "9": "Oktober",
          "10": "November",
          "11": "December",
        };

        const getMonthNames = uniqueMonthArray.map((month) => {
          return monthNames[month];
        });

        const legend = document.querySelector(".legend-month");
        if (getMonthNames.length == 1) {
          legend.setAttribute(
            "aria-label",
            `In welke maand wil je gaan? Er is ${getMonthNames.length} optie beschikbaar`
          );
        } else {
          legend.setAttribute(
            "aria-label",
            `In welke maand wil je gaan? Er zijn ${getMonthNames.length} opties beschikbaar`
          );
        }

        getMonthNames.map((month) => {
          const option = document.createElement("option");

          let monthNumber;
          for (let [key, value] of Object.entries(monthNames)) {
            if (value === month) {
              monthNumber = key;
            }
          }
          option.classList.add("optionMonth");
          option.dataset.monthNumber = monthNumber;
          option.textContent = month;
          option.value = month;
          selectMonth.appendChild(option);
        });
        datePicker();
      }
    }
    function expoError() {
      validationError.classList.remove("hidden");
      validationError.textContent =
        "Er is geen rondleiding beschikbaar voor uw groepsgrootte";
      validationError.scrollIntoView();
    }
    function removeError() {
      validationError.classList.add("hidden");
    }

    select.addEventListener("change", datePicker);

    async function getExpoPeriod(expoID, totalTickets) {
      let response = await fetch(`/getExpoPeriod/${expoID}/${totalTickets}`);
      let expoData = await response.json();
      if (expoData.length == 0) {
        expoError();
      } else {
        removeError();
      }
      return expoData;
    }

    function datePicker() {
      const options = document.querySelectorAll(".optionMonth");
      const checkboxContainer = document.querySelector(".checkboxDay");

      removeChilds(".chooseDay");
      removeChilds(".choose-day-period");
      removeChilds(".midday-container");
      removeChilds(".morning-container");

      const dayNames = {
        "0": "Zondag",
        "1": "Maandag",
        "2": "Dinsdag",
        "3": "Woensdag",
        "4": "Donderdag",
        "5": "Vrijdag",
        "6": "Zaterdag",
      };
      const dayArray = [];
      const filteredMonth = [];
      Array.from(options).map((option) => {
        if (option.selected) {
          const monthNumber = Number(option.dataset.monthNumber);
          ChosenMonth = monthNumber;

          data[0].filter((expo) => {
            const date = new Date(expo.PeriodStart);
            const month = date.getMonth();
            if (month === monthNumber) {
              filteredMonth.push(expo);
              const day = new Date(expo.PeriodStart).getDay();
              dayArray.push(day);
            }
          });
        }
      });

      const uniqueDays = getUnique(dayArray);
      uniqueDays.sort((a, b) => {
        return a - b;
      });

      removeChilds(".checkboxDay");

      const getDayNames = uniqueDays.map((day) => {
        return dayNames[day];
      });

      const legend = document.querySelector(".legend-day");
      if (getDayNames.length == 1) {
        legend.setAttribute(
          "aria-label",
          `Op welke dag wil je naar het museum? Er is ${getDayNames.length} optie beschikbaar`
        );
      } else {
        legend.setAttribute(
          "aria-label",
          `Op welke dag wil je naar het museum? Er zijn ${getDayNames.length} opties beschikbaar`
        );
      }

      getDayNames.map((day) => {
        const checkbox = document.createElement("input");
        const span = document.createElement("span");
        const label = document.createElement("label");

        let dayNumber;
        for (let [key, value] of Object.entries(dayNames)) {
          if (value === day) {
            dayNumber = key;
          }
        }

        label.textContent = day;
        label.htmlFor = day;

        checkbox.type = "checkbox";
        checkbox.classList.add("inputDay");
        checkbox.dataset.dayNumber = dayNumber;
        checkbox.id = day;
        checkbox.value = day;
        checkbox.name = "dayChoice[]";

        if (day == "Zondag") {
          span.classList.add("zondag");
        }

        span.appendChild(checkbox);
        span.appendChild(label);
        checkboxContainer.appendChild(span);
      });

      checkboxes = document.querySelectorAll(".inputDay");
      let filteredDays = [];
      Array.from(checkboxes).map((checkbox) => {
        checkbox.addEventListener("change", async function () {
          const dayContainer = document.querySelector(".chooseDay");

          removeChilds(".choose-day-period");
          removeChilds(".midday-container");
          removeChilds(".morning-container");

          if (checkbox.checked) {
            const dayNumber = Number(checkbox.dataset.dayNumber);
            filteredMonth.filter((expo) => {
              const date = new Date(expo.PeriodStart);
              const day = date.getDay();
              if (day === dayNumber) {
                filteredDays.push(expo);
              }
            });
          } else if (!checkbox.checked) {
            const dayNumber = Number(checkbox.dataset.dayNumber);
            filteredDays = filteredDays.filter((expo) => {
              const date = new Date(expo.PeriodStart);
              const day = date.getDay();

              if (day !== dayNumber) {
                return expo;
              }
            });
          }
          let daysArray = [];
          let dataToCheck = [];

          if (filteredDays.length == 0) {
            removeChilds(".chooseDay");
          }

          filteredDays = filteredDays.filter((expo) => {
            let date = new Date(expo.PeriodStart);
            const dayDate = date.getDate();

            date = String(date).split(" ");
            if (date[0] == "Sun") {
              date = "Zondag";
            } else if (date[0] == "Mon") {
              date = "Maandag";
            } else if (date[0] == "Tue") {
              date = "Dinsdag";
            } else if (date[0] == "Wed") {
              date = "Woensdag";
            } else if (date[0] == "Thu") {
              date = "Donderdag";
            } else if (date[0] == "Fri") {
              date = "Vrijdag";
            } else if (date[0] == "Sat") {
              date = "Zaterdag";
            }

            const day = {
              name: date,
              date: dayDate,
            };

            if (!dataToCheck.includes(dayDate)) {
              dataToCheck.push(dayDate);
              daysArray.push(day);
            }
            const legend = document.querySelector(".legend-date");
            if (daysArray.length == 1) {
              legend.setAttribute(
                "aria-label",
                `Op welke datum wil je komen? Kies uit ${daysArray.length} beschikbare optie`
              );
            } else {
              legend.setAttribute(
                "aria-label",
                `Op welke datum wil je komen? Kies uit ${daysArray.length} beschikbare opties met de pijltjes toetsen. `
              );
            }
            removeChilds(".chooseDay");

            daysArray.map((day) => {
              const radiobutton = document.createElement("input");
              const span = document.createElement("span");
              const label = document.createElement("label");

              radiobutton.type = "radio";
              radiobutton.value = day.date;
              radiobutton.dataset.dayDate = day.date;
              radiobutton.name = "dayChoice";
              radiobutton.id = day.date;
              radiobutton.classList.add("AvailableDaysRadioButtons");

              label.htmlFor = day.date;
              label.textContent = `${day.name} ${day.date}`;

              span.appendChild(radiobutton);
              span.appendChild(label);
              dayContainer.appendChild(span);
            });
            availableDaysRadioButtons = document.querySelectorAll(
              ".AvailableDaysRadioButtons"
            );
            return expo;
          });

          Array.from(availableDaysRadioButtons).map((radioBtn) => {
            radioBtn.addEventListener("change", function () {
              const middayContainer = document.querySelector(
                ".midday-container"
              );
              const morningContainer = document.querySelector(
                ".morning-container"
              );

              removeChilds(".choose-day-period");
              removeChilds(".midday-container");
              removeChilds(".morning-container");

              const startMorning = [];
              const startMidday = [];

              if (radioBtn.checked) {
                const dateOfChosenDay = Number(radioBtn.dataset.dayDate);
                filteredDays.filter((expo) => {
                  const date = new Date(expo.PeriodStart);
                  const day = date.getDate();

                  const hour = date.getHours();

                  if (day === dateOfChosenDay) {
                    if (hour <= 12) {
                      startMorning.push(expo);
                    } else {
                      startMidday.push(expo);
                    }
                  }
                });
                if (startMorning.length == 0 || startMidday.length == 0) {
                  const legend = document.querySelector(".legend-day-period");
                  legend.setAttribute(
                    "aria-label",
                    `Wanneer op de dag wil je komen? Kies uit 1 beschikbare optie`
                  );
                } else {
                  legend.setAttribute(
                    "aria-label",
                    `Wanneer op de dag wil je komen? Kies uit 2 beschikbare opties.`
                  );
                }

                if (!startMorning.length == 0) {
                  const checkBoxDayPeriod = document.createElement("input");
                  const label = document.createElement("label");
                  const span = document.createElement("span");

                  checkBoxDayPeriod.type = "checkbox";
                  checkBoxDayPeriod.value = "morning";
                  checkBoxDayPeriod.id = "morningCheck";
                  checkBoxDayPeriod.name = "dayPeriodChoice";

                  label.textContent = "ochtend";
                  label.htmlFor = "morningCheck";

                  span.appendChild(checkBoxDayPeriod);
                  span.appendChild(label);
                  dayPeriodContainer.appendChild(span);

                  checkBoxDayPeriod.addEventListener("change", function () {
                    if (checkBoxDayPeriod.checked) {
                      showAvailableStartTime(startMorning, morningContainer);
                    } else if (!checkBoxDayPeriod.checked) {
                      Array.from(morningContainer.children).map((child) => {
                        child.remove();
                      });
                    }
                  });
                }
                if (!startMidday.length == 0) {
                  const checkBoxDayPeriod = document.createElement("input");
                  const label = document.createElement("label");
                  const span = document.createElement("span");

                  checkBoxDayPeriod.type = "checkbox";
                  checkBoxDayPeriod.value = "midday";
                  checkBoxDayPeriod.id = "middayCheck";
                  checkBoxDayPeriod.name = "dayPeriodChoice";

                  label.textContent = "middag";
                  label.htmlFor = "middayCheck";
                  span.appendChild(checkBoxDayPeriod);
                  span.appendChild(label);
                  dayPeriodContainer.appendChild(span);

                  checkBoxDayPeriod.addEventListener("change", function () {
                    if (checkBoxDayPeriod.checked) {
                      showAvailableStartTime(startMidday, middayContainer);
                    } else if (!checkBoxDayPeriod.checked) {
                      removeChilds(".midday-container");
                    }
                  });
                }
              }

              function showAvailableStartTime(array, container) {
                if (array.length != 0) {
                  const legend = document.querySelector(".legend-time-stamp");
                  if (array.length == 1) {
                    legend.setAttribute(
                      "aria-label",
                      `Hoelaat wil je komen? Kies uit ${array.length} beschikbare optie`
                    );
                  } else {
                    legend.setAttribute(
                      "aria-label",
                      `Hoelaat wil je komen? Kies uit ${array.length} beschikbare opties met de pijltjes toetsen.`
                    );
                  }

                  array.map((expo) => {
                    const radioStartTime = document.createElement("input");
                    const label = document.createElement("label");
                    const span = document.createElement("span");
                    const time = document.createElement("time");
                    const timeStamp = new Date(expo.PeriodStart)
                      .toLocaleTimeString()
                      .split(":");
                    time.textContent = timeStamp[0] + ":" + timeStamp[1];
                    time.dateTime = timeStamp[0] + ":" + timeStamp[1];
                    label.htmlFor = expo.PeriodStart;

                    radioStartTime.dataset.startTime = expo.PeriodStart;
                    radioStartTime.type = "radio";
                    radioStartTime.value = `${expo.PeriodStart},${expo.ExpositionPeriodId}`;
                    radioStartTime.id = expo.PeriodStart;
                    radioStartTime.name = "startTimeChoice";
                    radioStartTime.addEventListener("change", function () {
                      submit.disabled = false;
                    });
                    label.appendChild(time);
                    span.appendChild(radioStartTime);
                    span.appendChild(label);
                    container.appendChild(span);
                  });
                } else {
                  console.log("er zit niks in");
                }
              }
            });
          });
        });
      });
    }

    function removeChilds(className) {
      submit.disabled = true;
      const container = document.querySelector(className);
      Array.from(container.children).map((child) => {
        child.remove();
      });
    }

    function getUnique(data) {
      const uniqueArray = [];

      for (let value of data) {
        if (uniqueArray.indexOf(value) === -1) {
          uniqueArray.push(value);
        }
      }
      return uniqueArray;
    }
  }
})();
