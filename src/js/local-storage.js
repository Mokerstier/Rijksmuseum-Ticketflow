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
    
    form.addEventListener("change", function () {
      console.log("form changed");
      let formData = new FormData(form);
      console.log(formData)

      let dataObject = {}
      formData.forEach((value, key) => {
        dataObject[key] = value
      });
      let formDataJSON = JSON.stringify(dataObject)
      console.log(formDataJSON)

      var existing = localStorage.getItem("formData")

      // If no existing data, create an array
      // Otherwise, convert the localStorage string to an array
      existing = existing ? JSON.parse(existing) : {}

      // Add new data to localStorage Array
      existing[form.dataset.formname] = dataObject

      // Save back to localStorage
      localStorage.setItem("formData", JSON.stringify(existing))
    })

  } else {
    console.log("Local Storage is unavailable");
  }
})();
