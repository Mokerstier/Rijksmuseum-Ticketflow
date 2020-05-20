(function () {
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
    
})();


