(function () {
    const inputs = document.querySelectorAll('.step-three .entree-options-container input[type="radio"]')
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('change', function() {
            showOptionText(i)
        })
        window.addEventListener('load', function() {
            showOptionText(i)
        })
    }

    function showOptionText(i) {
        if (inputs[i].checked) {
            const allP = document.querySelectorAll('.step-three .entree-options-container p')
            Array.from(allP).forEach(function(element) {
                element.classList.remove("on")
            })
            const p = document.querySelector(`.expositionContents${i}`)
            p.classList.add("on")
        }
    }

    
})();