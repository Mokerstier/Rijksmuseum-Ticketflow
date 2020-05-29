(function () {
    const inputs = document.querySelectorAll('.step-two .entree-options-container input[type="radio"]')
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('change', async function () {
            const selectMonth = document.querySelector(".monthDatePicker")
            Array.from(selectMonth.children).map(child =>{
                child.remove()
            })

            if (inputs[i].checked) {
                const expoID = inputs[i].dataset.id
                let totalTickets = Number(ticketCount)

                const data = await getExpoPeriod(expoID, totalTickets)

                const monthData = Array.from(data).map(expo => {
                    const date = new Date(expo.PeriodStart)
                    const month = date.getMonth()
                    return month
                })
                
                function getUnique(monthData){
                    const uniqueArray = [];

                    for(let value of monthData){
                        if(uniqueArray.indexOf(value) === -1){
                            uniqueArray.push(value);
                        }
                    }
                    return uniqueArray;
                }

                const uniqueMonthArray = getUnique(monthData)
                

                uniqueMonthArray.sort((a, b) =>{
                    return a - b
                })

                const monthNames = { 
                    "1": "Januari",
                    "2": "Februari",
                    "3": "Maart",
                    "4": "April",
                    "5": "Mei",
                    "6": "Juni",
                    "7": "Juli",
                    "8": "Augustus",
                    "9": "September",
                    "10": "Oktober",
                    "11": "November",
                    "12": "December"
                }

                const getMonthName = uniqueMonthArray.map(month => {
                    return monthNames[month]
                })
                getMonthName.map(month =>{
                    const option = document.createElement('option')
                    option.textContent = month
                    option.value = month
                    selectMonth.appendChild(option)
                })
            }
        })
    }

    async function getExpoPeriod(expoID, totalTickets){
        let response = await fetch(`/getExpoPeriod/${expoID}/${totalTickets}`)
        let expoData = await response.json()
        return expoData
    }
})();


(function () {
    const inputs = document.querySelectorAll('.step-two .entree-options-container input[type="radio"]')
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('change', function () {
            if (inputs[i].checked) {
                const allP = document.querySelectorAll('.step-two .entree-options-container p')
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
  const validationError = document.querySelector(".field-validation-error");

  function calcSubtotal(articleOption) {
    console.log(articleOption.dataset.articleName)
    const subTotal =
      Number(articleOption.dataset.price) * Number(articleOption.value);
    // const output =
    //   document.querySelector(`data-article-name="${}"`);
    const subTotalContainer =
      articleOption.parentElement.parentElement.nextElementSibling;
    // subTotalContainer.innerText = ""

    output.innerText = `€${parseFloat(subTotal / 100).toFixed(2)}`;
    output.dataset.value = subTotal;
    // subTotalContainer.appendChild(output)
  }

  function calcTotal() {
    const outputs = document.querySelectorAll(".output");
    outputValues = [];
    const value = Array.from(outputs).map((output) => {
      outputValues.push(Number(output.dataset.value));
    });

    const total = outputValues.reduce((current, all) => {
      all = current + all;

      return all;
    });
    return total;
  }
  if (firstForm) {
    (function () {
      function priceTicket() {
        let ticketCount = 0;
        const totalTickets = document.querySelector(".totalTickets");
        const optionValues = [];
        const radios = firstForm.querySelectorAll("input");
       console.log(radios)
        const selects = firstForm.querySelectorAll("select");
        console.log(selects)
        if (!selects.length == 0) {
          Array.from(selects).map((select) => {
            const options = select.querySelectorAll("option");
            const value = Array.from(options).map((option) => {
              if (option.selected) {
                 
                optionValues.push(Number(option.value));
                ticketCount = Number(option.value) + ticketCount;
                totalTickets.value = ticketCount;
                calcSubtotal(option);
              }
            });
            return value;
          });
        } else {
            console.log('single ticket flow')
          
          Array.from(radios).map(input => {
              
            if (input.name === "ticketChoice") {
              optionValues.push(Number(input.dataset.articlePrice))
              ticketCount = 1
              totalTickets.value = ticketCount
              calcSubtotal(input)
            }
          });
        }

        const totalFirstStep = document.querySelector("#total-first-step");
        totalFirstStep.dataset.value = calcTotal();
        totalFirstStep.innerText = `€${parseFloat(calcTotal() / 100).toFixed(2)}`;

        const totalArticles = optionValues.reduce((current, all) => {
          all = current + all;
          return all;
        });

        if (totalArticles >= maxAmountOfArticles) {
          validationError.classList.remove("hidden");
        } else {
          validationError.classList.add("hidden");
        }
      }

    //   priceTicket();
      firstForm.addEventListener("change", priceTicket);
    })();
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
        console.log(arrayValues)
        arrayValues.forEach(value => {
            const checkThisInputs = form.querySelectorAll(`input`)
            console.log(checkThisInputs)
            Array.from(checkThisInputs).map(input =>{
              if ((input.type == "radio" || input.type == "checkbox") && input.value == value) {
                input.checked = true
              }
            })
            
            
        })
    }

    // Put formData in localStorage
    form.addEventListener("change", function () {
      console.log("form changed");
      let formData = new FormData(form);
      
      
      let dataObject = {}
      formData.forEach((value, key) => {
        dataObject[key] = value
      });
      let formDataJSON = JSON.stringify(dataObject)
      console.log(formDataJSON)

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
    
})