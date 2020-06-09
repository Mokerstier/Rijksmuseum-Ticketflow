(function () {
    const form = document.querySelector('form')
    const submit = form.querySelector('input[type="submit"]')

    

    if(form){
        submit.disabled = true
        const required = form.querySelectorAll('[required]')
        Array.from(required).forEach(element =>{
            element.addEventListener("change", checkRequired)
        })
        
        console.log(required)
        
        function checkRequired(){ 

            let inputArray = []
            Array.from(required).forEach(element =>{
                inputArray.push(element)
                
            })  
                let valid = true;

                inputArray.map(element => {
                    console.log('AAAAAA',isValid(element))
                    console.log('AAAAAA')
                  if (!isValid(element) || !element.value) {
                      
                    return valid = false
                  } 
                })
                console.log(valid)
                if (!valid) {
                    submit.disabled = true 
                    console.log('disabled')
                }else{
                    submit.disabled = false;
                    console.log('enabled')
                } 

              }
        
        function isValid(input){
            console.dir(input)
            console.log(input.validity.valid)
            if (input.validity.valid) return true
        }
        window.addEventListener("load", checkRequired)
        form.addEventListener("change", checkRequired)
        
          
    }
})();