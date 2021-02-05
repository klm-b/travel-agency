let permits;

$(document).ready(function () {
  // получение заявок из модуля и вывод
  permits = permits_module.getPermits();

  let sort = localStorage.getItem("sortBy");
  showPermits(sort);
  if (sort) {
    $(`#${sort}`).button("toggle").click();
  }

  // обработчик открытия модального окна редактирования путевки
  $("#editPermitModal").on("show.bs.modal", editPermitModalLoad);

  // обработчик открытия модального окна с подробностями
  $("#detailsPermitModal").on("show.bs.modal", detailsPermitModalLoad);

  // обработчик открытия модального окна с добавлением заказа
  $("#addPermitOrderModal").on("show.bs.modal", addOrderLoad);

  // обработка отправки формы изменения путевки
  $("#edit-permit-form").submit(editFormSubmit);

  // обработка отправки формы добавления типа путевки
  $("#add-permit-type-form").submit(addTypeSubmit);

  // удаление путевки
  $("#delete-permit-btn").click(deletePermit);

  // обработка отправки формы покупки путевки
  $("#add-permit-order-form").submit(addOrderSubmit);

  // вывод доступнех
  $("#transport").html(
    permits_module
      .getTransports()
      .reduce(
        (prev, curr, index) =>
          prev + `<option value="${curr}">${curr}</option>`,
        ""
      )
  );
  $("#nutrition").html(
    permits_module
      .getNutrition()
      .reduce(
        (prev, curr, index) =>
          prev + `<option value="${curr}">${curr}</option>`,
        ""
      )
  );
  $("#type").html(
    permits_module
      .getPermitTypes()
      .reduce(
        (prev, curr, index) =>
          prev + `<option value="${curr}">${curr}</option>`,
        ""
      )
  );
  $("#client").html(
    permits_module
      .getClients()
      .reduce(
        (prev, curr, index) =>
          prev + `<option value="${curr.id}">${curr.surnameNP}</option>`,
        ""
      )
  );

  $("#noSort").click(function () {
    showPermits("noSort");
  });
  $("#typesSort").click(function () {
    showPermits("typesSort");
  });
  $("#daysSort").click(function () {
    localStorage.setItem("sortBy", "daysSort");
    showPermits("daysSort");
  });
});

// сворачивание массива
function reduceArray(array) {
  return array.reduce((c, current) => (c += current.toString()), "");
}

// вывод
function showPermits(sort) {
  switch (sort) {
    case "noSort":
      permits = permits_module.getPermits();
      break;

    case "daysSort":
      permits.sort((a, b) => a.daysCount - b.daysCount);
      break;

    case "typesSort":
      permits.sort((a, b) => a.type.localeCompare(b.type));
      break;

    default:
      break;
  }

  localStorage.setItem("sortBy", sort);

  $("#permitsContainer").html(reduceArray(permits));
}

// обработчик открытия модального окна редактирования путевки
function editPermitModalLoad(event) {
  // очистка формы
  $("#edit-permit-form").trigger("reset");

  // получение id путевки из специального аттрибута кнопки
  let id = $(event.relatedTarget).data("permit");

  if (id !== undefined) {
    // поск путевки
    let permit = permits.find((p) => p.id === id);

    // заполнение полей формы
    for (let i in permit) {
      if (i === "photoFileName") continue;
      $('[name="' + i + '"]')
        .val(permit[i])
        .change();
    }
  }
}

// обработчик открытия модального окна с подробностями
function detailsPermitModalLoad(event) {
  // получение id путевки из специального аттрибута кнопки
  let id = $(event.relatedTarget).data("permit");
  if (id === undefined) return;

  // поск путевки
  let permit = permits.find((p) => p.id === id);

  $("#detailsContainer").html(`<div class="container-fluid">
                        <div class="row">
                            <div class="col-6">
                                <div class="card">
                                    ${
                                      permit.photoFileName
                                        ? `<img alt="Card image cap" class="card-img-top" src="../img/banners/${permit.photoFileName}">`
                                        : ""
                                    }
                                    <div class="card-body">
                                        <h5 class="card-title">${
                                          permit.name
                                        }</h5>
                                        <table class="table table-bordered">
                                            <tr>
                                                <td>Тип</td>
                                                <td>${permit.type}</td>
                                            </tr>
                                            <tr>
                                                <td>Дней</td>
                                                <td>${permit.daysCount}</td>
                                            </tr>
                                            <tr>
                                                <td>Транспорт</td>
                                                <td>${permit.transport}</td>
                                            </tr>
                                            <tr>
                                                <td>Питание</td>
                                                <td>${permit.nutrition}</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <div class="col-6">
                                <div class="card h-100">
                                    <div class="card-body">
                                        <h5 class="card-title">Описание</h5>
                                        <hr>
                                        <p>${permit.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`);
}

// обработка отправки формы изменения путевки
function editFormSubmit(e) {
  e.preventDefault();

  // новый объект
  let newPermit = {};

  let data = $(this).serializeArray();

  for (let obj of data) {
    newPermit[obj.name] = obj.value;
  }

  newPermit.daysCount = +newPermit.daysCount;

  if (newPermit.id !== "") {
    newPermit.id = +newPermit.id;

    // получение старого объекта по id
    let permit = permits.find((p) => p.id === newPermit.id);

    // внесение изменений
    Object.assign(permit, newPermit);
  } else {
    newPermit.id =
      Math.max.apply(
        null,
        permits.map((p) => p.id)
      ) + 1;
    permits.unshift(newPermit);
  }

  // сохрание изменений
  permits_module.savePermits(permits);

  // перезагрузка страницы
  window.location.reload(false);
}

// обработка отправки формы добавления типа путевки
function addTypeSubmit(e) {
  e.preventDefault();

  let newType = $("#typeName").val();

  let types = permits_module.getPermitTypes();

  if (types.findIndex((t) => t === newType) < 0) {
    types.push(newType);
    permits_module.savePermitTypes(types);
  }

  // перезагрузка страницы
  window.location.reload(false);
}

// обработчик открытия модального окна с добавлением заказа
function addOrderLoad(event) {
  // получение id путевки из специального аттрибута кнопки
  let id = $(event.relatedTarget).data("permit");

  if (id !== undefined) {
    let permit = permits.find((p) => p.id === id);
    $("#permit").val(permit.name);
    $("#permitId").val(permit.id);
  }
}

function addOrderSubmit(e) {
  e.preventDefault();

  let dataArray = $(this).serializeArray();
  let data = {};
  for (let obj of dataArray) {
    data[obj.name] = obj.value;
  }
  data.permitId = +data.permitId;
  data.client = +data.client;

  // путевка
  let permit = permits.find((p) => p.id === data.permitId);

  // клиент
  let client = permits_module.getClients().find((p) => p.id === data.client);

  // создание заказа
  let orders = permits_module.getOrders();
  let order = new models_module.PermitOrder(
    Math.max.apply(null, orders.length < 1 ? [1] : orders.map((p) => p.id)) + 1,
    permit,
    client
  );

  // сохранение данных
  orders.push(order);
  permits_module.saveOrders(orders);

  // перезагрузка страницы
  window.location.reload(false);
}

// удаление путевки
function deletePermit() {
  let id = +$("#id").val();

  // получение объекта по id
  let permitIndex = permits.findIndex((p) => p.id === id);

  if (permitIndex < 0) return;

  permits.splice(permitIndex, 1);

  // сохрание изменений
  permits_module.savePermits(permits);

  // перезагрузка страницы
  window.location.reload(false);
}
