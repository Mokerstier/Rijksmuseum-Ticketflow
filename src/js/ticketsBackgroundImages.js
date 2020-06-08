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
            console.log(select)
            console.log("changing")
            const options = select.querySelectorAll("option")
            Array.from(options).map((option) => {
                if (option.selected) {
                    const div = option.parentNode.parentNode.parentNode.firstElementChild
                    if (Number(option.value) <= 1) {
                        console.log(option, " ticket 1")
                        console.dir(div)

                    } else if (Number(option.value) == 2) {
                        console.log(option, "tickets 2")
                        console.dir(div)

                    } else if (Number(option.value) == 3) {
                        console.log(option, "tickets 3")
                        console.dir(div)

                    } else {
                        console.log(option, " more than 3 tickets")
                        console.dir(div)
                    }
                }
            })
        }


    }
})()