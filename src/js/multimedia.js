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