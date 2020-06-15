"use strict";

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.map");

require("core-js/modules/es.string.iterator");

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

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.array.sort");

require("core-js/modules/es.number.constructor");

require("core-js/modules/es.number.to-fixed");

require("core-js/modules/es.object.entries");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.includes");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.split");

require("core-js/modules/web.dom-collections.iterator");

require("regenerator-runtime/runtime");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

(function () {
  var formThirdStep = document.querySelector(".step-three");
  var javascript = document.querySelector("input[name=javascript]");

  if (javascript) {
    javascript.value = 1;
  }

  var checkboxes;
  var AvailableDaysRadioButtons;
  var ChosenMonth;

  if (formThirdStep) {
    (function () {
      var checkForm = /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(i) {
          var expoID, totalTickets, expoPrice, expoPriceType, totalPrice, dataToPush, monthData, uniqueMonthArray, monthNames, getMonthNames, legend;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (outputDate) {
                    outputDate.parentElement.remove();
                  }

                  removeChilds(".checkboxDay");
                  removeChilds(".chooseDay");
                  removeChilds(".monthDatePicker");
                  removeChilds(".choose-day-period");
                  removeChilds(".midday-container");
                  removeChilds(".morning-container");

                  if (!inputs[i].checked) {
                    _context.next = 32;
                    break;
                  }

                  expoID = inputs[i].dataset.id;
                  totalTickets = Number(ticketCount);
                  expoPrice = inputs[i].dataset.priceCent;
                  expoPriceType = inputs[i].dataset.priceType;
                  console.log(expoPrice);

                  if (expoPriceType == "per ticket") {
                    expoPrice = expoPrice * totalTickets;
                    console.log(expoPrice);
                  }

                  totalPrice = Number(totalPriceContainer.dataset.priceRaw);
                  totalPrice = totalPrice + Number(expoPrice);
                  console.log(totalPrice);
                  totalPriceContainer.value = "Totale prijs: \u20AC".concat(parseFloat(totalPrice / 100).toFixed(2));
                  _context.next = 20;
                  return getExpoPeriod(expoID, totalTickets);

                case 20:
                  dataToPush = _context.sent;
                  data = [];
                  data.push(dataToPush);
                  monthData = data[0].map(function (expo) {
                    var date = new Date(expo.PeriodStart);
                    var month = date.getMonth();
                    return month;
                  });
                  uniqueMonthArray = getUnique(monthData);
                  uniqueMonthArray.sort(function (a, b) {
                    return a - b;
                  });
                  monthNames = {
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
                  getMonthNames = uniqueMonthArray.map(function (month) {
                    return monthNames[month];
                  });
                  legend = document.querySelector(".legend-month");

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

                case 32:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function checkForm(_x) {
          return _ref.apply(this, arguments);
        };
      }();

      var expoError = function expoError() {
        validationError.classList.remove("hidden");
        validationError.textContent = "Er is geen rondleiding beschikbaar voor uw groepsgrootte";
        validationError.scrollIntoView();
      };

      var removeError = function removeError() {
        validationError.classList.add("hidden");
      };

      var getExpoPeriod = /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(expoID, totalTickets) {
          var response, expoData;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return fetch("/getExpoPeriod/".concat(expoID, "/").concat(totalTickets));

                case 2:
                  response = _context2.sent;
                  _context2.next = 5;
                  return response.json();

                case 5:
                  expoData = _context2.sent;

                  if (expoData.length == 0) {
                    expoError();
                  } else {
                    removeError();
                  }

                  return _context2.abrupt("return", expoData);

                case 8:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function getExpoPeriod(_x2, _x3) {
          return _ref2.apply(this, arguments);
        };
      }();

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
          checkbox.addEventListener("change", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
            var dayContainer, dayNumber, _dayNumber, daysArray, dataToCheck;

            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    dayContainer = document.querySelector(".chooseDay");
                    removeChilds(".choose-day-period");
                    removeChilds(".midday-container");
                    removeChilds(".morning-container");

                    if (checkbox.checked) {
                      dayNumber = Number(checkbox.dataset.dayNumber);
                      filteredMonth.filter(function (expo) {
                        var date = new Date(expo.PeriodStart);
                        var day = date.getDay();

                        if (day === dayNumber) {
                          filteredDays.push(expo);
                        }
                      });
                    } else if (!checkbox.checked) {
                      _dayNumber = Number(checkbox.dataset.dayNumber);
                      filteredDays = filteredDays.filter(function (expo) {
                        var date = new Date(expo.PeriodStart);
                        var day = date.getDay();

                        if (day !== _dayNumber) {
                          return expo;
                        }
                      });
                    }

                    daysArray = [];
                    dataToCheck = [];

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

                  case 10:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3);
          })));
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

      var outputDate = document.querySelector('#start-time-choice');
      var totalPriceContainer = document.querySelector('#total-first-step');
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
        window.addEventListener("load", function () {
          return checkForm(i);
        });
      };

      for (var i = 0; i < inputs.length; i++) {
        _loop(i);
      }

      select.addEventListener("change", datePicker);
    })();
  }
})();
"use strict";

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.from");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

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

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.number.constructor");

