(function () {
    const forthForm = document.querySelector(".step-two")
    if (forthForm) {
        const countModule = document.querySelectorAll('.ticket-amount-container')
        let totalPrice = document.querySelector('#total-first-step')

        Array.from(countModule).map(module => {
            const removeButton = module.querySelector('.remove-ticket')
            const addButton = module.querySelector('.add-ticket')
            const ticketSelect = module.querySelector('select')
           
            window.addEventListener('load', function(){
                getSelected(ticketSelect)
            })

            removeButton.addEventListener('click', function () {
                if (ticketSelect.selectedIndex === 0) {
                    ticketSelect.selectedIndex = 0
                } else {
                    ticketSelect.selectedIndex = ticketSelect.selectedIndex - 1
                }
                getSelected(ticketSelect)
            })
            addButton.addEventListener('click', function () {
                if (ticketSelect.selectedIndex === Number(ticketCount)) {
                    ticketSelect.selectedIndex = Number(ticketCount)
                } else {
                    ticketSelect.selectedIndex = ticketSelect.selectedIndex + 1
                }
                getSelected(ticketSelect)
            })
        })

        async function getSelected(select){
            let selectPrice = select.dataset.price
            let ticketsTotal = select.selectedIndex
            return calcTotalPriceExtra(selectPrice, ticketsTotal)
        }
        const ticketSelects = document.querySelectorAll('select')
        Array.from(ticketSelects).map(function(select){
            select.addEventListener('change',function(){
                getSelected(select)
            } )
        })

        async function calcTotalPriceExtra(a, b){
            let totalPriceExtra = Number(a) * Number(b)
            let totalPriceCalculated = Number(totalPrice.dataset.priceRaw) + Number(totalPriceExtra)
            totalPrice.dataset.priceRawExtra = Number(totalPriceCalculated)
            totalPrice.value = `Totale prijs: €${parseFloat(totalPriceCalculated / 100).toFixed(2)}`
            return Number(totalPriceCalculated)
            
        }
        const donationInputs = document.querySelectorAll('input[name="Doneer"]')
        Array.from(donationInputs).map(function(input){

            input.addEventListener('change', function(){

                if (input.checked){
                    let value = input.value
                    calcDonation(value)
                }
            })
            window.addEventListener('load', function(){
                if (input.checked){
                    let value = input.value
                    calcDonation(value)
                }
            })
        })
        
        async function calcDonation(a){
            const ticketSelects = document.querySelectorAll('select')
            Array.from(ticketSelects).map(async function(select){
                totalPriceCalculated = await getSelected(select) + Number(a)
                totalPrice.value = `Totale prijs: €${parseFloat(totalPriceCalculated / 100).toFixed(2)}`

            })
  
        }
    }
})();