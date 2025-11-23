//inventars
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
  let izvele = new Set();
  let rezultats = [];

  while (izvele.size < k) {
    izvele.add(Math.floor(Math.random() * inventaraSaraksts.length));
  }

  izvele.forEach(i => {
    rezultats.push({ tips:"attels", saturs: inventaraSaraksts[i].attels, paraId:i });
    rezultats.push({ tips:"teksts", saturs: inventaraSaraksts[i].vards, paraId:i });
  });

  return rezultats;
}

//mainigie
let pirmaKarte = null;
let otraKarte = null;
let kartes = [];
let blokets = false;
let laukumaIzmers = 4;

// Taimeris
let sekundes = 60;
let laikaInterval = null;
let laikaBeigasTimeout = null;
const KOP_TOTAL = 60; 


let chosenLevel = null;
let chosenN = null;

// lai speles laika nespaida pogas
let gameRunning = false;

//taimera funkcijas
function atjaunotLaikuDispleju() {
  if (gameRunning) {
    document.getElementById("laiks").textContent = sekundes + " s";
  } else {
    document.getElementById("laiks").textContent = "—";
  }
}

function startTimer() {
  // sakas ar 60 sekundem
  sekundes = KOP_TOTAL;
  atjaunotLaikuDispleju();

  // notira ieprieksejos taimerus
  clearInterval(laikaInterval);
  clearTimeout(laikaBeigasTimeout);

  laikaInterval = setInterval(() => {
    if (sekundes > 0) {
      sekundes--;
      atjaunotLaikuDispleju();
    }
  }, 1000);

  //kad beidzas laiks 
  laikaBeigasTimeout = setTimeout(() => {
    
    let uzvarets = kartes.length > 0 && kartes.every(k => k.sakritis === true);

    clearInterval(laikaInterval);
    gameRunning = false;

    if (uzvarets) {
      
      uzvaretaSpele();
    } else {
      alert("Aiii, zaudēji:(.");
      
      bloqueo = true;
    }
    atjaunotLaikuDispleju();
  }, KOP_TOTAL * 1000);
}

//limena izvele
function izveletiesGrutibu(levelIndex, n) {
  // set chosen level values
  chosenLevel = levelIndex;
  chosenN = n;

  // disablo citas limena pogas, kad viena izveleta
  document.getElementById("lvl1").disabled = true;
  document.getElementById("lvl2").disabled = true;
  document.getElementById("lvl3").disabled = true;

  // marķē izveleto limeni
  let btn = document.getElementById("lvl" + levelIndex);
  btn.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2) inset";

  // kartisu (pogu) laukuma izmers n*n
  laukumaIzmers = n;

  // notira vecos datus/taimerus
  document.getElementById("labaisPanelis").style.display = "none";
  clearInterval(laikaInterval);
  clearTimeout(laikaBeigasTimeout);

  // izvedio laukumu ,sak taimeri
  izveidotLaukumu(laukumaIzmers);
  gameRunning = true;
  blokets = false;
  startTimer();
}

// kartisu (pogu) laukuma izveide
function izveidotLaukumu(n) {
  let laukums = document.getElementById("speluLaukums");
  laukums.innerHTML = "";
  laukums.style.gridTemplateColumns = "repeat(" + n + ", 110px)";

  let paruSkaits = (n * n) / 2;

  kartes = randomPairs(paruSkaits);
  shuffle(kartes);

  for (let i = 0; i < kartes.length; i++) {
    let karte = document.createElement("div");
    karte.className = "karte";
    karte.dataset.id = i;

    let iekseja = document.createElement("div");
    iekseja.className = "karte-ieks";

    let aizm = document.createElement("div");
    aizm.className = "karte-puse karte-aizmugure";
    aizm.innerHTML = "🏋️";

    let prieks = document.createElement("div");
    prieks.className = "karte-puse karte-priekspuse";

    if (kartes[i].tips === "attels") {
      let img = document.createElement("img");
      img.src = kartes[i].saturs;
      img.alt = kartes[i].vards || "attels";
      prieks.appendChild(img);
    } else {
      let t = document.createElement("div");
      t.className = "vards";
      t.textContent = kartes[i].saturs;
      prieks.appendChild(t);
    }

    iekseja.appendChild(aizm);
    iekseja.appendChild(prieks);
    karte.appendChild(iekseja);

    karte.addEventListener("click", () => apgrieztKarti(karte, i));

    laukums.appendChild(karte);
  }
}

