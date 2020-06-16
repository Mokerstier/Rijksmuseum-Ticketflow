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
        console.log(formObject)
        // formObject.forEach(object =>{
        //   console.log(object)
        // })
        formObject.forEach(object => {

            if(formInputs){
              
              Array.from(formInputs).map(input =>{
                if ((input.type == "radio" || input.type == "checkbox") && input.value == object[1]) {
                  input.checked = true
                }
                if ((input.type == "text" || input.type == "email") && input.name == object[0]){
                  console.log(object[0])
                  console.log(object[1])
                  input.value = object[1]
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
      
      /// https://gomakethings.com/how-to-update-localstorage-with-vanilla-javascript/ 
      let existing = localStorage.getItem("formData")

      // If no existing data, create an array
      // Otherwise, convert the localStorage string to an array
      existing = existing ? JSON.parse(existing) : {}
      
      // Add new data to localStorage Array
      existing[form.dataset.formname] = dataObject

      // Save back to localStorage
      localStorage.setItem("formData", JSON.stringify(existing))
    }

    const addExtra = document.querySelectorAll('.add-ticket')
    const removeExtra = document.querySelectorAll('.remove-ticket')
    if(addExtra){
      Array.from(addExtra).forEach(button =>{
        button.addEventListener('click', function(){
          console.log('click')
          setTimeout(() => {
            setLocalStorage()
          }, 500);
         
        })
      })
      Array.from(removeExtra).forEach(button =>{
        button.addEventListener('click', function(){
          console.log('click')
          setTimeout(() => {
            setLocalStorage()
          }, 500);
         
        })
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
