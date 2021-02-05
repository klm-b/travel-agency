let orders;

$(document).ready(function () {
  // получение заявок из модуля и вывод
  orders = permits_module.getOrders();
  $("#ordersContainer").html(reduceArray(orders));

  // обработчик открытия модального окна
  $("#editPermitOrderModal").on("show.bs.modal", function (event) {
    // получение id путевки из специального аттрибута кнопки
    let id = +$(event.relatedTarget).data("order");

    if (id !== undefined) {
      let order = orders.find((p) => p.id === id);

      // заполнение полей формы
      $('input[name="id"]').val(order.id);
      $('select[name="permit"]').val(order.permit.id).change();
      $('select[name="client"]').val(order.client.id).change();
    }
  });

  // обработка отправки формы изменения заказа
  $("#edit-permit-order-form").submit(function (e) {
    e.preventDefault();

    // новый объект
    let newOrder = {};

    debugger;
    let data = $(this).serializeArray();

    for (let obj of data) {
      newOrder[obj.name] = obj.value;
    }

    if (newOrder.id !== "") {
      newOrder.id = +newOrder.id;
      newOrder.permit = +newOrder.permit;
      newOrder.client = +newOrder.client;

      // получение старого объекта по id
      let order = orders.find((p) => p.id === newOrder.id);

      if (order.permit.id !== newOrder.permit) {
        order.permit = permits_module
          .getPermits()
          .find((p) => p.id === newOrder.permit);
      }
      if (order.client.id !== newOrder.client) {
        order.client = permits_module
          .getClients()
          .find((p) => p.id === newOrder.client);
      }

      // сохрание изменений
      permits_module.saveOrders(orders);
    }

    // перезагрузка страницы
    window.location.reload(false);
  });

  // удаление путевки
  $("#delete-permit-order-btn").click(function () {
    let id = +$("#id").val();

    // получение объекта по id
    let orderIndex = orders.findIndex((p) => p.id === id);

    if (orderIndex < 0) return;

    orders.splice(orderIndex, 1);

    // сохрание изменений
    permits_module.saveOrders(orders);

    // перезагрузка страницы
    window.location.reload(false);
  });

  $("#client").html(
    permits_module
      .getClients()
      .reduce(
        (prev, curr) =>
          prev + `<option value="${curr.id}">${curr.surnameNP}</option>`,
        ""
      )
  );
  $("#permit").html(
    permits_module
      .getPermits()
      .reduce(
        (prev, curr) =>
          prev +
          `<option value="${curr.id}">${curr.name}(${curr.type})</option>`,
        ""
      )
  );
});

// сворачивание массива
function reduceArray(array) {
  return array.reduce((c, current) => (c += current.toString()), "");
}
