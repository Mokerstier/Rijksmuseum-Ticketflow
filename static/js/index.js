(function () {
  const form = document.querySelector('[data-formname="personalInfo"]');

  if (form) {
    const submit = form.querySelector('input[type="submit"]');
    submit.disabled = true;

    function validateForm() {
      const inputs = form.querySelectorAll("input[required]");
      const checkdInputs = [];
      const options = form.querySelectorAll("option");
      Array.from(inputs).map((input) => {
        if (input.type == "checkbox") {
          if (input.checked) {
            console.log("checkbox ok");
            checkdInputs.push(true);
          } else {
            console.log("checkbox niet ok");
            checkdInputs.push(false);
            submit.disabled = true;
          }
        } else if (input.type == "text" || input.type == "email") {
          if (input.value != "") {
            console.log("inputs ok");
            checkdInputs.push(true);
          } else {
            console.log("inputs niet ok");
            checkdInputs.push(false);
          }
        }
        if (!checkdInputs.includes(false)) {
          submit.disabled = false;
        }
      });
    }
    window.addEventListener("load", validateForm);
    form.addEventListener("change", validateForm);
  }
})();

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
      removeChilds(".checkboxDay");
      removeChilds(".chooseDay");
      removeChilds(".monthDatePicker");
      removeChilds(".choose-day-period");
      removeChilds(".midday-container");
      removeChilds(".morning-container");

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
                console.dir(radioBtn);
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
                    radioStartTime.value = expo.PeriodStart;
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

