$(document).ready(function () {
  let permits = permits_module.getPermits();
  let container = $(".carousel-inner");
  let containerIndicators = $(".carousel-indicators");
  let lastPhoto = +localStorage.getItem("lastPhoto") || 0;

  let index = 0;
  permits.forEach(function (permit) {
    if (permit.photoFileName) {
      container.append(`<div class="carousel-item ${
        lastPhoto === index ? "active" : ""
      }">
                <img src="../img/banners/${
                  permit.photoFileName
                }" class="d-block w-100" alt="${permit.photoFileName}">
                <div class="carousel-caption d-none d-md-block">
                    <h5><b>${permit.name}</b></h5>
                    <p><b>${permit.description}</b></p>
                </div>
            </div>`);

      containerIndicators.append(
        `<li data-target="#permitsCarousel" data-slide-to="${index}" class="${
          lastPhoto === index ? "active" : ""
        }"></li>`
      );
      index++;
    }
  });

  $("#permitsCarousel").on("slid.bs.carousel", function (event) {
    localStorage.setItem("lastPhoto", event.to);
  });
});
