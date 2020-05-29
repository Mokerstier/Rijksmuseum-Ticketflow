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
