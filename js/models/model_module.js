let models_module = (function () {
  const transportOptions = [
    "Нет",
    "Троллейбус",
    "Трамвай",
    "Автомобиль",
    "Самолет",
    "Вертолет",
    "Автобус",
    "Бэтмобиль",
  ];

  const nutritionOptions = [
    "RO(без питания)",
    "BB(завтраки, только завтрак в отеле) ",
    "HB(полупансион (завтрак + ужин))",
    "FB(полный пансион (завтрак, обед, ужин)",
    "AI(всё включено)",
    "UAI(ультра все включено)",
  ];

  const typeOptions = ["отдых", "экскурсии", "лечение", "шопинг", "круиз"];

  //-- КЛАССЫ --//
  // путевка
  function Permit(
    id,
    name,
    type,
    description,
    daysCount,
    transport,
    nutrition,
    photoName
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.description = description;
    this.photoFileName = photoName;
    this.daysCount = daysCount;
    this.transport = transport;
    this.nutrition = nutrition;
  }

  // клиент
  function Client(id, surnameNP, birthdayYear) {
    this.id = id;
    this.surnameNP = surnameNP;
    this.birthdayYear = birthdayYear;
  }

  // заказ путевки
  function PermitOrder(id, permit, client) {
    this.id = id;
    this.permit = permit;
    this.client = client;
  }

  //-- ВЫВОД В СТРОКУ --//
  Permit.prototype.toString = function () {
    return `
            <div class="card">
            ${
              this.photoFileName
                ? `<img alt=\"Card image cap\" class=\"card-img-top\" src=\"../img/banners/${this.photoFileName}\">`
                : ""
            }
                <div class="card-body">
                    <h5 class="card-title">${this.name}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${this.type}</h6>
                    <p class="card-text">${this.description}</p>
                    <a class="btn btn-success" data-toggle="modal" data-target="#detailsPermitModal" data-permit="${
                      this.id
                    }" href="#">Подробнее</a>
                    <a class="btn btn-primary" data-toggle="modal" data-target="#addPermitOrderModal" data-permit="${
                      this.id
                    }" href="#">Продать</a>
                    <a class="btn btn-outline-primary" data-toggle="modal" data-target="#editPermitModal" data-permit="${
                      this.id
                    }" href="#">Изменить</a>
                </div>
            </div>`;
  };

  Client.prototype.toString = function () {
    return `<tr><td class="fit">${this.id}</td>
                <td>${this.surnameNP}</td>
                <td>${this.birthdayYear}</td>
                <td class="fit"><a data-toggle="modal" data-target="#editClientModal" data-client="${this.id}" href="#"><i class="fas fa-edit"></i></a></td>
                </tr>`;
  };

  PermitOrder.prototype.toString = function () {
    return `
            <div class="card">
            ${
              this.permit.photoFileName
                ? `<img alt=\"Card image cap\" class=\"card-img-top\" src=\"../img/banners/${this.permit.photoFileName}\">`
                : ""
            }
                <div class="card-body">
                    <h5 class="card-title">${this.permit.name}</h5>
                    <table class="table table-bordered">
                        <tr>
                        <td>Тип</td><td>${this.permit.type}</td>
                        </tr>
                        <tr>
                        <td>Дней</td><td>${this.permit.daysCount}</td>
                        </tr>
                        <tr>
                        <td>Транспорт</td><td>${this.permit.transport}</td>
                        </tr>
                        <tr>
                        <td>Питание</td><td>${this.permit.nutrition}</td>
                        </tr>
                    </table>
                    <hr>
                    <h6 class="card-title">Оформлена на</h6>
                    <p class="card-text">${this.client.surnameNP}</p>
                    <a class="btn btn-outline-primary" data-toggle="modal" data-target="#editPermitOrderModal" data-order="${
                      this.id
                    }" href="#">Редактировать</a>
                </div>
            </div>`;
  };

  // генерация массива путевок
  function generatePermits(count) {
    let permits = new Array(count);

    for (let i = 0; i < count; ++i) {
      permits[i] = new Permit(
        i,
        generatePermitName(),
        typeOptions[getRand(0, typeOptions.length - 1)],
        generatePermitDescription(),
        getRand(10, 100),
        transportOptions[getRand(0, transportOptions.length - 1)],
        nutritionOptions[getRand(0, nutritionOptions.length - 1)],
        `banner_${getRand(1, 20)}.jpg`
      );
    }

    return permits;
  }

  // генерация массива клиентов
  function generateClients(count) {
    let clients = new Array(count);

    for (let i = 0; i < count; ++i) {
      clients[i] = new Client(i, generateSurnameNP(), getRand(1940, 2000));
    }

    return clients;
  }

  // Экспортирование требуемых переменных и функций.
  return {
    Permit,
    Client,
    PermitOrder,
    generatePermits,
    generateClients,
    transportOptions,
    nutritionOptions,
    typeOptions,
  };
})();
