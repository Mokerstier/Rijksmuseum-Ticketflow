(function () {
    const inputs = document.querySelectorAll('.step-two .entree-options-container input[type="radio"]')
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('change', function () {
            if (inputs[i].checked) {
                console.log(i)
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
    const firstForm = document.querySelector('.form-first-step')
    const validationError = document.querySelector('.field-validation-error')

    function calcSubtotal(articleOption) {

        const subTotal = Number(articleOption.dataset.price) * Number(articleOption.value)
        const output = articleOption.parentElement.parentElement.nextElementSibling.firstChild
        const subTotalContainer = articleOption.parentElement.parentElement.nextElementSibling
        // subTotalContainer.innerText = ""

        output.innerText = `€${parseFloat(subTotal / 100).toFixed(2)}`
        output.dataset.value = subTotal
        // subTotalContainer.appendChild(output)

    }

    function calcTotal() {
        const outputs = document.querySelectorAll('.output')
        outputValues = []
        const value = Array.from(outputs).map(output => {
            outputValues.push(Number(output.dataset.value))

        })

        const total = outputValues.reduce((current, all) => {
            all = current + all

            return all
        })
        return total

    }
    if (firstForm) {
        (function () {
            const inputs = firstForm.querySelectorAll('select')

            const optionValues = []
            Array.from(inputs).map(input => {

                const options = input.querySelectorAll('option')

                const value = Array.from(options).map(option => {
                    if (option.selected) {
                        optionValues.push(Number(option.value))
                        calcSubtotal(option)
                    }
                })
                return value
            })

            const totalFirstStep = document.querySelector('#total-first-step')
            totalFirstStep.dataset.value = calcTotal()
            totalFirstStep.innerText = `€${parseFloat(calcTotal() / 100).toFixed(2)}`

            const totalArticles = optionValues.reduce((current, all) => {
                all = current + all
                return all
            })


            if (totalArticles >= maxAmountOfArticles) {
                validationError.classList.remove('hidden')
            } else {
                validationError.classList.add('hidden')
            }

        })()


        firstForm.addEventListener('change', function (e) {
            const inputs = firstForm.querySelectorAll('select')

            const optionValues = []
            Array.from(inputs).map(input => {

                const options = input.querySelectorAll('option')

                const value = Array.from(options).map(option => {
                    if (option.selected) {
                        optionValues.push(Number(option.value))
                        calcSubtotal(option)
                    }
                })
                return value
            })

            const totalFirstStep = document.querySelector('#total-first-step')
            totalFirstStep.dataset.value = calcTotal()
            totalFirstStep.innerText = `€${parseFloat(calcTotal() / 100).toFixed(2)}`

            const totalArticles = optionValues.reduce((current, all) => {
                all = current + all
                return all
            })


            if (totalArticles >= maxAmountOfArticles) {
                validationError.classList.remove('hidden')
            } else {
                validationError.classList.add('hidden')
            }

        })
    }

})();
(function () {
    
})