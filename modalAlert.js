function showModalElert(type, data) {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
        // Get the element that closes the modal
    var button = document.getElementsByClassName("close")[0];
    // When the user clicks on <span> (x), close the modal
    button.onclick = function() {
        modal.style.display = "none";
    }
    if (type == 'error') {
        // Why doesn't work???
        // modal.getElementsByClassName('modal-title').innerHTML = "ДОПУЩЕНА ОШИБКА";
        modal.childNodes[3].childNodes[1].innerHTML = "ДОПУЩЕНА ОШИБКА";
        modal.childNodes[3].childNodes[3].innerHTML = "При введении данных в одно из полей была допущена ошибка.";
        button.value = "OK";
    } else if (type == 'confirm') {
        modal.childNodes[3].childNodes[1].innerHTML = "Спасибо, " + data.family + ' ' + data.name + (data.fatherName ? ' ' + data.fatherName : "") + ", ваш отзыв отправлен!";
        // document.getElementsByClassName("modal-subtitle").innerHTML = "СУММАРНАЯ ИНФОРМАЦИЯ";
        modal.childNodes[3].childNodes[3].innerHTML = "СУММАРНАЯ ИНФОРМАЦИЯ";
        // document.getElementsByClassName("modal-text").innerHTML = "Информация из data..."
        modal.childNodes[3].childNodes[5].innerHTML = "Информация из data..."
        button.value = "Закрыть окно";
    }
}