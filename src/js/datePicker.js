(function () {

    function getUnique(data){
        const uniqueArray = [];

        for(let value of data){
            if(uniqueArray.indexOf(value) === -1){
                uniqueArray.push(value);
            }
        }
        return uniqueArray;
    }

    let data = []
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

                const dataToPush = await getExpoPeriod(expoID, totalTickets)
                data = []
                data.push(dataToPush)

                const monthData = data[0].map(expo => {
                    const date = new Date(expo.PeriodStart)
                    const month = date.getMonth()
                    return month
                })
                
                
                // function getUnique(monthData){
                //     const uniqueArray = [];

                //     for(let value of monthData){
                //         if(uniqueArray.indexOf(value) === -1){
                //             uniqueArray.push(value);
                //         }
                //     }
                //     return uniqueArray;
                // }

                const uniqueMonthArray = getUnique(monthData)
                

                uniqueMonthArray.sort((a, b) =>{
                    return a - b
                })

                const monthNames = { 
                    "0": "Januari",
                    "1": "Februari",
                    "2": "Maart",
                    "3": "April",
                    "4": "Mei",
                    "5": "Juni",
                    "6": "Juli",
                    "7": "Augustus",
                    "8": "September",
                    "9": "Oktober",
                    "10": "November",
                    "11": "December"
                }

                const getMonthName = uniqueMonthArray.map(month => {
                    return monthNames[month]
                })

                getMonthName.map(month =>{
                    const option = document.createElement('option')

                    let monthNumber
                    for (let [key, value] of Object.entries(monthNames)) {
                        if (value === month){
                            monthNumber = key
                        }
                    }
                    option.classList.add("optionMonth")
                    option.dataset.monthNumber = monthNumber
                    option.textContent = month
                    option.value = month
                    selectMonth.appendChild(option)
                })
            }
        })
    }

    const select = document.querySelector(".monthDatePicker")
    select.addEventListener('change', function(){

        const dayNames = { 
            "0": "Zondag",
            "1": "Maandag",
            "2": "Dinsdag",
            "3": "Woensdag",
            "4": "Donderdag",
            "5": "Vrijdag",
            "6": "Zaterdag",
        }

        const options = document.querySelectorAll(".optionMonth")
        const dayArray = []
        
        
        Array.from(options).map(option =>{
            if (option.selected){
                
                const monthNumber = Number(option.dataset.monthNumber)
                data[0].filter(expo =>{
                    const date = new Date(expo.PeriodStart)
                    const month = date.getMonth()
                    

                    if (month === monthNumber){
                        const day = new Date(expo.PeriodStart).getDay()
                        dayArray.push(day)
                    }
                })
            }
        })
        const uniqueDays = getUnique(dayArray)

        uniqueDays.sort((a, b) =>{
            return a - b
        })

        console.log(uniqueDays)

        const getDayNames = uniqueDays.map(day => {
            return dayNames[day]
        })

        getDayNames.map(day =>{
            const checkbox = document.createElement('input')
            
            const label = document.createElement('label')
            const checkboxContainer = document.querySelector(".checkboxDay")

            let dayNumber
            for (let [key, value] of Object.entries(dayNames)) {
                if (value === day){
                    dayNumber = key
                }
            }

            label.textContent = day
            label.htmlFor = day 
            
            checkbox.type = "checkbox"
            checkbox.classList.add("inputDay")
            checkbox.dataset.dayNumber = dayNumber
            checkbox.id = day
            checkbox.value = day

            checkboxContainer.appendChild(checkbox)
            checkboxContainer.appendChild(label)
        })

    })

    async function getExpoPeriod(expoID, totalTickets){
        let response = await fetch(`/getExpoPeriod/${expoID}/${totalTickets}`)
        let expoData = await response.json()
        return expoData
    }

})();