//kartes apgriezsana
function apgrieztKarti(elem, id) {
  if (!gameRunning) return;        // nekas nenotiek kamer spele nav sakusies
  if (blokets) return;
  let karte = kartes[id];

  if (karte.sakritis || elem.classList.contains("apgriezta")) return;

  elem.classList.add("apgriezta");

  if (!pirmaKarte) {
    pirmaKarte = { karte, elem, id };
  } else {
    otraKarte = { karte, elem, id };
    parbauditSakritibu();
  }
}

//pāra sakritibas parbaude
function parbauditSakritibu() {
  blokets = true;

  if (pirmaKarte.karte.paraId === otraKarte.karte.paraId) {
    pirmaKarte.karte.sakritis = true;
    otraKarte.karte.sakritis = true;
    setTimeout(() => {
      atiestatitGajienu();
      
      let uzvarets = kartes.every(k => k.sakritis === true);
      if (uzvarets) {
        // aptur taimeri, parada liderboardu
        uzvaretaSpele();
      }
    }, 300);
  } else {
    setTimeout(() => {
      pirmaKarte.elem.classList.remove("apgriezta");
      otraKarte.elem.classList.remove("apgriezta");
      atiestatitGajienu();
    }, 800);
  }
}

function atiestatitGajienu() {
  pirmaKarte = null;
  otraKarte = null;
  blokets = false;
}

//visas uzvaras funkcijas
function uzvaretaSpele() {
  // aptur taimeri
  clearInterval(laikaInterval);
  clearTimeout(laikaBeigasTimeout);
  gameRunning = false;

  // aprekina izveleto laiku
  let timeUsed = KOP_TOTAL - sekundes;
  if (timeUsed < 0) timeUsed = 0;

  // parada liderboardu
  document.getElementById("labaisPanelis").style.display = "flex";

  // saglaba rezultatu
  document.getElementById("pievienotBtn").dataset.time = timeUsed;
  document.getElementById("pievienotBtn").dataset.level = chosenLevel || "";
  atjaunotLaikuDispleju();

  alert("Apsveicam ar uzvaru!");
}

//pievienosana lideru tabulai
function pievienotLideru() {
  let name = document.getElementById("playerName").value.trim();
  if (!name) {
    alert("Lūdzu ievadi vārdu pirms pievienošanas.");
    return;
  }
  let btn = document.getElementById("pievienotBtn");
  let timeUsed = btn.dataset.time;
  let level = btn.dataset.level;

  // formatesana 
  let timeText = (timeUsed !== undefined && timeUsed !== "") ? timeUsed + "s" : "0s";
  let levelText = level || "";

  let table = document.getElementById("scoreTable");
  let row = document.createElement("tr");
  let td1 = document.createElement("td");
  td1.textContent = name;
  let td2 = document.createElement("td");
  td2.textContent = levelText;
  let td3 = document.createElement("td");
  td3.textContent = timeText;

  row.appendChild(td1);
  row.appendChild(td2);
  row.appendChild(td3);
  table.appendChild(row);

  // notira varda inputu lai npievienotu sevi 2reiz
  document.getElementById("playerName").value = "";

 
}

//visa resets
function saktNoJauna() {
  // aptur taimeri
  clearInterval(laikaInterval);
  clearTimeout(laikaBeigasTimeout);
  gameRunning = false;
  blokets = false;

  // notira laukumu
  let laukums = document.getElementById("speluLaukums");
  laukums.innerHTML = "";

  // paslepj liderboardu
  document.getElementById("labaisPanelis").style.display = "none";

  // reseto laiku
  sekundes = KOP_TOTAL;
  atjaunotLaikuDispleju();

  // reseto limenus
  chosenLevel = null;
  chosenN = null;

  // enablo limena izveli 
  let b1 = document.getElementById("lvl1");
  let b2 = document.getElementById("lvl2");
  let b3 = document.getElementById("lvl3");
  b1.disabled = false; b2.disabled = false; b3.disabled = false;
  b1.style.boxShadow = ""; b2.style.boxShadow = ""; b3.style.boxShadow = "";

  // reseto kartisu (pogu) info
  kartes = [];
  pirmaKarte = null;
  otraKarte = null;
}

//defaults sakumam
function inicializePage() {
  // nerada kartes
  document.getElementById("speluLaukums").innerHTML = "";
  document.getElementById("labaisPanelis").style.display = "none";
  gameRunning = false;
  atjaunotLaikuDispleju();
}

inicializePage();

//parada liderboardu
window.pievienotLideru = pievienotLideru;
