(function () {
    const formThirdStep = document.querySelector(".step-three")
    let checkboxes
    let AvailableDaysRadioButtons
    let ChosenMonth
    if (formThirdStep) {

        function getUnique(data) {
            const uniqueArray = [];

            for (let value of data) {
                if (uniqueArray.indexOf(value) === -1) {
                    uniqueArray.push(value);
                }
            }
            return uniqueArray;
        }

        let data = []
        const inputs = document.querySelectorAll('.step-three .entree-options-container input[type="radio"]')
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].addEventListener('change', async function () {
                const checkboxContainer = document.querySelector(".checkboxDay")
                Array.from(checkboxContainer.children).map(child => {
                    child.remove()
                })
                const dayContainer = document.querySelector(".chooseDay")
                Array.from(dayContainer.children).map(child => {
                    child.remove()
                })
                const selectMonth = document.querySelector(".monthDatePicker")
                Array.from(selectMonth.children).map(child => {
                    child.remove()
                })
                const startTimeContainer = document.querySelector(".chooseTime")
                Array.from(startTimeContainer.children).map(child => {
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

                    const uniqueMonthArray = getUnique(monthData)

                    uniqueMonthArray.sort((a, b) => {
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

                    getMonthName.map(month => {
                        const option = document.createElement('option')

                        let monthNumber
                        for (let [key, value] of Object.entries(monthNames)) {
                            if (value === month) {
                                monthNumber = key
                            }
                        }
                        option.classList.add("optionMonth")
                        option.dataset.monthNumber = monthNumber
                        option.textContent = month
                        option.value = month
                        selectMonth.appendChild(option)
                    })
                    datePicker()
                }
            })
        }

        const select = document.querySelector(".monthDatePicker")
        select.addEventListener('change', datePicker)

        async function getExpoPeriod(expoID, totalTickets) {
            let response = await fetch(`/getExpoPeriod/${expoID}/${totalTickets}`)
            let expoData = await response.json()
            return expoData
        }

        function datePicker() {
            const dayContainer = document.querySelector(".chooseDay")
            Array.from(dayContainer.children).map(child => {
                child.remove()
            })
            const startTimeContainer = document.querySelector(".chooseTime")
            Array.from(startTimeContainer.children).map(child => {
                child.remove()
            })

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
            const filteredMonth = []
            Array.from(options).map(option => {
                if (option.selected) {
                    const monthNumber = Number(option.dataset.monthNumber)
                    ChosenMonth = monthNumber

                    data[0].filter(expo => {
                        const date = new Date(expo.PeriodStart)
                        const month = date.getMonth()
                        if (month === monthNumber) {
                            filteredMonth.push(expo)
                            const day = new Date(expo.PeriodStart).getDay()
                            dayArray.push(day)
                        }
                    })
                }
            })

            const uniqueDays = getUnique(dayArray)
            uniqueDays.sort((a, b) => {
                return a - b
            })

            const checkboxContainer = document.querySelector(".checkboxDay")
            Array.from(checkboxContainer.children).map(child => {
                child.remove()
            })

            const getDayNames = uniqueDays.map(day => {
                return dayNames[day]
            })

            getDayNames.map(day => {
                const checkbox = document.createElement('input')

                const label = document.createElement('label')

                let dayNumber
                for (let [key, value] of Object.entries(dayNames)) {
                    if (value === day) {
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
            checkboxes = document.querySelectorAll(".inputDay")

            let filteredDays = []

            Array.from(checkboxes).map(checkbox => {

                checkbox.addEventListener('change', async function () {
                    const startTimeContainer = document.querySelector(".chooseTime")
                    Array.from(startTimeContainer.children).map(child => {
                        child.remove()
                    })

                    if (checkbox.checked) {
                        const dayNumber = Number(checkbox.dataset.dayNumber)

                        filteredMonth.filter(expo => {
                            const date = new Date(expo.PeriodStart)
                            const day = date.getDay()
                            if (day === dayNumber) {
                                filteredDays.push(expo)
                            }
                        })

                    } else if (!checkbox.checked) {
                        const dayNumber = Number(checkbox.dataset.dayNumber)
                        filteredDays = filteredDays.filter(expo => {
                            const date = new Date(expo.PeriodStart)
                            const day = date.getDay()

                            if (day !== dayNumber) {
                                return expo
                            }
                        })
                    }
                    let daysArray = []
                    let dataToCheck = []
                    if (filteredDays.length == 0) {
                        const dayContainer = document.querySelector(".chooseDay")
                        Array.from(dayContainer.children).map(child => {
                            child.remove()
                        })
                    }
                    filteredDays = filteredDays.filter(expo => {
                        let date = new Date(expo.PeriodStart)
                        const dayDate = date.getDate()

                        // console.log(date)
                        date = String(date).split(" ")
                        if (date[0] == "Sun") {
                            date = "Zondag"
                        } else if (date[0] == "Mon") {
                            date = "Maandag"
                        } else if (date[0] == "Tue") {
                            date = "Dinsdag"
                        } else if (date[0] == "Wed") {
                            date = "Woensdag"
                        } else if (date[0] == "Thu") {
                            date = "Donderdag"
                        } else if (date[0] == "Fri") {
                            date = "Vrijdag"
                        } else if (date[0] == "Sat") {
                            date = "Zaterdag"
                        }

                        const day = {
                            name: date,
                            date: dayDate
                        }

                        if (!dataToCheck.includes(dayDate)) {
                            dataToCheck.push(dayDate)
                            daysArray.push(day)
                        }

                        const dayContainer = document.querySelector(".chooseDay")
                        Array.from(dayContainer.children).map(child => {
                            child.remove()
                        })

                        daysArray.map(day => {
                            const radiobutton = document.createElement("input")
                            const label = document.createElement("label")


                            radiobutton.type = "radio"
                            radiobutton.value = day.date
                            radiobutton.dataset.dayDate = day.date
                            radiobutton.name = "dayChoice"
                            radiobutton.id = day.date
                            radiobutton.classList.add("AvailableDaysRadioButtons")

                            label.htmlFor = day.date
                            label.textContent = `${day.name} ${day.date}`

                            dayContainer.appendChild(radiobutton)
                            dayContainer.appendChild(label)
                        })
                        AvailableDaysRadioButtons = document.querySelectorAll(".AvailableDaysRadioButtons")

                        // console.log(dayDate)
                        return expo
                    })
                    console.log("filtered Days: ", filteredDays)

                    Array.from(AvailableDaysRadioButtons).map(radioBtn => {
                        radioBtn.addEventListener("change", function () {
                            const startTimeContainer = document.querySelector(".chooseTime")
                            Array.from(startTimeContainer.children).map(child => {
                                child.remove()
                            })
                            let startTimeArray = []
                            if (radioBtn.checked) {
                                const dateOfChosenDay = Number(radioBtn.dataset.dayDate)
                                console.dir(radioBtn)
                                filteredDays.filter(expo => {
                                    //console.log(expo)
                                    const date = new Date(expo.PeriodStart)
                                    const day = date.getDate()
                                    console.log(day, dateOfChosenDay)

                                    if (day === dateOfChosenDay) {
                                        startTimeArray.push(expo)
                                    }
                                })
                            }
                            console.log(startTimeArray)
                            startTimeArray.map(expo => {
                                const radioStartTime = document.createElement('input')
                                const label = document.createElement('label')
                                label.textContent = expo.PeriodStart
                                label.htmlFor = expo.PeriodStart

                                radioStartTime.dataset.startTime = expo.PeriodStart
                                radioStartTime.type = "radio"
                                radioStartTime.value = expo.PeriodStart
                                radioStartTime.id = expo.PeriodStart

                                startTimeContainer.appendChild(radioStartTime)
                                startTimeContainer.appendChild(label)
                            })
                        })
                    })
                })
            })

        }
    }
})();