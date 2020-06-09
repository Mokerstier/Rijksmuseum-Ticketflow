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