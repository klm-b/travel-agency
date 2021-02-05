$(document).ready(function () {
  let index = getRand(1, 20);

  $("#mainJumbotron").css({
    background: `linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6) ), url(img/banners/banner_${index}.jpg)`,
    ["background-position"]: "50% 30%",
  });
});
