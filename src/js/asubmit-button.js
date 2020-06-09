(function () {
  const form = document.querySelector('[data-formname="personalInfo"]');
  const submit = form.querySelector('input[type="submit"]');

  if (form) {
    submit.disabled = true;

    function validateForm() {
      const inputs = form.querySelectorAll("input[required]");
      const checkdInputs = [];
      const options = form.querySelectorAll("option");
      Array.from(inputs).map((input) => {
        if (input.type == "checkbox") {
          if (input.checked) {
            console.log("checkbox ok");
            checkdInputs.push(true)
          } else {
            console.log("checkbox niet ok");
            checkdInputs.push(false)
            submit.disabled = true;
          }
        } else if(input.type == "text" || input.type =="email"){
            if(input.value != ''){
                console.log("inputs ok");
                checkdInputs.push(true)
            } else {
                console.log("inputs niet ok");
                checkdInputs.push(false)
            }
        }
        if (!checkdInputs.includes(false)){
            submit.disabled = false
        }
      });
    }
    window.addEventListener("load", validateForm);
    form.addEventListener("change", validateForm);
  }
})();
