(function(){
    const firstForm = document.querySelector('form')

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
        
        const sumOfOptions = optionValues.reduce((current, all) =>{
            all = current + all
            return all
        })
        console.log(sumOfOptions)

        if(sumOfOptions >= maxAmountOfArticles){
            console.log('Show link to group tickets')
            console.log(maxAmountOfArticles+ ' is the maximum amount')
            
        }
    })
    
})()


