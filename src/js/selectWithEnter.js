(function(){
    window.addEventListener("keypress", function(e){
        enter(e)
    })

    function enter(e){
        if(e.key == "Enter"){
            let focus = document.activeElement
            if(focus.attributes.type.nodeValue == "checkbox" || "radio"){
                e.preventDefault()
                console.log("hoi")
                console.log(focus.parentElement.parentElement)
                focus.click()
            }
        }
    }

})();