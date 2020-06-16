
(function () {
  function localStorageTest() {
    const test = "test";
    try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  if (localStorageTest() === true) {
    const form = document.querySelector("form")
    const formName = form.dataset.formname
    // Check if formData is populated and push it to the form
    let storedForm = localStorage.getItem("formData")

    storedForm = storedForm ? JSON.parse(storedForm) : {}
    if (storedForm[formName]){
        const arrayValues = Object.values(storedForm[formName])
        const formObject = Object.entries(storedForm[formName])

        const formInputs = form.querySelectorAll('input')
        const formSelects = form.querySelectorAll('select')

        arrayValues.forEach(value => {

            if(formInputs){
              
              Array.from(formInputs).map(input =>{
                if ((input.type == "radio" || input.type == "checkbox") && input.value == value) {
                  input.checked = true
                }
              })
            }

            if(formSelects){
              
              Array.from(formObject).map(object =>{
               
                Array.from(formSelects).map(select =>{
                  
                  if (select.name == object[0]){
                    Array.from(select.children).map(option =>{
                      if(option.value == object[1] || option.value.split(',')[0] == object[1] ){
                        
                        option.selected = true
                      }
                    })
                    
                  }
                })
              })
            }
        })
    }

    function setLocalStorage(){
      let formData = new FormData(form);
      
      
      let dataObject = {}
      formData.forEach((value, key) => {
        if (key == 'Multimediatour'){
          
          dataObject[key] = value.split(',')[0]
        }
        else {
          dataObject[key] = value
        }
      });
      let formDataJSON = JSON.stringify(dataObject)
      

      let existing = localStorage.getItem("formData")

      // If no existing data, create an array
      // Otherwise, convert the localStorage string to an array
      existing = existing ? JSON.parse(existing) : {}
      
      // Add new data to localStorage Array
      existing[form.dataset.formname] = dataObject

      // Save back to localStorage
      localStorage.setItem("formData", JSON.stringify(existing))
    }
    const addExtra = document.querySelector('.add-ticket')
    const removeExtra = document.querySelector('.remove-ticket')
    if(addExtra){
      addExtra.addEventListener('click', function(){
        console.log('click')
        setTimeout(() => {
          setLocalStorage()
        }, 1000);
       
      })
      removeExtra.addEventListener('click', function(){
        console.log('click')
        setTimeout(() => {
          setLocalStorage()
        }, 1000);
      })
    }
    
    // Put formData in localStorage
    form.addEventListener("change", function () {
      setLocalStorage()

    })

  } else {
    console.log("Local Storage is unavailable");
  }
})();
