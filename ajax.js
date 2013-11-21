
var xmlHttp = createXmlHttpRequestObject();
// Функция создания объекта XMLHttpRequest

function createXmlHttpRequestObject() {
    var xmlHttp;

    try {
        // Firefox, Opera 8.0+, Safari
        xmlHttp = new XMLHttpRequest();
    } catch (e) {
        // Internet Explorer
        try {
            xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                alert("Ваш браузер не поддерживает AJAX!");
                return false;
            }
        }
    }
    return xmlHttp;
}
// Отправка асинхронного HTTP-запроса
function http_zapros() {
    var serverAddress = "ajax.php?country="
            + encodeURIComponent(document.getElementById("string").value);
    if (xmlHttp.readyState == 4 || xmlHttp.readyState == 0) {
        // Попытка отправки запроса серверу
        try {
            // Запрос файла request.txt с сервера
            xmlHttp.open("GET", serverAddress, true);
            xmlHttp.onreadystatechange = obrabotka;
            xmlHttp.send(null);
        }// Сообщение об ошибке в случае неудачи
        catch (e) {
            setTimeout('http_zapros()', 1000);
            //alert("Не удается соединиться с сервером");
        }
    }
}
// Функция обработки ответа сервера
function obrabotka() {
    // Только в этом состоянии ответа обрабатываем пришедшие данные
    if (xmlHttp.readyState == 4) {
        // Данные читаем, только если статус - "OK"
        if (xmlHttp.status == 200) {
            try {
                // Чтение сообщения сервера
                var response = xmlHttp.responseText;

                if (response)
                { // Ищем место на странице, где будем писать ответ сервера
                    myDiv = document.getElementById("otvet");
                    // Отображение сообщения

                    myDiv.innerHTML = "<i>" + response + "</i><br/>";
                    // alert(response);
                    setTimeout('http_zapros()', 1000);

                }
                else {
                    setTimeout('http_zapros()', 1000);
                }
            } catch (e) {
                // Сообщение об ошибке
                alert("Ошибка при чтении ответа");
            }
        }
        else {
            // Вывод сообщения о статусе ответа
            alert("Возникла проблема при получении данных с сервера:\n" +
                    xmlHttp.statusText);
        }
    }
}
