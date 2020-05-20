<<<<<<< HEAD
(function(){
    const firstForm = document.querySelector('.form-first-step')
    const validationError = document.querySelector('.field-validation-error')

    firstForm.addEventListener('change', function(e){
        const inputs = firstForm.querySelectorAll('select')
        
        const optionValues = []
        Array.from(inputs).map(input => {

            const options = input.querySelectorAll('option')

            const value = Array.from(options).map(option => {
               if (option.selected){
                    optionValues.push(Number(option.value))
               }
            })
            return value
        })
        
        const totalArticles = optionValues.reduce((current, all) =>{
            all = current + all
            return all
        })
        console.log(totalArticles)
        if(totalArticles >= maxAmountOfArticles){    
            validationError.classList.remove('hidden')
        } else{
            validationError.classList.add('hidden')
        }
    })
    
})()


=======
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
})()
console.log('hello000000ooooo')
>>>>>>> master
