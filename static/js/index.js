"use strict";

(function () {
  var form = document.querySelector('[data-formname="personalInfo"]');

  if (form) {
    var validateForm = function validateForm() {
      var inputs = form.querySelectorAll("input[required]");
      var checkdInputs = [];
      var options = form.querySelectorAll("option");
      Array.from(inputs).map(function (input) {
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
    };

    var submit = form.querySelector('input[type="submit"]');
    submit.disabled = true;
    window.addEventListener("load", validateForm);
    form.addEventListener("change", validateForm);
  }
})();
"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

(function () {
  var formThirdStep = document.querySelector(".step-three");
  var javascript = document.querySelector("input[name=javascript]");

  if (javascript) {
    javascript.value = 1;
  }

  var checkboxes;
  var availableDaysRadioButtons;
  var ChosenMonth;

  if (formThirdStep) {
    (function () {
      var scrollIntoNext = function scrollIntoNext(element) {
        var fieldset = element.closest("fieldset").nextElementSibling;
        fieldset.scrollIntoView({
          behavior: "smooth"
        });
      };

      var checkForm = function checkForm(i) {
        removeChilds(".checkboxDay");
        removeChilds(".chooseDay");
        removeChilds(".monthDatePicker");
        removeChilds(".choose-day-period");
        removeChilds(".midday-container");
        removeChilds(".morning-container");

        if (inputs[i].checked) {
          var expoID = inputs[i].dataset.id;
          var totalTickets = Number(ticketCount);

          if (outputDate) {
            outputDate.parentElement.remove();
          }

          var expoPrice = inputs[i].dataset.priceCent;
          var expoPriceType = inputs[i].dataset.priceType;

          if (expoPriceType == "per ticket") {
            expoPrice = expoPrice * totalTickets;
          }

          var totalPrice = Number(totalPriceContainer.dataset.priceRaw);
          totalPrice = totalPrice + Number(expoPrice);
          totalPriceContainer.value = "Totale prijs: \u20AC".concat(parseFloat(totalPrice / 100).toFixed(2));
          fetch("/getExpoPeriod/".concat(expoID, "/").concat(totalTickets)).then(function (response) {
            return response.json();
          }).then(function (expoData) {
            if (expoData.length == 0) {
              expoError();
            } else {
              removeError();
            }

            return expoData;
          }).then(function (dataToPush) {
            data = [];
            data.push(dataToPush);
            var monthData = data[0].map(function (expo) {
              var date = new Date(expo.PeriodStart);
              var month = date.getMonth();
              return month;
            });
            var uniqueMonthArray = getUnique(monthData);
            uniqueMonthArray.sort(function (a, b) {
              return a - b;
            });
            var monthNames = {
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
            };
            var getMonthNames = uniqueMonthArray.map(function (month) {
              return monthNames[month];
            });
            var legend = document.querySelector(".legend-month");

            if (getMonthNames.length == 1) {
              legend.setAttribute("aria-label", "In welke maand wil je gaan? Er is ".concat(getMonthNames.length, " optie beschikbaar"));
            } else {
              legend.setAttribute("aria-label", "In welke maand wil je gaan? Er zijn ".concat(getMonthNames.length, " opties beschikbaar"));
            }

            getMonthNames.map(function (month) {
              var option = document.createElement("option");
              var monthNumber;

              for (var _i = 0, _Object$entries = Object.entries(monthNames); _i < _Object$entries.length; _i++) {
                var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
                    key = _Object$entries$_i[0],
                    value = _Object$entries$_i[1];

                if (value === month) {
                  monthNumber = key;
                }
              }

              option.classList.add("optionMonth");
              option.dataset.monthNumber = monthNumber;
              option.textContent = month;
              option.value = month;
              selectMonth.appendChild(option);
            });
            datePicker();
          });
        }
      };

      var expoError = function expoError() {
        validationError.classList.remove("hidden");
        validationError.textContent = "Er is geen rondleiding beschikbaar voor uw groepsgrootte";
        validationError.scrollIntoView();
      };

      var removeError = function removeError() {
        validationError.classList.add("hidden");
      };

      // function getExpoPeriod(expoID, totalTickets) {
      //   fetch(`/getExpoPeriod/${expoID}/${totalTickets}`)
      //     .then((response) => response.json())
      //     .then((expoData) => {
      //       if (expoData.length == 0) {
      //         expoError();
      //       } else {
      //         removeError();
      //       }
      //       return expoData;
      //     });
      // }
      var datePicker = function datePicker() {
        var options = document.querySelectorAll(".optionMonth");
        var checkboxContainer = document.querySelector(".checkboxDay");
        removeChilds(".chooseDay");
        removeChilds(".choose-day-period");
        removeChilds(".midday-container");
        removeChilds(".morning-container");
        var dayNames = {
          "0": "Zondag",
          "1": "Maandag",
          "2": "Dinsdag",
          "3": "Woensdag",
          "4": "Donderdag",
          "5": "Vrijdag",
          "6": "Zaterdag"
        };
        var dayArray = [];
        var filteredMonth = [];
        Array.from(options).map(function (option) {
          if (option.selected) {
            var monthNumber = Number(option.dataset.monthNumber);
            ChosenMonth = monthNumber;
            data[0].filter(function (expo) {
              var date = new Date(expo.PeriodStart);
              var month = date.getMonth();

              if (month === monthNumber) {
                filteredMonth.push(expo);
                var day = new Date(expo.PeriodStart).getDay();
                dayArray.push(day);
              }
            });
          }
        });
        var uniqueDays = getUnique(dayArray);
        uniqueDays.sort(function (a, b) {
          return a - b;
        });
        removeChilds(".checkboxDay");
        var getDayNames = uniqueDays.map(function (day) {
          return dayNames[day];
        });
        var legend = document.querySelector(".legend-day");

        if (getDayNames.length == 1) {
          legend.setAttribute("aria-label", "Op welke dag wil je naar het museum? Er is ".concat(getDayNames.length, " optie beschikbaar"));
        } else {
          legend.setAttribute("aria-label", "Op welke dag wil je naar het museum? Er zijn ".concat(getDayNames.length, " opties beschikbaar"));
        }

        getDayNames.map(function (day) {
          var checkbox = document.createElement("input");
          var span = document.createElement("span");
          var label = document.createElement("label");
          var dayNumber;

          for (var _i2 = 0, _Object$entries2 = Object.entries(dayNames); _i2 < _Object$entries2.length; _i2++) {
            var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
                key = _Object$entries2$_i[0],
                value = _Object$entries2$_i[1];

            if (value === day) {
              dayNumber = key;
            }
          }

          label.textContent = day;
          label.htmlFor = day;
          checkbox.type = "checkbox";
          checkbox.classList.add("inputDay");
          checkbox.dataset.dayNumber = dayNumber;
          checkbox.id = day;
          checkbox.value = day;
          checkbox.name = "dayChoice[]";

          if (day == "Zondag") {
            span.classList.add("zondag");
          }

          span.appendChild(checkbox);
          span.appendChild(label);
          checkboxContainer.appendChild(span);
        });
        checkboxes = document.querySelectorAll(".inputDay");
        var filteredDays = [];
        Array.from(checkboxes).map(function (checkbox) {
          checkbox.addEventListener("change", function () {
            return scrollIntoNext(checkbox);
          });
          checkbox.addEventListener("change", function () {
            var dayContainer = document.querySelector(".chooseDay");
            removeChilds(".choose-day-period");
            removeChilds(".midday-container");
            removeChilds(".morning-container");

            if (checkbox.checked) {
              var dayNumber = Number(checkbox.dataset.dayNumber);
              filteredMonth.filter(function (expo) {
                var date = new Date(expo.PeriodStart);
                var day = date.getDay();

                if (day === dayNumber) {
                  filteredDays.push(expo);
                }
              });
            } else if (!checkbox.checked) {
              var _dayNumber = Number(checkbox.dataset.dayNumber);

              filteredDays = filteredDays.filter(function (expo) {
                var date = new Date(expo.PeriodStart);
                var day = date.getDay();

                if (day !== _dayNumber) {
                  return expo;
                }
              });
            }

            var daysArray = [];
            var dataToCheck = [];

            if (filteredDays.length == 0) {
              removeChilds(".chooseDay");
            }

            filteredDays = filteredDays.filter(function (expo) {
              var date = new Date(expo.PeriodStart);
              var dayDate = date.getDate();
              date = String(date).split(" ");

              if (date[0] == "Sun") {
                date = "Zondag";
              } else if (date[0] == "Mon") {
                date = "Maandag";
              } else if (date[0] == "Tue") {
                date = "Dinsdag";
              } else if (date[0] == "Wed") {
                date = "Woensdag";
              } else if (date[0] == "Thu") {
                date = "Donderdag";
              } else if (date[0] == "Fri") {
                date = "Vrijdag";
              } else if (date[0] == "Sat") {
                date = "Zaterdag";
              }

              var day = {
                name: date,
                date: dayDate
              };

              if (!dataToCheck.includes(dayDate)) {
                dataToCheck.push(dayDate);
                daysArray.push(day);
              }

              var legend = document.querySelector(".legend-date");

              if (daysArray.length == 1) {
                legend.setAttribute("aria-label", "Op welke datum wil je komen? Kies uit ".concat(daysArray.length, " beschikbare optie"));
              } else {
                legend.setAttribute("aria-label", "Op welke datum wil je komen? Kies uit ".concat(daysArray.length, " beschikbare opties met de pijltjes toetsen. "));
              }

              removeChilds(".chooseDay");

              function compare(a, b) {
                var comparison = 0;

                if (a.date > b.date) {
                  comparison = 1;
                } else if (a.date < b.date) {
                  comparison = -1;
                }

                return comparison;
              }

              daysArray.sort(compare);
              daysArray.map(function (day) {
                var radiobutton = document.createElement("input");
                var span = document.createElement("span");
                var label = document.createElement("label");
                radiobutton.type = "radio";
                radiobutton.value = day.date;
                radiobutton.dataset.dayDate = day.date;
                radiobutton.name = "dayChoice";
                radiobutton.id = day.date;
                radiobutton.classList.add("AvailableDaysRadioButtons");
                label.htmlFor = day.date;
                label.textContent = "".concat(day.name, " ").concat(day.date);
                span.appendChild(radiobutton);
                span.appendChild(label);
                dayContainer.appendChild(span);
              });
              availableDaysRadioButtons = document.querySelectorAll(".AvailableDaysRadioButtons");
              return expo;
            });
            Array.from(availableDaysRadioButtons).map(function (radioBtn) {
              radioBtn.addEventListener("change", function () {
                return scrollIntoNext(radioBtn);
              });
              radioBtn.addEventListener("change", function () {
                var middayContainer = document.querySelector(".midday-container");
                var morningContainer = document.querySelector(".morning-container");
                removeChilds(".choose-day-period");
                removeChilds(".midday-container");
                removeChilds(".morning-container");
                var startMorning = [];
                var startMidday = [];

                if (radioBtn.checked) {
                  var dateOfChosenDay = Number(radioBtn.dataset.dayDate);
                  filteredDays.filter(function (expo) {
                    var date = new Date(expo.PeriodStart);
                    var day = date.getDate();
                    var hour = date.getHours();

                    if (day === dateOfChosenDay) {
                      if (hour <= 12) {
                        startMorning.push(expo);
                      } else {
                        startMidday.push(expo);
                      }
                    }
                  });

                  if (startMorning.length == 0 || startMidday.length == 0) {
                    var _legend = document.querySelector(".legend-day-period");

                    _legend.setAttribute("aria-label", "Wanneer op de dag wil je komen? Kies uit 1 beschikbare optie");
                  } else {
                    legend.setAttribute("aria-label", "Wanneer op de dag wil je komen? Kies uit 2 beschikbare opties.");
                  }

                  if (!startMorning.length == 0) {
                    var checkBoxDayPeriod = document.createElement("input");
                    var label = document.createElement("label");
                    var span = document.createElement("span");
                    checkBoxDayPeriod.type = "checkbox";
                    checkBoxDayPeriod.value = "morning";
                    checkBoxDayPeriod.id = "morningCheck";
                    checkBoxDayPeriod.name = "dayPeriodChoice";
                    label.textContent = "ochtend";
                    label.htmlFor = "morningCheck";
                    span.appendChild(checkBoxDayPeriod);
                    span.appendChild(label);
                    dayPeriodContainer.appendChild(span);
                    checkBoxDayPeriod.addEventListener("change", function () {
                      return scrollIntoNext(checkBoxDayPeriod);
                    });
                    checkBoxDayPeriod.addEventListener("change", function () {
                      if (checkBoxDayPeriod.checked) {
                        showAvailableStartTime(startMorning, morningContainer);
                      } else if (!checkBoxDayPeriod.checked) {
                        Array.from(morningContainer.children).map(function (child) {
                          child.remove();
                        });
                      }
                    });
                  }

                  if (!startMidday.length == 0) {
                    var _checkBoxDayPeriod = document.createElement("input");

                    var _label = document.createElement("label");

                    var _span = document.createElement("span");

                    _checkBoxDayPeriod.type = "checkbox";
                    _checkBoxDayPeriod.value = "midday";
                    _checkBoxDayPeriod.id = "middayCheck";
                    _checkBoxDayPeriod.name = "dayPeriodChoice";
                    _label.textContent = "middag";
                    _label.htmlFor = "middayCheck";

                    _span.appendChild(_checkBoxDayPeriod);

                    _span.appendChild(_label);

                    dayPeriodContainer.appendChild(_span);

                    _checkBoxDayPeriod.addEventListener("change", function () {
                      if (_checkBoxDayPeriod.checked) {
                        showAvailableStartTime(startMidday, middayContainer);
                      } else if (!_checkBoxDayPeriod.checked) {
                        removeChilds(".midday-container");
                      }
                    });
                  }
                }

                function showAvailableStartTime(array, container) {
                  if (array.length != 0) {
                    var _legend2 = document.querySelector(".legend-time-stamp");

                    if (array.length == 1) {
                      _legend2.setAttribute("aria-label", "Hoelaat wil je komen? Kies uit ".concat(array.length, " beschikbare optie"));
                    } else {
                      _legend2.setAttribute("aria-label", "Hoelaat wil je komen? Kies uit ".concat(array.length, " beschikbare opties met de pijltjes toetsen."));
                    }

                    array.map(function (expo) {
                      var radioStartTime = document.createElement("input");
                      var label = document.createElement("label");
                      var span = document.createElement("span");
                      var time = document.createElement("time");
                      var timeStamp = new Date(expo.PeriodStart).toLocaleTimeString().split(":");
                      time.textContent = timeStamp[0] + ":" + timeStamp[1];
                      time.dateTime = timeStamp[0] + ":" + timeStamp[1];
                      label.htmlFor = expo.PeriodStart;
                      radioStartTime.dataset.startTime = expo.PeriodStart;
                      radioStartTime.type = "radio";
                      radioStartTime.value = "".concat(expo.PeriodStart, ",").concat(expo.ExpositionPeriodId);
                      radioStartTime.id = expo.PeriodStart;
                      radioStartTime.name = "startTimeChoice";
                      radioStartTime.addEventListener("change", function () {
                        submit.disabled = false;
                      });
                      label.appendChild(time);
                      span.appendChild(radioStartTime);
                      span.appendChild(label);
                      container.appendChild(span);
                    });
                  } else {
                    console.log("er zit niks in");
                  }
                }
              });
            });
          });
        });
      };

      var removeChilds = function removeChilds(className) {
        submit.disabled = true;
        var container = document.querySelector(className);
        Array.from(container.children).map(function (child) {
          child.remove();
        });
      };

      var getUnique = function getUnique(data) {
        var uniqueArray = [];

        var _iterator = _createForOfIteratorHelper(data),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var value = _step.value;

            if (uniqueArray.indexOf(value) === -1) {
              uniqueArray.push(value);
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        return uniqueArray;
      };

      var outputDate = document.querySelector("#start-time-choice");
      var totalPriceContainer = document.querySelector("#total-first-step");
      var submit = formThirdStep.querySelector('input[type="submit"]');
      var validationError = document.querySelector(".field-validation-error");
      var dayPeriodContainer = document.querySelector(".choose-day-period");
      var inputs = document.querySelectorAll('.step-three .entree-options-container input[type="radio"]');
      var selectMonth = document.querySelector(".monthDatePicker");
      var select = document.querySelector(".monthDatePicker");
      var data = [];

      var _loop = function _loop(i) {
        inputs[i].addEventListener("change", function () {
          return checkForm(i);
        });
        inputs[i].addEventListener("change", function () {
          return scrollIntoNext(inputs[i]);
        });
        window.addEventListener("load", function () {
          return checkForm(i);
        });
      };

      for (var i = 0; i < inputs.length; i++) {
        _loop(i);
      }

      select.addEventListener("change", datePicker);
      select.addEventListener("change", function () {
        return scrollIntoNext(select);
      });
    })();
  }
})();
"use strict";

(function () {
  var inputs = document.querySelectorAll('.step-three .entree-options-container input[type="radio"]');

  var _loop = function _loop(i) {
    inputs[i].addEventListener('change', function () {
      showOptionText(i);
    });
    window.addEventListener('load', function () {
      showOptionText(i);
    });
  };

  for (var i = 0; i < inputs.length; i++) {
    _loop(i);
  }

  function showOptionText(i) {
    if (inputs[i].checked) {
      var allP = document.querySelectorAll('.step-three .entree-options-container p');
      Array.from(allP).forEach(function (element) {
        element.classList.remove("on");
      });
      var p = document.querySelector(".expositionContents".concat(i));
      p.classList.add("on");
    }
  }
})();
"use strict";

(function () {
  var firstForm = document.querySelector(".form-first-step");

  if (firstForm) {
    var calcTicketCount = function calcTicketCount() {
      var ticketCount;
      var formData = new FormData(firstForm);
      var data = {};
      var subTotal = [];
      var totalPrice;
      var selectedTickets = [];

      if (firstForm.dataset.formname === "onlyTicketChoice") {
        ticketCount = 1;
        data = {
          ticketChoice: formData.get("ticketChoice")
        };
        var radioButtons = firstForm.querySelectorAll("input[type=radio]");
        Array.from(radioButtons).map(function (radio) {
          if (radio.checked) {
            totalPrice = Number(radio.dataset.articlePrice);
          }
        });
      } else {
        ticketCount = 0; // for (let pair of formData.entries()) {
        //   data[pair[0]] = pair[1]
        // }

        var selects = firstForm.querySelectorAll("select");

        if (!selects.length == 0) {
          Array.from(selects).map(function (select) {
            var options = select.querySelectorAll("option");
            var value = Array.from(options).map(function (option) {
              if (option.selected) {
                ticketCount = Number(option.value) + ticketCount;

                if (option.value > 0) {
                  selectedTickets.push({
                    "name": option.dataset.name,
                    "value": option.value
                  });
                }

                subTotal.push(Number(option.dataset.price) * Number(option.value));
              }
            });
            return value;
          });
          totalPrice = subTotal.reduce(function (current, all) {
            return all = current + all;
          });
        }
      }

      if (ticketCount == 0 || ticketCount > maxAmountOfArticles) {
        submit.disabled = true;
      } else {
        submit.disabled = false;
      }

      if (validationError) {
        if (ticketCount > maxAmountOfArticles) {
          validationError.classList.remove("hidden");
        } else {
          validationError.classList.add("hidden");
        }
      }

      var ticketSpan = document.createElement('span');
      var totalPriceSpan = document.createElement('span');
      var listOfItems = [];
      selectedTickets.map(function (ticket) {
        var ticketText = document.createElement('span');
        ticketText.textContent = "".concat(ticket.name, " ticket, aantal ").concat(ticket.value, ". ");
        ticketSpan.appendChild(ticketText);
        listOfItems.push(" ".concat(ticket.name, " aantal ").concat(ticket.value, "."));
      });
      if (listOfItems.length == 0) listOfItems.push(' leeg');
      totalPriceSpan.textContent = 'en ';
      totalTicketsPrice.value = "Totale prijs: \u20AC".concat(parseFloat(totalPrice / 100).toFixed(2));
      totalPriceToSend.value = "\u20AC".concat(parseFloat(totalPrice / 100).toFixed(2));
      totalTickets.value = ticketCount;
      numberTickets.textContent = "Totaal aantal tickets: ".concat(ticketCount);
      numberTickets.insertBefore(ticketSpan, numberTickets.childNodes[0]);
      totalTicketsPrice.insertBefore(totalPriceSpan, totalTicketsPrice.childNodes[0]);
      legendLabel.setAttribute('aria-label', "Tickets voor het hele museum. 6 tickettypes beschikbaar. De huidige selectie is".concat(listOfItems, ". Totaal aantal tickets: ").concat(ticketCount, ", Totale prijs: \u20AC").concat(parseFloat(totalPrice / 100).toFixed(2), "."));
    };

    var legendLabel = document.querySelector("#legendLabel");
    var validationError = document.querySelector(".field-validation-error");
    var totalTickets = document.querySelector(".totalTickets");
    var numberTickets = document.querySelector("#aantal-first-step");
    var totalTicketsPrice = document.querySelector("#total-first-step");
    var totalPriceToSend = document.querySelector(".total-price");
    var submit = firstForm.querySelector('input[type="submit"]');
    var countModule = document.querySelectorAll('.ticket-amount-container');
    Array.from(countModule).map(function (module) {
      var removeButton = module.querySelector('.remove-ticket');
      var addButton = module.querySelector('.add-ticket');
      var ticketSelect = module.querySelector('select');
      removeButton.addEventListener('click', function () {
        if (ticketSelect.selectedIndex === 0) {
          ticketSelect.selectedIndex = 0;
        } else {
          ticketSelect.selectedIndex = ticketSelect.selectedIndex - 1;
        }

        calcTicketCount();
      });
      addButton.addEventListener('click', function () {
        if (ticketSelect.selectedIndex === Number(maxAmountOfArticles)) {
          ticketSelect.selectedIndex = Number(maxAmountOfArticles);
        } else {
          ticketSelect.selectedIndex = ticketSelect.selectedIndex + 1;
        }

        calcTicketCount();
      });
    });
    firstForm.addEventListener("change", calcTicketCount);
    window.addEventListener("load", calcTicketCount);
  }
})();
"use strict";

(function () {
  // Code van:
  // https://stackoverflow.com/questions/34672091/center-focused-element-of-webpages-vertically
  // Het is wel geupdate omdat het verouderde code was
  document.documentOffsetTop = function () {
    return this.offsetTop + (this.offsetParent ? this.offsetParent.documentOffsetTop() : 0);
  };

  document.scrollIntoViewCenter = function () {
    window.scrollTo(0, this.documentOffsetTop() - window.innerHeight / 2);
  };

  window.addEventListener("keyup", function (e) {
    focusCenter(e);
  });

  function focusCenter(e) {
    if (e.keyCode == 9) {
      document.activeElement.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  }
})();
"use strict";

(function () {
  var linkFamily = document.querySelector(".family-flow-link");
  var linkDate = document.querySelector(".date-flow-link");
  var linkGroup = document.querySelector(".group-flow-link");
  var linkOnly = document.querySelector(".only-flow-link");

  if (linkFamily) {
    linkFamily.href = "/tweede-stap?groupChoice=family&javascript=1";
    linkDate.href = "/tweede-stap?groupChoice=date&javascript=1";
    linkGroup.href = "/tweede-stap?groupChoice=small-group&javascript=1";
    linkOnly.href = "/tweede-stap?groupChoice=only&javascript=1";
  }

  var currentPage = document.querySelector('[aria-current="page"]');
  currentPage.scrollIntoView();
})();
"use strict";

(function () {
  var forthForm = document.querySelector(".step-two");

  if (forthForm) {
    var getSelected = function getSelected(select) {
      var selectPrice = select.dataset.price;
      var ticketsTotal = select.selectedIndex;
      return calcTotalPriceExtra(selectPrice, ticketsTotal);
    };

    var calcTotalPriceExtra = function calcTotalPriceExtra(a, b) {
      var totalPriceExtra = Number(a) * Number(b);
      var totalPriceCalculated = Number(totalPrice.dataset.priceRaw) + Number(totalPriceExtra);
      totalPrice.dataset.priceRawExtra = Number(totalPriceCalculated);
      totalPrice.value = "Totale prijs: \u20AC".concat(parseFloat(totalPriceCalculated / 100).toFixed(2));
      var totalPriceUpdate;
      Array.from(donationInputs).map(function (input) {
        if (input.checked) {
          var value = input.value;
          totalPriceUpdate = Number(totalPriceCalculated) + Number(value);
        }
      });
      return totalPriceUpdate;
    };

    var calcDonation = function calcDonation(a) {
      var ticketSelects = document.querySelectorAll("select");
      Array.from(ticketSelects).map(function (select) {
        var totalPriceCalculated = Number(getSelected(select));
        totalPrice.value = "Totale prijs: \u20AC".concat(parseFloat(totalPriceCalculated / 100).toFixed(2));
      });
    };

    var countModule = document.querySelectorAll(".ticket-amount-container");
    var totalPrice = document.querySelector("#total-first-step");
    Array.from(countModule).map(function (module) {
      var removeButton = module.querySelector(".remove-ticket");
      var addButton = module.querySelector(".add-ticket");
      var ticketSelect = module.querySelector("select");
      window.addEventListener("load", function () {
        getSelected(ticketSelect);
      });
      removeButton.addEventListener("click", function () {
        if (ticketSelect.selectedIndex === 0) {
          ticketSelect.selectedIndex = 0;
        } else {
          ticketSelect.selectedIndex = ticketSelect.selectedIndex - 1;
        }

        getSelected(ticketSelect);
      });
      addButton.addEventListener("click", function () {
        if (ticketSelect.selectedIndex === Number(ticketCount)) {
          ticketSelect.selectedIndex = Number(ticketCount);
        } else {
          ticketSelect.selectedIndex = ticketSelect.selectedIndex + 1;
        }

        getSelected(ticketSelect);
      });
    });
    var ticketSelects = document.querySelectorAll("select");
    Array.from(ticketSelects).map(function (select) {
      select.addEventListener("change", function () {
        getSelected(select);
      });
    });
    var donationInputs = document.querySelectorAll('input[name="Doneer"]');
    Array.from(donationInputs).map(function (input) {
      input.addEventListener("change", function () {
        if (input.checked) {
          var value = input.value;
          calcDonation(value);
        }
      });
      window.addEventListener("load", function () {
        if (input.checked) {
          var value = input.value;
          calcDonation(value);
        }
      });
    });
  }
})();
"use strict";

(function () {})();
"use strict";

(function () {
  window.addEventListener("keypress", function (e) {
    enter(e);
  });

  function enter(e) {
    if (e.key == "Enter") {
      var focus = document.activeElement;

      if (focus.attributes.type.nodeValue == "checkbox" || "radio") {
        e.preventDefault();
        focus.click();
      }
    }
  }
})();
"use strict";

(function () {
  var firstForm = document.querySelector(".form-first-step");

  if (firstForm) {
    var changeBackgroudnTickets = function changeBackgroudnTickets(select) {
      var options = select.querySelectorAll("option");
      Array.from(options).map(function (option) {
        if (option.selected) {
          var div = option.parentNode.parentNode.parentNode.firstElementChild;

          if (Number(option.value) <= 1) {
            div.classList.remove("two-tickets");
            div.classList.remove("three-tickets");
            div.classList.remove("more-tickets");
          } else if (Number(option.value) == 2) {
            div.classList.add("two-tickets");
            div.classList.remove("three-tickets");
            div.classList.remove("more-tickets");
          } else if (Number(option.value) == 3) {
            div.classList.remove("two-tickets");
            div.classList.add("three-tickets");
            div.classList.remove("more-tickets");
          } else {
            div.classList.remove("two-tickets");
            div.classList.remove("three-tickets");
            div.classList.add("more-tickets");
          }
        }
      });
    };

    var selects = firstForm.querySelectorAll('select');
    Array.from(selects).map(function (select) {
      changeBackgroudnTickets(select);
      select.addEventListener("change", function () {
        changeBackgroudnTickets(select);
      });
    });
    var countModule = document.querySelectorAll('.ticket-amount-container');
    Array.from(countModule).map(function (module) {
      var removeButton = module.querySelector('.remove-ticket');
      var addButton = module.querySelector('.add-ticket');
      removeButton.addEventListener('click', function () {
        var select = removeButton.nextElementSibling;
        changeBackgroudnTickets(select);
      });
      addButton.addEventListener('click', function () {
        var select = addButton.previousElementSibling;
        changeBackgroudnTickets(select);
      });
    });
  }
})();