(function () {
  const form = document.querySelector('[data-formname="personalInfo"]');

  if (form) {
    const submit = form.querySelector('input[type="submit"]');
    submit.disabled = true;

    function validateForm() {
      const inputs = form.querySelectorAll("input[required]");
      const checkdInputs = [];
      const options = form.querySelectorAll("option");
      Array.from(inputs).map((input) => {
        if (input.type == "checkbox") {
          if (input.checked) {
            checkdInputs.push(true);
          } else {
            checkdInputs.push(false);
            submit.disabled = true;
          }
        } else if (input.type == "text" || input.type == "email") {
          if (input.value != "") {
            checkdInputs.push(true);
          } else {
            checkdInputs.push(false);
          }
        }
        if (!checkdInputs.includes(false)) {
          submit.disabled = false;
        }
      });
    }
    window.addEventListener("load", validateForm);
    form.addEventListener("change", validateForm);
  }
})();
