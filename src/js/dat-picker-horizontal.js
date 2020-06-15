(function () {
  const form = document.querySelector(".step-three");

  if (form) {
    function tabNav(e) {
      if (e.keyCode == 9) {
        getFieldsets();
      }
    }

    function getCurrentFieldset() {
      let focus = document.activeElement;
      console.dir(focus)
      if(focus.nodeName == "INPUT" || focus.nodeName == "SELECT" || focus.nodeName == "OPTION" || focus.attributes.type.nodeValue != "submit"){
        let currentFieldset = focus.closest("fieldset");
        return currentFieldset;
      }
      

      
    }

    function getNextFieldset() {
      let focus = document.activeElement;
      if(focus.nodeName == "INPUT" || focus.nodeName == "SELECT" || focus.nodeName == "OPTION" || focus.attributes.type.nodeValue != "submit"){
        let nextFieldset = focus.closest("fieldset").nextElementSibling;
        return nextFieldset;
    }
      
      
    }

    function getPreviousFieldset(){
        let focus = document.activeElement;
        if(focus.nodeName == "INPUT" || focus.nodeName == "SELECT" || focus.nodeName == "OPTION" || focus.attributes.type.nodeValue != "submit"){
            let previousFieldset = focus.closest("fieldset").previousElementSibling;
            return previousFieldset;
        }
        
  
        
    }

    function getFieldsets() {
      const next = getNextFieldset();
      const current = getCurrentFieldset();
      const previous = getPreviousFieldset();

      if (previous){
        previous.classList.remove('current-date-field')
        previous.classList.remove('next-date-field')
        console.dir(previous)
        previous.classList.add('previous-date-field')
      }

      console.log(current);
      current.classList.remove('previous-date-field')
      current.classList.remove('next-date-field')

      current.classList.add('current-date-field')

      if(next){
        next.classList.remove('previous-date-field')
        next.classList.remove('current-date-field')
        console.log(next);
        next.classList.add('next-date-field')
      }

    }

    form.addEventListener("change", function () {
        getFieldsets();
    });
    window.addEventListener("keyup", function (e) {
      console.log(e.keyCode)
      tabNav(e);
    });
  }
})();
