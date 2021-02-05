function getRand(from, to) {
  return +(from + (to - from) * Math.random()).toFixed(0);
} // getRand

// https://ru.stackoverflow.com/a/718388
function getDayAddition(dayNum) {
  let preLastDigit = (dayNum % 100) / 10;

  if (preLastDigit === 1) {
    return "дней";
  }

  switch (dayNum % 10) {
    case 1:
      return "день";
    case 2:
    case 3:
    case 4:
      return "дня";
    default:
      return "дней";
  }
}

function generateArrayInt(size, min, max) {
  let array = [];
  for (let i = 0; i < size; ++i) {
    array[i] = getRand(min, max);
  }
  return array;
} // genereteArrayDouble

// сгенерировать фамилию
const surnames = [
  "Андрусейко",
  "Гущин",
  "Корнейчук",
  "Князев",
  "Кононов",
  "Кабанов",
  "Лапин",
  "Кондратьев",
  "Кудрявцев",
  "Пахомов",
  "Палий",
  "Щукин",
  "Овчинников",
  "Мамонтов",
  "Кузьмин",
  "Смирнов",
  "Иванов",
  "Кузнецов",
  "Соколов",
  "Попов",
  "Лебедев",
  "Козлов",
  "Новиков",
  "Морозов",
  "Петров",
  "Волков",
  "Соловьёв",
  "Васильев",
  "Зайцев",
  "Павлов",
  "Семёнов",
  "Голубев",
  "Виноградов",
  "Богданов",
  "Воробьёв",
  "Фёдоров",
  "Михайлов",
  "Беляев",
  "Тарасов",
  "Белов",
];

function generateSurname() {
  return surnames[getRand(0, surnames.length - 1)];
}

// сгенерировать имя
const names = [
  "Жерар",
  "Никодим",
  "Казбек",
  "Осип",
  "Назар",
  "Спартак",
  "Донат",
  "Харитон",
  "Лука",
  "Гавриил",
  "Елисей",
  "Жигер",
  "Милан",
  "Геннадий",
  "Яромир",
  "Алан",
  "Александр",
  "Алексей",
  "Альберт",
  "Анатолий",
  "Андрей",
  "Антон",
  "Арсен",
  "Арсений",
  "Артем",
  "Артемий",
  "Артур",
  "Богдан",
  "Борис",
  "Вадим",
  "Валентин",
  "Валерий",
  "Василий",
  "Виктор",
  "Виталий",
  "Владимир",
  "Владислав",
  "Всеволод",
  "Вячеслав",
  "Геннадий",
  "Георгий",
  "Герман",
  "Глеб",
  "Гордей",
  "Григорий",
  "Давид",
  "Дамир",
  "Даниил",
  "Демид",
  "Демьян",
  "Денис",
  "Дмитрий",
  "Евгений",
  "Егор",
  "Елисей",
  "Захар",
  "Иван",
  "Игнат",
  "Игорь",
  "Илья",
  "Ильяс",
  "Камиль",
  "Карим",
  "Кирилл",
  "Клим",
  "Константин",
  "Лев",
  "Леонид",
  "Макар",
  "Максим",
  "Марат",
  "Марк",
  "Марсель",
  "Матвей",
  "Мирон",
  "Мирослав",
  "Михаил",
  "Назар",
  "Никита",
  "Николай",
  "Олег",
  "Павел",
  "Петр",
  "Платон",
  "Прохор",
  "Рамиль",
  "Ратмир",
  "Ринат",
  "Роберт",
  "Родион",
  "Роман",
  "Ростислав",
  "Руслан",
  "Рустам",
  "Савва",
  "Савелий",
  "Святослав",
  "Семен",
  "Сергей",
  "Станислав",
  "Степан",
  "Тамерлан",
  "Тимофей",
  "Тимур",
  "Тихон",
  "Федор",
  "Филипп",
  "Шамиль",
  "Эдуард",
  "Эльдар",
  "Эмиль",
  "Эрик",
  "Юрий",
  "Ян",
  "Ярослав",
];

