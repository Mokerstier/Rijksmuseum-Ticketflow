(function () {
    const inputs = document.querySelectorAll('.step-two .entree-options-container input[type="radio"]')
    console.log(inputs);
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('change', function () {
            if (inputs[i].checked) {
                console.log(inputs[i].dataset.id)
                const expoID = inputs[i].dataset.id
                let totalTickets = Number(ticketCount)
                console.log("hoi", totalTickets)
                getExpoPeriod(expoID, totalTickets)
                // console.log(i)
                // const allP = document.querySelectorAll('.step-two .entree-options-container p')
                // Array.from(allP).forEach(element => {
                //     element.classList.remove("on")
                // })
                // const p = document.querySelector(`.expositionContents${i}`)
                // p.classList.add("on")
            }
        })
    }

    async function getExpoPeriod(expoID, totalTickets){
        let response = await fetch(`/getExpoPeriod/${expoID}/${totalTickets}`)
        let expoData = await response.json()
        console.log(expoData)
        return expoData
    }
})();

