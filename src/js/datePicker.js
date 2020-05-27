(function () {
    const inputs = document.querySelectorAll('.step-two .entree-options-container input[type="radio"]')
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('change', async function () {
            const selectMonth = document.querySelector(".monthDatePicker")
            Array.from(selectMonth.children).map(child =>{
                child.remove()
            })

            if (inputs[i].checked) {
                const expoID = inputs[i].dataset.id
                let totalTickets = Number(ticketCount)

                const data = await getExpoPeriod(expoID, totalTickets)

                const monthData = Array.from(data).map(expo => {
                    const date = new Date(expo.PeriodStart)
                    const month = date.getMonth()
                    return month
                })
                
                function getUnique(monthData){
                    const uniqueArray = [];

                    for(let value of monthData){
                        if(uniqueArray.indexOf(value) === -1){
                            uniqueArray.push(value);
                        }
                    }
                    return uniqueArray;
                }

                const uniqueMonthArray = getUnique(monthData)
                

                uniqueMonthArray.sort((a, b) =>{
                    return a - b
                })

                const monthNames = { 
                    "1": "Januari",
                    "2": "Februari",
                    "3": "Maart",
                    "4": "April",
                    "5": "Mei",
                    "6": "Juni",
                    "7": "Juli",
                    "8": "Augustus",
                    "9": "September",
                    "10": "Oktober",
                    "11": "November",
                    "12": "December"
                }

                const getMonthName = uniqueMonthArray.map(month => {
                    return monthNames[month]
                })
                getMonthName.map(month =>{
                    const option = document.createElement('option')
                    option.textContent = month
                    option.value = month
                    selectMonth.appendChild(option)
                })
            }
        })
    }

    async function getExpoPeriod(expoID, totalTickets){
        let response = await fetch(`/getExpoPeriod/${expoID}/${totalTickets}`)
        let expoData = await response.json()
        return expoData
    }
})();

