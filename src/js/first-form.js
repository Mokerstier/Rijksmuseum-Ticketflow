(function () {
    const firstForm = document.querySelector('.form-first-step')
    const validationError = document.querySelector('.field-validation-error')
    
    function calcSubtotal(articleOption){
        
        const subTotal = Number(articleOption.dataset.price) * Number(articleOption.value)
        const subTotalContainer = articleOption.parentElement.parentElement.nextElementSibling
        subTotalContainer.innerText = `€${parseFloat(subTotal / 100).toFixed(2)}`
        console.log(subTotal)
        totalPriceContainer.push(subTotal)
        
    }
    function calcTotal(subTotal){

        
    }
    firstForm.addEventListener('change', function(e){
        const inputs = firstForm.querySelectorAll('select')
        
        const optionValues = []
        Array.from(inputs).map(input => {

            const options = input.querySelectorAll('option')

            const value = Array.from(options).map(option => {
               if (option.selected){
                    optionValues.push(Number(option.value))
                    calcSubtotal(option)
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