function generateName() {
  return names[getRand(0, names.length - 1)];
}

// сгенерировать город
const cities = [
  "Донецк",
  "Москва",
  "Киев",
  /*"Сочи", "Харьков", */ "Иловайск",

  // TODO: временно убраны, чтобы чаще попадался Иловайск
  // "Львов", "Лондон", "Анапа", "Томск", "Липецк",
  // "Глазов", "Владимир", "Курган", "Шахты", "Котлас"
];

function generateCity() {
  return cities[getRand(0, cities.length - 1)];
}

// сгенерировать отчество
const patronymics = [
  "Владимирович",
  "Фёдорович",
  "Максимович",
  "Богданович",
  "Васильевич",
  "Борисович",
  "Максимович",
  "Станиславович",
  "Романович",
  "Петрович",
  "Алексеевич",
  "Григорьевич",
  "Данилович",
  "Брониславович",
  "Юхимович",
];

function generatePatronymic() {
  return patronymics[getRand(0, patronymics.length - 1)];
}

function generateSurnameNP() {
  return `${generateSurname()} ${generateName()} ${generatePatronymic()}`;
}

// сгенерировать название путевки
const permitNames = [
  "Alan Xafira Deluxe Resort",
  "Crystal Admiral Resort Suites & Spa",
  "СКАЗКА",
  "Синяя гора",
  "Сильвия",
  "Вилла Виктория",
  "Глория",
  "Эрней Лаз",
  "Villa Provans",
  "Аквамарин",
  "Южная София",
  "Роксолана",
  "Одесса Коблево",
  "VitaPark Солнечный Прованс",
  "Лазурный берег",
  "Ольга",
  "Skilandhouse Буковель",
  "Рациотель Кривой Рог",
  "Коляда",
  "Весна",
  "МАГИЯ КАРПАТ",
  "СОЛНЕЧНАЯ",
  "Grand Victoria Hotel",
  "Жемчужина прибоя",
  "Ensenada",
  "Reikartz Аврора Кривой Рог",
  "БЕРЕЗКА",
  "Интурист Закарпатье",
  "27 ЖЕМЧУЖИН",
  "Вилла Династия",
  "ТК БУКОВЕЛЬ",
  "Зеленая Дача",
  "Шепот Карпат",
  "Reikartz Почаев",
  "ПЕРЕСЫПЬ",
  "Arcadia Villa",
  "НАТАЛИ",
  "ПРЕМЬЕРА",
  "Azov le Chalet",
  "Старый Краков",
  "Серебряный Водограй",
  "Одесса",
  "Санторини",
  "Мир",
  "Терем",
  "Korab Renesa (ex Renaissance)",
  "Blue Mountain",
  "Прага",
  "Лилиана",
  "ЭДЕМ",
  "Bucuti & Tara Beach Resort",
  "JETWING SURF",
  "WATER SIDE RESORT & SPA",
  "SAN REMO",
  "TURMALINA",
  "Fantazia Resort",
  "Breathless Riviera Cancun Resort & Spa",
  "Beyond Resort Khaolak",
  "RAMAYANA",
  "Fraser Suites Doha",
  "Suneo Helios Beach (ex. Luca Helios Beach)",
  "4-You Residence",
  "MENDOS HOTEL",
  "Thinalos Apart Hotel",
  "FUSION MAIA RESORT",
  "ENCHANTED ISLAND RESORT",
  "Amitie Chalets",
  "Villa Kostovic New",
  "President",
  "Diamonds Athuruga Maldives",
  "CENTURY OLD TOWN PRAGUE",
  "Cape Weligama",
  "TORTUGA BAY",
  "HARD ROCK RIVIERA MAYA",
  "EMERAUDE BEACH ATTITUDE",
  "Dias Apartments Kavros",
  "Hilton Budapest",
  "Hotel Xavin",
  "Monachus Hotel & Spa (Club Calimera Monachus Side)",
  "Casa Noste Apartments",
  "SIX SENSES KAPLANKAYA HOTEL",
  "RIXOS PREMIUM BODRUM VILLAS",
  "Piazza 2 (ex.Central Bay)",
  "Apartments Cetkovic",
  "House Viila Old Olive",
  "TALICI HILL",
  "Villa Monterama",
  "Woodlands Suite Serviced Residences",
  "MAIA LUXURY RESORT & SPA",
  "Mulia Villas",
  "Villa Stevan",
  "Pastrovka",
  "Siesta",
  "Tsilivi Palazetto Hotel",
  "Magic Sun",
  "BREEZES VARADERO",
  "MIRIHI ISLAND RESORT",
  "Fourkos Hotel",
  "Village Mare Residence",
  "Grand Hotel Terme Di Augusto",
];