(function () {
    const inputs = document.querySelectorAll('.step-three .entree-options-container input[type="radio"]')
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('change', () => {
            showOptionText(i)
        })
        showOptionText(i)
    }

    function showOptionText(i) {
        if (inputs[i].checked) {
            const allP = document.querySelectorAll('.step-three .entree-options-container p')
            Array.from(allP).forEach(element => {
                element.classList.remove("on")
            })
            const p = document.querySelector(`.expositionContents${i}`)
            p.classList.add("on")
        }
    }
})();
(function () {
  const firstForm = document.querySelector(".form-first-step");

  if (firstForm) {
    const legendLabel = document.querySelector("#legendLabel")
    const validationError = document.querySelector(".field-validation-error");
    const totalTickets = document.querySelector(".totalTickets");
    const numberTickets = document.querySelector("#aantal-first-step");
    const totalTicketsPrice = document.querySelector("#total-first-step");
    const totalPriceToSend = document.querySelector(".total-price")
    const submit = firstForm.querySelector('input[type="submit"]')

    function calcTicketCount() {
      let ticketCount;
      const formData = new FormData(firstForm);
      let data = {};
      const subTotal = [];
      let totalPrice;
      const selectedTickets = []

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
                if(option.value > 0){
                  selectedTickets.push({"name": option.dataset.name, "value": option.value})
                }
                subTotal.push(
                  Number(option.dataset.price) * Number(option.value)
                );
              }
            });
            return value;
          });
          console.log(selectedTickets)
          totalPrice = subTotal.reduce((current, all) => {
            return (all = current + all);
          });
        }
      }
      if (ticketCount == 0 || ticketCount > maxAmountOfArticles){
        submit.disabled = true 
          console.log('disabled')
      } else {
        submit.disabled = false
          console.dir( submit)
      }
      if (validationError) {
        console.log(maxAmountOfArticles+ ticketCount)
        if (ticketCount > maxAmountOfArticles) {
          validationError.classList.remove("hidden");
        } else {
          validationError.classList.add("hidden");
        }
      }
      const ticketSpan = document.createElement('span')
      const totalPriceSpan = document.createElement('span')
      
      const listOfItems = []
      selectedTickets.map(ticket => {
        const ticketText = document.createElement('span')
        ticketText.textContent = `${ticket.name} ticket, aantal ${ticket.value}. `
        ticketSpan.appendChild(ticketText)
        listOfItems.push(` ${ticket.name} aantal ${ticket.value}.`)
      })

      if(listOfItems.length == 0) listOfItems.push(' leeg')

      totalPriceSpan.textContent = 'en '
      totalTicketsPrice.value = `Totale prijs: €${parseFloat(totalPrice / 100).toFixed(2)}`;
      totalPriceToSend.value = `€${parseFloat(totalPrice / 100).toFixed(2)}`;
      totalTickets.value = ticketCount;
      numberTickets.textContent = `Totaal aantal tickets: ${ticketCount}`;
      numberTickets.insertBefore(ticketSpan, numberTickets.childNodes[0])
      totalTicketsPrice.insertBefore(totalPriceSpan, totalTicketsPrice.childNodes[0])
      
      legendLabel.setAttribute('aria-label', `Tickets voor het hele museum. 6 tickettypes beschikbaar. De huidige selectie is${listOfItems}. Totaal aantal tickets: ${ticketCount}, Totale prijs: €${parseFloat(totalPrice / 100).toFixed(2)}.`)
      console.log("hoooooooi", legendLabel);
      console.log(subTotal);
      console.log(totalPrice);
    }

    const countModule = document.querySelectorAll('.ticket-amount-container')
    console.log(countModule)
    Array.from(countModule).map(module => {
      const removeButton = module.querySelector('.remove-ticket')
      const addButton = module.querySelector('.add-ticket')
      const ticketSelect = module.querySelector('select')
      console.log(ticketSelect.selectedIndex)
      removeButton.addEventListener('click', function () {
        if (ticketSelect.selectedIndex === 0) {
          ticketSelect.selectedIndex = 0
        } else {
          ticketSelect.selectedIndex = ticketSelect.selectedIndex - 1
        }
        calcTicketCount()
      })
      addButton.addEventListener('click', function () {
        if (ticketSelect.selectedIndex === Number(maxAmountOfArticles)) {
          ticketSelect.selectedIndex = Number(maxAmountOfArticles)
        } else {
          ticketSelect.selectedIndex = ticketSelect.selectedIndex + 1
        }
        calcTicketCount()
      })
    })

    firstForm.addEventListener("change", calcTicketCount);
    window.addEventListener("load", calcTicketCount);
  }
})();
(function(){
    // Code van:
    // https://stackoverflow.com/questions/34672091/center-focused-element-of-webpages-vertically
    // Het is wel geupdate omdat het verouderde code was

    document.documentOffsetTop = function () {
        return this.offsetTop + ( this.offsetParent ? this.offsetParent.documentOffsetTop() : 0 );
    };
    
    document.scrollIntoViewCenter = function () {
        window.scrollTo( 0, this.documentOffsetTop() - (window.innerHeight / 2 ) );
    };
    
    
    window.addEventListener("keyup", function(e){
        focusCenter(e)
    });
    
    function focusCenter(e) {
        if (e.keyCode == 9) {  
            document.activeElement.scrollIntoView({behavior: "smooth", block: "center"})
        }
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
    const linkFamily = document.querySelector(".family-flow-link")
    const linkDate = document.querySelector(".date-flow-link")
    const linkGroup = document.querySelector(".group-flow-link")
    const linkOnly = document.querySelector(".only-flow-link")
    if (linkFamily) {
        linkFamily.href = "/tweede-stap?groupChoice=family&javascript=1";
        linkDate.href = "/tweede-stap?groupChoice=date&javascript=1";
        linkGroup.href = "/tweede-stap?groupChoice=small-group&javascript=1";
        linkOnly.href = "/tweede-stap?groupChoice=only&javascript=1";

    }
})();
(function () {
    const forthForm = document.querySelector(".step-two")
    if (forthForm) {
        const countModule = document.querySelectorAll('.ticket-amount-container')
        console.log(countModule)
        Array.from(countModule).map(module => {
            const removeButton = module.querySelector('.remove-ticket')
            const addButton = module.querySelector('.add-ticket')
            const ticketSelect = module.querySelector('select')
            console.log(ticketSelect.selectedIndex)
            removeButton.addEventListener('click', function () {
                if (ticketSelect.selectedIndex === 0) {
                    ticketSelect.selectedIndex = 0
                } else {
                    ticketSelect.selectedIndex = ticketSelect.selectedIndex - 1
                }
                // calcTicketCount()
            })
            addButton.addEventListener('click', function () {
                if (ticketSelect.selectedIndex === Number(ticketCount)) {
                    ticketSelect.selectedIndex = Number(ticketCount)
                } else {
                    ticketSelect.selectedIndex = ticketSelect.selectedIndex + 1
                }
                // calcTicketCount()
            })
        })
    }
})();
(function () {
    
})();
(function(){
    window.addEventListener("keypress", function(e){
        enter(e)
    })

    function enter(e){
        if(e.key == "Enter"){
            let focus = document.activeElement
            if(focus.attributes.type.nodeValue == "checkbox" || "radio"){
                e.preventDefault()
                console.log("hoi")
                focus.click()
            }
        }
    }

})();
(function () {
    const firstForm = document.querySelector(".form-first-step");
    if (firstForm) {
        const selects = firstForm.querySelectorAll('select')
        Array.from(selects).map((select) => {
            changeBackgroudnTickets(select)
            select.addEventListener("change", () => {
                changeBackgroudnTickets(select)
            })
        });

        const countModule = document.querySelectorAll('.ticket-amount-container')
        Array.from(countModule).map(module => {
            const removeButton = module.querySelector('.remove-ticket')
            const addButton = module.querySelector('.add-ticket')
            removeButton.addEventListener('click', () => {
                const select = removeButton.nextElementSibling
                changeBackgroudnTickets(select)
            })
            addButton.addEventListener('click', () => {
                const select = addButton.previousElementSibling
                changeBackgroudnTickets(select)
            })
        })

        function changeBackgroudnTickets(select) {
            const options = select.querySelectorAll("option")
            Array.from(options).map((option) => {
                if (option.selected) {
                    const div = option.parentNode.parentNode.parentNode.firstElementChild
                    if (Number(option.value) <= 1) {

                        div.classList.remove("two-tickets")
                        div.classList.remove("three-tickets")
                        div.classList.remove("more-tickets")

                    } else if (Number(option.value) == 2) {

                        div.classList.add("two-tickets")
                        div.classList.remove("three-tickets")
                        div.classList.remove("more-tickets")

                    } else if (Number(option.value) == 3) {

                        div.classList.remove("two-tickets")
                        div.classList.add("three-tickets")
                        div.classList.remove("more-tickets")

                    } else {

                        div.classList.remove("two-tickets")
                        div.classList.remove("three-tickets")
                        div.classList.add("more-tickets")
                    }
                }
            })
        }


    }
})()