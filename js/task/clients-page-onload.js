let clients;

$(document).ready(function () {
  // получение клиентов из модуля и вывод
  clients = permits_module.getClients();
  $("#clientsContainer").html(reduceArray(clients));

  // обработчик открытия модального окна
  $("#editClientModal").on("show.bs.modal", function (event) {
    // очистка формы
    $("#edit-client-form").trigger("reset");

    // получение id путевки из специального аттрибута кнопки
    let id = $(event.relatedTarget).data("client");

    if (id !== undefined) {
      let client = clients.find((p) => p.id === id);

      // заполнение полей формы
      for (let i in client) {
        $('[name="' + i + '"]').val(client[i]);
      }
    }
  });

  // обработка отправки формы изменения путевки
  $("#edit-client-form").submit(function (e) {
    e.preventDefault();

    // новый объект
    let newClient = {};

    let data = $(this).serializeArray();

    for (let obj of data) {
      newClient[obj.name] = obj.value;
    }

    newClient.birthdayYear = +newClient.birthdayYear;

    if (!(newClient.id === "")) {
      newClient.id = +newClient.id;

      // получение старого объекта по id
      let client = clients.find((p) => p.id === newClient.id);

      // внесение изменений
      Object.assign(client, newClient);
    } else {
      newClient.id =
        Math.max.apply(
          null,
          clients.map((p) => p.id)
        ) + 1;
      clients.unshift(newClient);
    }

    // сохрание изменений
    permits_module.saveClients(clients);

    // перезагрузка страницы
    window.location.reload(false);
  });

  // удаление клиента
  $("#delete-client-btn").click(function () {
    let id = +$("#id").val();

    // получение объекта по id
    let clientIndex = clients.findIndex((p) => p.id === id);

    if (clientIndex < 0) return;

    clients.splice(clientIndex, 1);

    // сохрание изменений
    permits_module.saveClients(clients);

    // перезагрузка страницы
    window.location.reload(false);
  });
});

// сворачивание массива
function reduceArray(array) {
  return array.reduce((c, current) => (c += current.toString()), "");
}