function generatePermitName() {
  return permitNames[getRand(0, permitNames.length - 1)];
}

const citiesNames = [
  "Донецк",
  "Москва",
  "Киев",
  "Сочи",
  "Харьков",
  "Львов",
  "Лондон",
  "Анапа",
  "Томск",
  "Липецк",
  "Глазов",
  "Владимир",
  "Курган",
  "Шахты",
  "Котлас",
  "Площадь",
  "Токио",
  "Дели",
  "Шанхай",
  "Сан-Паулу",
  "Мехико",
  "Каир",
  "Мумбаи",
  "Пекин",
  "Дакка",
  "Осака",
  "Нью-Йорк",
  "Карачи",
  "Буэнос-Айрес",
  "Чунцин",
  "Стамбул",
  "Калькутта",
  "Манила",
  "Лагос",
  "Рио-де-Жанейро",
  "Тяньцзинь",
  "Киншаса",
  "Гуанчжоу",
  "Лос-Анджелес",
  "Москва",
  "Шэньчжэнь",
  "Лахор",
  "Бангалор",
  "Париж",
  "Богота",
  "Джакарта",
  "Ченнай",
  "Лима",
  "Бангкок",
  "Сеул",
  "Нагоя",
  "Хайдарабад",
  "Лондон",
  "Тегеран",
  "Чикаго",
  "Чэнду",
  "Нанкин",
  "Ухань",
  "Хошимин",
  "Луанда",
  "Ахмедабад",
  "Куала Лумпур",
  "Сиань",
  "Гонконг",
  "Дунгуань",
  "Ханчжоу",
  "Фошань",
  "Шэньян",
  "Эр-Рияд",
  "Багдад",
  "Сантьяго",
  "Сурат",
  "Мадрид",
  "Сучжоу",
  "Пуна",
  "Харбин",
  "Хьюстон",
  "Даллас",
  "Торонто",
  "Дар-эс-Салам",
  "Майами",
  "Белу-Оризонти",
  "Сингапур",
  "Филадельфия",
  "Атланта",
  "Фукуока",
  "Хартум",
  "Барселона",
  "Йоханнесбург",
  "Санкт-Петербург",
  "Циндао",
  "Далянь",
  "Вашингтон",
  "Янгон",
  "Александрия",
  "Цзинань",
  "Гвадалахара",
];

const typeNames = ["Отель", "Курорт", "Гостиничный комплекс"];

function generatePermitDescription() {
  return `${typeNames[getRand(0, typeNames.length - 1)]} расположен в ${
    getRand(0, 1) ? "" : "курортном"
  } поселке недалеко от города ${
    citiesNames[getRand(0, citiesNames.length - 1)]
  }. В комплекс входят ${getRand(4, 9)}-этажное и ${getRand(
    1,
    4
  )}-этажное здания. Территория обширная, зеленая, очень уютная${
    getRand(0, 3) ? " с несколькими бассейнами" : ""
  }. ${getRand(0, 6) ? "" : "К услугам гостей работает спа-центр."} ${
    getRand(0, 3) ? "Прекрасно подойдет подойдет для семейного отдыха." : ""
  } ${getRand(0, 5) ? "" : `До аэропорта ${getRand(10, 200)} км.`}`;
}
