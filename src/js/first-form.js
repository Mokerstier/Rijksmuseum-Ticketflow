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