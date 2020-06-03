(function () {
  const formThirdStep = document.querySelector(".step-three");
  let checkboxes;
  let AvailableDaysRadioButtons;
  let ChosenMonth;
  if (formThirdStep) {
    function getUnique(data) {
      const uniqueArray = [];

      for (let value of data) {
        if (uniqueArray.indexOf(value) === -1) {
          uniqueArray.push(value);
        }
      }
      return uniqueArray;
    }
    const dayPeriodContainer = document.querySelector(".choose-day-period");
    let data = [];
    const inputs = document.querySelectorAll(
      '.step-three .entree-options-container input[type="radio"]'
    );
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener("change", async function () {
        const checkboxContainer = document.querySelector(".checkboxDay");
        Array.from(checkboxContainer.children).map((child) => {
          child.remove();
        });
        const dayContainer = document.querySelector(".chooseDay");
        Array.from(dayContainer.children).map((child) => {
          child.remove();
        });
        const selectMonth = document.querySelector(".monthDatePicker");
        Array.from(selectMonth.children).map((child) => {
          child.remove();
        });
        Array.from(dayPeriodContainer.children).map((child) => {
          child.remove();
        });
        const middayContainer = document.querySelector(".midday-container");
        Array.from(middayContainer.children).map((child) => {
          child.remove();
        });

        const morningContainer = document.querySelector(".morning-container");
        Array.from(morningContainer.children).map((child) => {
          child.remove();
        });

        if (inputs[i].checked) {
          const expoID = inputs[i].dataset.id;
          let totalTickets = Number(ticketCount);

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

          const getMonthName = uniqueMonthArray.map((month) => {
            return monthNames[month];
          });

          getMonthName.map((month) => {
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
      });
    }

    const select = document.querySelector(".monthDatePicker");
    select.addEventListener("change", datePicker);

    async function getExpoPeriod(expoID, totalTickets) {
      let response = await fetch(`/getExpoPeriod/${expoID}/${totalTickets}`);
      let expoData = await response.json();
      return expoData;
    }

    function datePicker() {
      const dayContainer = document.querySelector(".chooseDay");
      Array.from(dayContainer.children).map((child) => {
        child.remove();
      });

      Array.from(dayPeriodContainer.children).map((child) => {
        child.remove();
      });

      const middayContainer = document.querySelector(".midday-container");
      Array.from(middayContainer.children).map((child) => {
        child.remove();
      });

      const morningContainer = document.querySelector(".morning-container");
      Array.from(morningContainer.children).map((child) => {
        child.remove();
      });

      const dayNames = {
        "0": "Zondag",
        "1": "Maandag",
        "2": "Dinsdag",
        "3": "Woensdag",
        "4": "Donderdag",
        "5": "Vrijdag",
        "6": "Zaterdag",
      };

      const options = document.querySelectorAll(".optionMonth");
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

      const checkboxContainer = document.querySelector(".checkboxDay");
      Array.from(checkboxContainer.children).map((child) => {
        child.remove();
      });

      const getDayNames = uniqueDays.map((day) => {
        return dayNames[day];
      });

      getDayNames.map((day) => {
        const checkbox = document.createElement("input");

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

        checkboxContainer.appendChild(checkbox);
        checkboxContainer.appendChild(label);
      });
      checkboxes = document.querySelectorAll(".inputDay");

      let filteredDays = [];

      Array.from(checkboxes).map((checkbox) => {
        checkbox.addEventListener("change", async function () {
          Array.from(dayPeriodContainer.children).map((child) => {
            child.remove();
          });
          const middayContainer = document.querySelector(".midday-container");
          Array.from(middayContainer.children).map((child) => {
            child.remove();
          });
          const morningContainer = document.querySelector(".morning-container");
          Array.from(morningContainer.children).map((child) => {
            child.remove();
          });

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
            const dayContainer = document.querySelector(".chooseDay");
            Array.from(dayContainer.children).map((child) => {
              child.remove();
            });
          }
          filteredDays = filteredDays.filter((expo) => {
            let date = new Date(expo.PeriodStart);
            const dayDate = date.getDate();

            // console.log(date)
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

            const dayContainer = document.querySelector(".chooseDay");
            Array.from(dayContainer.children).map((child) => {
              child.remove();
            });

            daysArray.map((day) => {
              const radiobutton = document.createElement("input");
              const label = document.createElement("label");

              radiobutton.type = "radio";
              radiobutton.value = day.date;
              radiobutton.dataset.dayDate = day.date;
              radiobutton.name = "dayChoice";
              radiobutton.id = day.date;
              radiobutton.classList.add("AvailableDaysRadioButtons");

              label.htmlFor = day.date;
              label.textContent = `${day.name} ${day.date}`;

              dayContainer.appendChild(radiobutton);
              dayContainer.appendChild(label);
            });
            availableDaysRadioButtons = document.querySelectorAll(
              ".AvailableDaysRadioButtons"
            );

            // console.log(dayDate)
            return expo;
          });
          console.log("filtered Days: ", filteredDays);

          Array.from(availableDaysRadioButtons).map((radioBtn) => {
            radioBtn.addEventListener("change", function () {
              Array.from(dayPeriodContainer.children).map((child) => {
                child.remove();
              });
              const middayContainer = document.querySelector(
                ".midday-container"
              );
              Array.from(middayContainer.children).map((child) => {
                child.remove();
              });
              const morningContainer = document.querySelector(
                ".morning-container"
              );
              Array.from(morningContainer.children).map((child) => {
                child.remove();
              });
              let startTimeArray = [];
              const startMorning = [];
              const startMidday = [];

              if (radioBtn.checked) {
                const dateOfChosenDay = Number(radioBtn.dataset.dayDate);
                console.dir(radioBtn);
                filteredDays.filter((expo) => {
                  //console.log(expo)
                  const date = new Date(expo.PeriodStart);
                  const day = date.getDate();
                  console.log(day, dateOfChosenDay);
                  const hour = date.getHours();

                  if (day === dateOfChosenDay) {
                    if (hour <= 12) {
                      startMorning.push(expo);
                    } else {
                      startMidday.push(expo);
                    }
                  }
                });
                console.log(startMorning);
                console.log(startMidday);

                if (!startMorning.length == 0) {
                  const checkBoxDayPeriod = document.createElement("input");
                  const label = document.createElement("label");
                  checkBoxDayPeriod.type = "checkbox";
                  checkBoxDayPeriod.value = "morning";
                  checkBoxDayPeriod.id = "morningCheck";
                  checkBoxDayPeriod.name = "dayPeriodChoice";

                  label.textContent = "ochtend";
                  label.htmlFor = "morningCheck";

                  dayPeriodContainer.appendChild(checkBoxDayPeriod);
                  dayPeriodContainer.appendChild(label);

                  checkBoxDayPeriod.addEventListener("change", function () {
                    if (checkBoxDayPeriod.checked) {
                      //   addToStartTime(startMorning);
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
                  checkBoxDayPeriod.type = "checkbox";
                  checkBoxDayPeriod.value = "midday";
                  checkBoxDayPeriod.id = "middayCheck";
                  checkBoxDayPeriod.name = "dayPeriodChoice";

                  label.textContent = "middag";
                  label.htmlFor = "middayCheck";
                  dayPeriodContainer.appendChild(checkBoxDayPeriod);
                  dayPeriodContainer.appendChild(label);
                  console.log("element created");

                  checkBoxDayPeriod.addEventListener("change", function () {
                    if (checkBoxDayPeriod.checked) {
                      //   addToStartTime(startMidday);
                      showAvailableStartTime(startMidday, middayContainer);
                    } else if (!checkBoxDayPeriod.checked) {
                      Array.from(middayContainer.children).map((child) => {
                        child.remove();
                      });
                    }
                  });
                }
              }

              //   function removeFromStartTime(array) {
              //     console.log("unchecked");
              //     startTimeArray = startTimeArray.map((expo) => {
              //       console.log(expo);
              //       return array.map((expoStart) => {
              //         if (
              //           expoStart.ExpositionPeriodId != expo.ExpositionPeriodId
              //         ) {
              //           return expo;
              //         }
              //       });
              //     });
              //     showAvailableStartTime(startTimeArray);
              //   }

              //   function addToStartTime(array) {
              //     array.map((expo) => {
              //       startTimeArray.push(expo);
              //     });
              //     showAvailableStartTime(startTimeArray);
              //   }

              function showAvailableStartTime(array, container) {
                if (array.length != 0) {
                  array.map((expo) => {
                    const radioStartTime = document.createElement("input");
                    const label = document.createElement("label");
                    label.textContent = expo.PeriodStart;
                    label.htmlFor = expo.PeriodStart;

                    radioStartTime.dataset.startTime = expo.PeriodStart;
                    radioStartTime.type = "radio";
                    radioStartTime.value = expo.PeriodStart;
                    radioStartTime.id = expo.PeriodStart;
                    radioStartTime.name = 'startTimeChoice'

                    container.appendChild(radioStartTime);
                    container.appendChild(label);
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
  }
})();

(function () {
    const inputs = document.querySelectorAll('.step-three .entree-options-container input[type="radio"]')
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('change', function () {
            if (inputs[i].checked) {
                const allP = document.querySelectorAll('.step-three .entree-options-container p')
                Array.from(allP).forEach(element => {
                    element.classList.remove("on")
                })
                const p = document.querySelector(`.expositionContents${i}`)
                p.classList.add("on")
            }
        })
    }
})();


(function () {
  const firstForm = document.querySelector(".form-first-step");

  if (firstForm) {
    const validationError = document.querySelector(".field-validation-error");
    const totalTickets = document.querySelector(".totalTickets");
    const numberTickets = document.querySelector("#aantal-first-step");
    const totalTicketsPrice = document.querySelector("#total-first-step");

    function calcTicketCount() {
      let ticketCount;
      const formData = new FormData(firstForm);
      let data = {};
      const subTotal = [];
      let totalPrice;

      if (firstForm.dataset.formname === "onlyTicketChoice") {
        ticketCount = 1;
        console.log("solo-soldier");
        data = {
          ticketChoice: formData.get("ticketChoice"),
        };
        const radioButtons = firstForm.querySelectorAll("input[type=radio]");
        Array.from(radioButtons).map((radio) => {
          if (radio.checked) {
            totalPrice = Number(radio.dataset.articlePrice);
          }
        });
      } else {
        ticketCount = 0;
        // for (let pair of formData.entries()) {
        //   data[pair[0]] = pair[1]
        // }

        const selects = firstForm.querySelectorAll("select");
        if (!selects.length == 0) {
          Array.from(selects).map((select) => {
            const options = select.querySelectorAll("option");
            const value = Array.from(options).map((option) => {
              if (option.selected) {
                ticketCount = Number(option.value) + ticketCount;
                subTotal.push(
                  Number(option.dataset.price) * Number(option.value)
                );
              }
            });
            return value;
          });
          totalPrice = subTotal.reduce((current, all) => {
            return (all = current + all);
          });
        }
      }

      if(validationError){
        if (ticketCount >= maxAmountOfArticles) {
          validationError.classList.remove("hidden");
        } else {
          validationError.classList.add("hidden");
        }
      }

      totalTicketsPrice.value = `€${parseFloat(totalPrice / 100).toFixed(2)}`;
      totalTickets.value = ticketCount;
      numberTickets.textContent = ticketCount;
      console.log(subTotal);
      console.log(totalPrice);
    }

    const countModule = document.querySelectorAll('.ticket-amount-container')
    console.log(countModule)
    Array.from(countModule).map(module =>{
        const removeButton = module.querySelector('.remove-ticket')
        const addButton = module.querySelector('.add-ticket')
        const ticketSelect = module.querySelector('select')
        console.log(ticketSelect.selectedIndex)
        removeButton.addEventListener('click', function(){
            if(ticketSelect.selectedIndex === 0){
                ticketSelect.selectedIndex = 0
            } else {
                ticketSelect.selectedIndex = ticketSelect.selectedIndex -1
            }
            calcTicketCount()
        })
        addButton.addEventListener('click', function(){
          if(ticketSelect.selectedIndex === Number(maxAmountOfArticles)){
              ticketSelect.selectedIndex = Number(maxAmountOfArticles)
          } else {
              ticketSelect.selectedIndex = ticketSelect.selectedIndex +1
          }
          calcTicketCount()
      })
    })

    firstForm.addEventListener("change", calcTicketCount);
    window.addEventListener("load", calcTicketCount);
  }
})();

(function () {
  function localStorageTest() {
    const test = "test";
    try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  if (localStorageTest() === true) {
    const form = document.querySelector("form")
    const formName = form.dataset.formname
    // Check if formData is populated and push it to the form
    let storedForm = localStorage.getItem("formData")

    storedForm = storedForm ? JSON.parse(storedForm) : {}
    if (storedForm[formName]){
        const arrayValues = Object.values(storedForm[formName])
        const formObject = Object.entries(storedForm[formName])

        const formInputs = form.querySelectorAll('input')
        const formSelects = form.querySelectorAll('select')

        arrayValues.forEach(value => {

            if(formInputs){
              
              Array.from(formInputs).map(input =>{
                if ((input.type == "radio" || input.type == "checkbox") && input.value == value) {
                  input.checked = true
                }
              })
            }

            if(formSelects){
              
              Array.from(formObject).map(object =>{
               
                Array.from(formSelects).map(select =>{
                  
                  if (select.name == object[0]){
                    Array.from(select.children).map(option =>{
                      if(option.value == object[1]){
                        option.selected = true
                      }
                    })
                    
                  }
                })
              })
            }
        })
    }

    // Put formData in localStorage
    form.addEventListener("change", function () {
      
      let formData = new FormData(form);
      
      
      let dataObject = {}
      formData.forEach((value, key) => {
        dataObject[key] = value
      });
      let formDataJSON = JSON.stringify(dataObject)
      

      let existing = localStorage.getItem("formData")

      // If no existing data, create an array
      // Otherwise, convert the localStorage string to an array
      existing = existing ? JSON.parse(existing) : {}
      
      // Add new data to localStorage Array
      existing[form.dataset.formname] = dataObject

      // Save back to localStorage
      localStorage.setItem("formData", JSON.stringify(existing))
    })

  } else {
    console.log("Local Storage is unavailable");
  }
})();

(function () {
    
})();