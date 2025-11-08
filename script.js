let inventaraSaraksts = [
  { attels: "barbell.png", vards:"barbell" },
  { attels: "bench.png", vards:"bench" },
  { attels: "benchpress.png", vards:"bench press" },
  { attels: "chestpress.png", vards:"chest press" },
  { attels: "declinebench.png", vards:"decline bench" },
  { attels: "dumbell.png", vards:"dumbells" },
  { attels: "ezbar.png", vards:"EZ bar" },
  { attels: "funkcmasina.png", vards:"Functional machine" },
  { attels: "hip.png", vards:"hip abduction" },
  { attels: "ikruprese.png", vards:"calf press machine" },
  { attels: "kapnes.png", vards:"stair machine" },
  { attels: "kettlebell.png", vards:"kettlebell" },
  { attels: "latpulldown.png", vards:"lat pulldown machine" },
  { attels: "legextention.png", vards:"leg extention" },
  { attels: "legpress.png", vards:"leg press" },
  { attels: "paklajs.png", vards:"Fitness mat" },
  { attels: "ripa.png", vards:"weight disc" },
  { attels: "skrejcels.png", vards:"treadmill" },
  { attels: "smithmachine.png", vards:"smith machine" },
  { attels: "spinritenis.png", vards:"spin bike" },
  { attels: "rullis.png", vards:"ab roller" },
  { attels: "row.png", vards:"rowing machine" },
  { attels: "preachercurl.png", vards:"preacher curl machine" }
];

//samaisa
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

function randomPairs(k) {
  let randomi = new Set();
  let randomBildes = [];
  let n = inventaraSaraksts.length;
  while (randomi.size < k) {
    randomi.add(Math.floor(Math.random() * n));
  }
  randomi.forEach(item => {
    let par = inventaraSaraksts[item];
    randomBildes.push({ tips:"attels", saturs:par.attels, paraId:item });
    randomBildes.push({ tips:"teksts", saturs:par.vards, paraId:item });
  });
  return randomBildes;
}
//galvenie mainigie
let pirmaKarte = null;
let otraKarte = null;
let meginasanas = 0;
let bloķets = false;
let kartes = [];
let laukumaIzmers = 4;

//speles saksana
function saktSpeli() {
  meginasanas = 0;
  document.getElementById("meginasanasSkaits").textContent = meginasanas;
  izveidotLaukumu(laukumaIzmers);
  pirmaKarte = null;
  otraKarte = null;
  bloķets = false;
}

//limena izvele
function izveletiesGrutibu() {
  let ievade = parseInt(document.getElementById("grutiba").value);
  if ([2,4,6].includes(ievade)) {
    laukumaIzmers = ievade;
    saktSpeli();
  } else {
    alert("Lūdzu ievadi tikai 2, 4 vai 6!");
  }
}

//izveido laukumu n*n pogaas
function izveidotLaukumu(n) {
  let laukums = document.getElementById("speluLaukums");
  laukums.innerHTML = "";
  laukums.style.gridTemplateColumns = `repeat(${n}, 110px)`;

  let paruSkaits = (n * n) / 2;
  kartes = randomPairs(paruSkaits);
  shuffle(kartes);

  kartes.forEach((karte, i) => {
    let poga = document.createElement("div");
    poga.className = "karte";
    poga.dataset.id = i;
    poga.innerHTML = `
      <div class="karte-ieks">
        <div class="karte-puse karte-aizmugure">🏋️</div>
        <div class="karte-puse karte-priekspuse">
          ${karte.tips === "attels"
            ? `<img src="${karte.saturs}" alt="">`
            : `<div class="vards">${karte.saturs}</div>`}
        </div>
      </div>`;
    poga.addEventListener("click", () => apgrieztKarti(poga, i));
    laukums.appendChild(poga);
  });
}


function apgrieztKarti(elem, id) {
  if (bloķets) return;
  let karte = kartes[id];
  if (karte.sakritis || elem.classList.contains("apgriezta")) return;
  elem.classList.add("apgriezta");

  if (!pirmaKarte) {
    pirmaKarte = { karte, elem };
  } else {
    otraKarte = { karte, elem };
    parbauditSakritibu();
  }
}

//parbaude vai pirma karte vienada ar otru
function parbauditSakritibu() {
  bloķets = true;
  meginasanas++;
  document.getElementById("meginasanasSkaits").textContent = meginasanas;

  if (pirmaKarte.karte.paraId === otraKarte.karte.paraId) {
    pirmaKarte.karte.sakritis = true;
    otraKarte.karte.sakritis = true;
    atiestatītGājienu();
  } else {
    setTimeout(() => {
      pirmaKarte.elem.classList.remove("apgriezta");
      otraKarte.elem.classList.remove("apgriezta");
      atiestatītGājienu();
    }, 1000);
  }
}

function atiestatītGājienu() {
  pirmaKarte = null;
  otraKarte = null;
  bloķets = false;
}

saktSpeli();
