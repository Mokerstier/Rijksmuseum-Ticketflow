(function () {
  const firstForm = document.querySelector(".form-first-step");

  if (firstForm) {
    const validationError = document.querySelector(".field-validation-error");
    const totalTickets = document.querySelector(".totalTickets");
    const numberTickets = document.querySelector("#aantal-first-step");
    const totalTicketsPrice = document.querySelector("#total-first-step");
    const totalPriceToSend = document.querySelector(".total-price")

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

      if (validationError) {
        console.log(maxAmountOfArticles+ ticketCount)
        if (ticketCount > maxAmountOfArticles) {
          validationError.classList.remove("hidden");
        } else {
          validationError.classList.add("hidden");
        }
      }

      totalTicketsPrice.value = `€${parseFloat(totalPrice / 100).toFixed(2)}`;
      totalPriceToSend.value = `€${parseFloat(totalPrice / 100).toFixed(2)}`;
      totalTickets.value = ticketCount;
      numberTickets.textContent = ticketCount;
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