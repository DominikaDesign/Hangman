// codeword categories

let adage = [
  "Bez pracy nie ma kołaczy",
  "Bez ludzi i raj się znudzi",
  "Cel uświęca środki",
  "Co dwie głowy to nie jedna",
  "Diabeł tkwi w szczegółach",
  "Dla chcącego nic trudnego",
  "Elektryka prąd nie tyka",
  "Fortuna często rozumowi przeczy",
  "Gdy kota nie ma, myszy harcują",
  "Gra w piki daje wyniki",
  "Habit nie czyni mnicha",
  "Hulaj dusza, piekła nie ma",
  "Ile wina w głowie, tyle prawdy w słowie",
  "Jak cię widzą, tak cię piszą",
  "Jak pies je, to nie szczeka"
];

let nation = [
  "Argentyna",
  "Bangladesz",
  "Chorwacja",
  "Macedonia Północna",
  "Nowa Zelandia",
  "Gwinea Równikowa",
  "Liechtenstein",
  "Mauretania",
  "Republika Środkowoafrykańska",
  "Republika Zielonego Przylądka",
  "Timor Wschodni",
  "Wybrzeże Kości Słoniowej",
  "Zjednoczone Emiraty Arabskie",
  "Wielka Brytania",
  "Sudan Południowy"
];

let capitalCity = [
  "Buenos Aires",
  "Santiago",
  "Pekin",
  "Kopenhaga",
  "Santo Domingo",
  "Bruksela",
  "Praga",
  "Luksemburg",
  "San Salvador",
  "Bratysława",
  "Waszyngton",
  "Budapeszt",
  "Brazzaville",
  "Hawana",
  "Amman"
];

let categories = adage.concat(nation, capitalCity),
  categoriesLength = categories.length,
  password = categories[Math.floor(Math.random() * categoriesLength)],
  passwordLength = password.length,
  hiddenPassword = "";

let codeword = document.querySelector(".codeword"),
  alphabet = document.querySelector(".alphabet"),
  category = document.querySelector(".category"),
  miss = 0;

for (let i = 0; i < passwordLength; i++) {
  if (password.charAt(i) == " ") {
    hiddenPassword = hiddenPassword + " ";
  } else if (password.charAt(i) == ",") {
    hiddenPassword = hiddenPassword + ",";
  } else {
    hiddenPassword = hiddenPassword + "-";
  }
}

if (categories.indexOf(password) <= 14) {
  category.innerHTML = "<p>Kategoria: Przysłowie</p>";
  console.log(password);
} else if (categories.indexOf(password) <= 29) {
  category.innerHTML = "<p>Kategoria: Państwo świata</p>";
  console.log(password);
} else if (categories.indexOf(password) <= 44) {
  category.innerHTML = "<p>Kategoria: Stolica</p>";
  console.log(password);
}

password = password.toUpperCase();

function showCodeword() {
  codeword.innerHTML = hiddenPassword;
}

window.onload = start;

let letter = [
  "A",
  "Ą",
  "B",
  "C",
  "Ć",
  "D",
  "E",
  "Ę",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "Ł",
  "M",
  "N",
  "Ń",
  "O",
  "Ó",
  "P",
  "Q",
  "R",
  "S",
  "Ś",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "Ź",
  "Ż"
];

function start() {
  let letterDiv = "";

  for (i = 0; i < 35; i++) {
    let element = "number" + i;

    letterDiv =
      letterDiv +
      `<div class="letters" onclick="check(${i})" id="${element}">${
        letter[i]
      }</div>`;
    if ((i + 1) % 7 == 0) {
      letterDiv = letterDiv + `<div style="clear:both;"></div>`;
    }
  }

  alphabet.innerHTML = letterDiv;

  showCodeword();
}

String.prototype.putSign = function(place, sign) {
  if (place > this.length - 1) {
    return this.toString();
  } else {
    return this.substr(0, place) + sign + this.substr(place + 1);
  }
};

function check(nr) {
  let goodAnswer = false;

  for (i = 0; i < passwordLength; i++) {
    if (password.charAt(i) == letter[nr]) {
      hiddenPassword = hiddenPassword.putSign(i, letter[nr]);

      goodAnswer = true;
    }
  }

  let element = "number" + nr;
  if (goodAnswer == true) {
    document.querySelector(`#${element}`).style.background = "#003300";
    document.querySelector(`#${element}`).style.color = "#00C000";
    document.querySelector(`#${element}`).style.border = "2px solid #00C000";
    document.querySelector(`#${element}`).style.cursor = "default";

    showCodeword();
  } else {
    document.querySelector(`#${element}`).style.background = "#330000";
    document.querySelector(`#${element}`).style.color = "#C00000";
    document.querySelector(`#${element}`).style.border = "2px solid #C00000";
    document.querySelector(`#${element}`).style.cursor = "default";
    document.querySelector(`#${element}`).setAttribute("onclick", ";");

    // wrong letter
    miss++;
    document.querySelector(
      ".image"
    ).innerHTML = `<img src="img/hangman${miss}.png" alt="hangman" />`;
  }
  //win
  let reloadBtn = document.querySelector(".reload");

  if (password == hiddenPassword) {
    alphabet.innerHTML = `<p>Tak jest!<br />Podano prawidłowe hasło!!<p><br /><span class="reset" onclick="location.reload()">JESZCZE RAZ?</span>`;

    reloadBtn.remove();
  }
  //lose
  if (miss >= 6) {
    alphabet.innerHTML = `<p>Nie udało się! Prawidłowe hasło to:<br/>${password}<p><br /><span class="reset" onclick="location.reload()">JESZCZE RAZ?</span>`;

    reloadBtn.remove();
  }
  showCodeword();
}