require("core-js/modules/es.number.to-fixed");

require("core-js/modules/es.string.iterator");

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

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.map");

require("core-js/modules/es.object.entries");

require("core-js/modules/es.object.values");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.split");

require("core-js/modules/web.dom-collections.for-each");

(function () {
  function localStorageTest() {
    var test = "test";

    try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  if (localStorageTest() === true) {
    var setLocalStorage = function setLocalStorage() {
      var formData = new FormData(form);
      var dataObject = {};
      formData.forEach(function (value, key) {
        if (key == 'Multimediatour') {
          dataObject[key] = value.split(',')[0];
        } else {
          dataObject[key] = value;
        }
      });
      var formDataJSON = JSON.stringify(dataObject);
      var existing = localStorage.getItem("formData"); // If no existing data, create an array
      // Otherwise, convert the localStorage string to an array

      existing = existing ? JSON.parse(existing) : {}; // Add new data to localStorage Array

      existing[form.dataset.formname] = dataObject; // Save back to localStorage

      localStorage.setItem("formData", JSON.stringify(existing));
    };

    var form = document.querySelector("form");
    var formName = form.dataset.formname; // Check if formData is populated and push it to the form

    var storedForm = localStorage.getItem("formData");
    storedForm = storedForm ? JSON.parse(storedForm) : {};

    if (storedForm[formName]) {
      var arrayValues = Object.values(storedForm[formName]);
      var formObject = Object.entries(storedForm[formName]);
      var formInputs = form.querySelectorAll('input');
      var formSelects = form.querySelectorAll('select');
      arrayValues.forEach(function (value) {
        if (formInputs) {
          Array.from(formInputs).map(function (input) {
            if ((input.type == "radio" || input.type == "checkbox") && input.value == value) {
              input.checked = true;
            }
          });
        }

        if (formSelects) {
          Array.from(formObject).map(function (object) {
            Array.from(formSelects).map(function (select) {
              if (select.name == object[0]) {
                Array.from(select.children).map(function (option) {
                  if (option.value == object[1] || option.value.split(',')[0] == object[1]) {
                    option.selected = true;
                  }
                });
              }
            });
          });
        }
      });
    }

    var addExtra = document.querySelector('.add-ticket');
    var removeExtra = document.querySelector('.remove-ticket');

    if (addExtra) {
      addExtra.addEventListener('click', function () {
        console.log('click');
        setTimeout(function () {
          setLocalStorage();
        }, 1000);
      });
      removeExtra.addEventListener('click', function () {
        console.log('click');
        setTimeout(function () {
          setLocalStorage();
        }, 1000);
      });
    } // Put formData in localStorage


    form.addEventListener("change", function () {
      setLocalStorage();
    });
  } else {
    console.log("Local Storage is unavailable");
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
})();
"use strict";

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.map");

require("core-js/modules/es.number.constructor");

require("core-js/modules/es.number.to-fixed");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.string.iterator");

require("regenerator-runtime/runtime");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

(function () {
  var forthForm = document.querySelector(".step-two");

  if (forthForm) {
    var getSelected = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(select) {
        var selectPrice, ticketsTotal;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                selectPrice = select.dataset.price;
                ticketsTotal = select.selectedIndex;
                console.log(ticketsTotal, selectPrice);
                return _context.abrupt("return", calcTotalPriceExtra(selectPrice, ticketsTotal));

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function getSelected(_x) {
        return _ref.apply(this, arguments);
      };
    }();

    var calcTotalPriceExtra = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(a, b) {
        var totalPriceExtra, totalPriceCalculated;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                totalPriceExtra = Number(a) * Number(b);
                console.log(totalPriceExtra);
                totalPriceCalculated = Number(totalPrice.dataset.priceRaw) + Number(totalPriceExtra);
                totalPrice.dataset.priceRawExtra = Number(totalPriceCalculated);
                totalPrice.value = "Totale prijs: \u20AC".concat(parseFloat(totalPriceCalculated / 100).toFixed(2));
                return _context2.abrupt("return", Number(totalPriceCalculated));

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function calcTotalPriceExtra(_x2, _x3) {
        return _ref2.apply(this, arguments);
      };
    }();

    var calcDonation = /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(a) {
        var ticketSelects;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                ticketSelects = document.querySelectorAll('select');
                Array.from(ticketSelects).map( /*#__PURE__*/function () {
                  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(select) {
                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            _context3.next = 2;
                            return getSelected(select);

                          case 2:
                            _context3.t0 = _context3.sent;
                            _context3.t1 = Number(a);
                            totalPriceCalculated = _context3.t0 + _context3.t1;
                            totalPrice.value = "Totale prijs: \u20AC".concat(parseFloat(totalPriceCalculated / 100).toFixed(2));
                            console.log('total price: ', totalPriceCalculated);

                          case 7:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3);
                  }));

                  return function (_x5) {
                    return _ref4.apply(this, arguments);
                  };
                }());

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      return function calcDonation(_x4) {
        return _ref3.apply(this, arguments);
      };
    }();

    var countModule = document.querySelectorAll('.ticket-amount-container');
    var totalPrice = document.querySelector('#total-first-step');
    console.log(countModule);
    Array.from(countModule).map(function (module) {
      var removeButton = module.querySelector('.remove-ticket');
      var addButton = module.querySelector('.add-ticket');
      var ticketSelect = module.querySelector('select');
      window.addEventListener('load', function () {
        getSelected(ticketSelect);
      });
      console.log(ticketSelect.selectedIndex);
      removeButton.addEventListener('click', function () {
        if (ticketSelect.selectedIndex === 0) {
          ticketSelect.selectedIndex = 0;
        } else {
          ticketSelect.selectedIndex = ticketSelect.selectedIndex - 1;
        }

        getSelected(ticketSelect);
      });
      addButton.addEventListener('click', function () {
        if (ticketSelect.selectedIndex === Number(ticketCount)) {
          ticketSelect.selectedIndex = Number(ticketCount);
        } else {
          ticketSelect.selectedIndex = ticketSelect.selectedIndex + 1;
        }

        getSelected(ticketSelect);
      });
    });
    var ticketSelects = document.querySelectorAll('select');
    Array.from(ticketSelects).map(function (select) {
      select.addEventListener('change', function () {
        getSelected(select);
      });
    });
    var donationInputs = document.querySelectorAll('input[name="Doneer"]');
    Array.from(donationInputs).map(function (input) {
      console.log('Array: ', input.value);
      input.addEventListener('change', function () {
        console.log(input.value);

        if (input.checked) {
          var value = input.value;
          calcDonation(value);
        }
      });
      window.addEventListener('load', function () {
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

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.map");

require("core-js/modules/es.number.constructor");

require("core-js/modules/es.string.iterator");

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
