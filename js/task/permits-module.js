let permits_module = (function () {
  function getPermits() {
    let permitsJSON = localStorage.getItem("permits");

    let permits;
    if (permitsJSON) {
      // получение массива
      permits = JSON.parse(permitsJSON);

      // установка объектам прототипа
      for (let i = 0, len = permits.length; i < len; i++) {
        Object.setPrototypeOf(permits[i], models_module.Permit.prototype);
      }
    } else {
      permits = models_module.generatePermits(getRand(10, 20));
      savePermits(permits);
    }

    return permits;
  }

  function savePermits(permits) {
    localStorage.setItem("permits", JSON.stringify(permits));
  }

  function getPermitTypes() {
    let typesJSON = localStorage.getItem("permitTypes");

    let permitTypes;
    if (typesJSON) {
      // получение массива
      permitTypes = JSON.parse(typesJSON);
    } else {
      permitTypes = models_module.typeOptions;
      savePermitTypes(permitTypes);
    }

    return permitTypes;
  }

  function savePermitTypes(types) {
    localStorage.setItem("permitTypes", JSON.stringify(types));
  }

  function getTransports() {
    let transportsJSON = localStorage.getItem("transports");

    let transports;
    if (transportsJSON) {
      // получение массива
      transports = JSON.parse(transportsJSON);
    } else {
      transports = models_module.transportOptions;
      saveTransports(transports);
    }

    return transports;
  }

  function saveTransports(transports) {
    localStorage.setItem("transports", JSON.stringify(transports));
  }

  function getNutrition() {
    let nutritionJSON = localStorage.getItem("nutrition");

    let nutrition;
    if (nutritionJSON) {
      // получение массива
      nutrition = JSON.parse(nutritionJSON);
    } else {
      nutrition = models_module.nutritionOptions;
      saveNutrition(nutrition);
    }

    return nutrition;
  }

  function saveNutrition(transports) {
    localStorage.setItem("nutrition", JSON.stringify(transports));
  }

  function getClients() {
    let clientsJSON = localStorage.getItem("clients");

    let clients;
    if (clientsJSON) {
      // получение массива
      clients = JSON.parse(clientsJSON);

      // установка объектам прототипа
      for (let i = 0, len = clients.length; i < len; i++) {
        Object.setPrototypeOf(clients[i], models_module.Client.prototype);
      }
    } else {
      clients = models_module.generateClients(getRand(5, 15));
      localStorage.setItem("clients", JSON.stringify(clients));
    }

    return clients;
  }

  function saveClients(clients) {
    localStorage.setItem("clients", JSON.stringify(clients));
  }

  function getOrders() {
    let ordersJSON = localStorage.getItem("orders");

    let orders;
    if (ordersJSON) {
      // получение массива
      orders = JSON.parse(ordersJSON);

      // установка объектам прототипа
      for (let i = 0, len = orders.length; i < len; i++) {
        Object.setPrototypeOf(orders[i], models_module.PermitOrder.prototype);
      }
    } else {
      orders = [];
      saveOrders(orders);
    }

    return orders;
  }

  function saveOrders(orders) {
    localStorage.setItem("orders", JSON.stringify(orders));
  }

  // Экспортирование требуемых переменных и функций.
  return {
    getPermits,
    savePermits,
    getClients,
    getOrders,
    getTransports,
    getNutrition,
    getPermitTypes,
    saveOrders,
    saveTransports,
    saveNutrition,
    savePermitTypes,
    saveClients,
  };
})();
