window.onload = function() {
    var radios = document.getElementsByClassName('radioSatisf');
    for (let i = 0; i < radios.length; i++) {
        radios[i].onclick = setSatisfactionPersent;
    }

    // ******** Send data
    document.getElementById("sendDataBtn").onclick = this.sendData;
    // ******** end Send data

    setCountries();

    document.getElementById("countriesListSelection").onchange = setShowPlaces;

    document.getElementById("ownLang").onchange = document.getElementById("countryLang").onchange = langQuality;
    this.getElementById("dateFrom").onchange = dateFromChanged;
    this.getElementById("dateTo").onchange = dateToChanged;
}

function setSatisfactionPersent() {
    document.getElementById('perSatisfaction').value = this.value;
}

function sendData() {
    var data = {
        satisf: getElementById("perSatisfaction").value,
        name: getElementById("personName").value,
        family: getElementById("personFamily").value,
        fatherName: getElementById("personFatherName").value,
        tel: getElementById("personTel").value,
        email: getElementById("personEmail").value,
        dateFrom: getElementById('dateFrom').value,
        dateTo: getElementById('dateTo').value,
        country: (getElementById('countriesListSelection').selectedIndex == 0) ? ("Не выбрана") : (getElementById('countriesListSelection').options[getElementById('countriesListSelection').selectedIndex].value),
        emotions: getElementById('emotions').value
    }

    if (validate(data)) {
        send(data);
    } else {
        showModalElert('error');
    }
}

function getElementById(id) {
    return document.getElementById(id);
}

function validate(data) {
    let res = true;
    let color = getElementById('personName').style.borderColor;
    if (!data.name) {
        getElementById('personName').style.borderColor = '#FF0000';
        res = false;
    } else getElementById('personName').style.borderColor = '';
    if (!data.family) {
        getElementById('personFamily').style.borderColor = '#FF0000';
        res = false;
    } else getElementById('personFamily').style.borderColor = '';
    if (!validateTel(data.tel)) {
        getElementById("personTel").style.borderColor = '#FF0000';
        res = false;
    } else getElementById('personTel').style.borderColor = '';
    if (!validateEmail(data.email)) {
        getElementById("personEmail").style.borderColor = '#FF0000';
        res = false;
    } else getElementById('personEmail').style.borderColor = '';
    if (!validateDates(data.dateFrom, data.dateTo)) {
        getElementById("dateFrom").style.borderColor = '#FF0000';
        getElementById("dateTo").style.borderColor = '#FF0000';
        res = false;
    } else {
        getElementById("dateFrom").style.borderColor = '';
        getElementById("dateTo").style.borderColor = '';
    }
    return res;
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validateTel(tel) {
    return (tel.match(/\d/g) || []).length == 5;
}

function validateDates(dateFrom, dateTo) {
    if (!dateTo || !dateFrom || dateTo < dateFrom) return false;
    return true;
}

function send(data) {
    showModalElert('confirm', data);
    //send data somewhere
}

var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = function() {
        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
            countriesList = xhr.response.slice(0);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};

var countriesList = [];

function getCountriesFromJSON(callback) {
    // countriesList.json
    var url = 'https://storage.illusdolphin.net/file/download/5db5fc087d5d9505d4df74c2';

    getJSON(url, (err, data) => {
        if (err) {
            alert('Something went wrong: ' + err);
        } else {
            var countriesNames = [];
            for (let i = 0; i < data.length; i++) {
                countriesNames.push(data[i].name);
            }
            callback(countriesNames);
        }
    });
}

function setCountries() {
    var select = getElementById("countriesListSelection");
    getCountriesFromJSON((options) => {
        for (var i = 0; i < options.length; i++) {
            var opt = options[i];
            var el = document.createElement("option");
            el.textContent = opt;
            el.value = opt;
            select.appendChild(el);
        }
    });
}

function setShowPlaces() {
    var sel = getElementById("countriesListSelection");
    var selectedCountry = sel.options[sel.selectedIndex].value;
    for (let i = 0; i < countriesList.length; i++) {
        if (selectedCountry == countriesList[i].name) {
            var places = countriesList[i].showplaces;
            var checkboxes = [];
            for (let j = 0; j < places.length; j++) {
                var elDiv = document.createElement("div");
                var elInput = document.createElement("input");
                var elLabel = document.createElement("label");
                elInput.type = "checkbox";
                elInput.id = elLabel.innerHTML = places[j];
                elLabel.setAttribute("for", places[j]);
                elDiv.appendChild(elInput);
                elDiv.appendChild(elLabel);
                checkboxes.push(elDiv);
            }
            var form = getElementById("showplacesList");
            while (form.firstChild) {
                form.removeChild(form.firstChild);
            }
            for (let j = 0; j < checkboxes.length; j++) {
                form.appendChild(checkboxes[j]);
            }
            break;
        }
    }

}

function langQuality() {
    if (this.checked) {
        this.parentNode.parentNode.getElementsByClassName("langLabel")[0].hidden = true;
        this.parentNode.parentNode.getElementsByClassName("langRange")[0].hidden = false;
    } else {
        this.parentNode.parentNode.getElementsByClassName("langLabel")[0].hidden = false;
        this.parentNode.parentNode.getElementsByClassName("langRange")[0].hidden = true;
    }
}

function dateFromChanged() {
    let dateTo = getElementById("dateTo").value;
    if (!dateTo || dateTo < this.value) {
        getElementById("dateTo").value = this.value;
    }
}

function dateToChanged() {
    let dateFrom = getElementById("dateFrom").value;
    if (!dateFrom || dateTo < this.value) {
        getElementById("dateFrom").value = this.value;
    }
}