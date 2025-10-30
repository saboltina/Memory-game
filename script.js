const INVENTARA_PARU_SARAKSTS = [
  { attels: "barbell.jpg", vards:"barbell" },
  { attels: "bench.jpg", vards:"bench" },
  { attels: "benchpress.jpg", vards:"bench press" },
  { attels: "chestpress.jpg", vards:"chest press" },
  { attels: "declinebench.jpg", vards:"decline bench" },
  { attels: "dumbell.jpg", vards:"dumbells" },
  { attels: "ezbar.jpg", vards:"EZ bar" },
  { attels: "funkcmasina.jpg", vards:"Functional machine" },
  { attels: "hip.jpg", vards:"hip abduction" },
  { attels: "ikruprese.jpg", vards:"calf press machine" },
  { attels: "kapnes.jpg", vards:"stair machine" },
  { attels: "kettlebell.jpg", vards:"kettlebell" },
  { attels: "lat pulldown.jpg", vards:"lat pulldown machine" },
  { attels: "legextention.jpg", vards:"leg extention" },
  { attels: "legpress.jpg", vards:"leg press" },
  { attels: "paklajs.jpg", vards:"Fitness mat" },
  { attels: "ripa.jpg", vards:"weight disc" },
  { attels: "skrejcels.jpg", vards:"treadmill" }
];

let pirmaKarte = null;
let otraKarte = null;
let meginasanas = 0;
let bloķets = false;
let kartes = [];
let laukumaIzmers = 4; // sakuma automatiski bus (4x4)

function sajaukt(masivs) {
  for (let i = masivs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [masivs[i], masivs[j]] = [masivs[j], masivs[i]];
  }
  return masivs;
}

// grutibas pakapes izvele
function izveletiesGrutibu() {
  let ievade = parseInt(document.getElementById("grutiba").value);
  if (ievade === 2 || ievade === 4 || ievade === 6) {
    laukumaIzmers = ievade;
    saktSpeli(); 
  } else {
    alert("Lūdzu ievadi tikai 2, 4 vai 6!");
  }
}

// izveido speles laukumu
function izveidotLaukumu(n) {
  const laukums = document.getElementById("speluLaukums");
  laukums.innerHTML = "";
  laukums.style.gridTemplateColumns = `repeat(${n}, 110px)`;

  const paruSkaits = (n * n) / 2;
  const atlasitiePāri = INVENTARA_PARU_SARAKSTS.slice(0, paruSkaits);

  kartes = sajaukt(atlasitiePāri.flatMap((pāris, indekss) => [
    { id: indekss * 2, tips: "attels", saturs: pāris.attels, paraId: indekss, sakritis: false },
    { id: indekss * 2 + 1, tips: "teksts", saturs: pāris.vards, paraId: indekss, sakritis: false }
  ]));

  attelotLaukumu(kartes);
  document.querySelectorAll(".karte").forEach(k =>
    k.addEventListener("click", () => apgrieztKarti(k))
  );
}

// laukuma attelosana 
function attelotLaukumu(kartesMasivs) {
  const laukums = document.getElementById("speluLaukums");
  laukums.innerHTML = "";
  kartesMasivs.forEach(karte => {
    const elements = document.createElement("div");
    elements.className = "karte";
    elements.dataset.id = karte.id;
    elements.innerHTML = `
      <div class="karte-ieks">
        <div class="karte-puse karte-aizmugure">🏋️</div>
        <div class="karte-puse karte-priekspuse">
          ${
            karte.tips === "attels"
              ? `<img src="${karte.saturs}" alt="inventārs">`
              : `<div class="vards">${karte.saturs}</div>`
          }
        </div>
      </div>`;
    laukums.appendChild(elements);
  });
}

// sakt no sakuma
function saktSpeli() {
  meginasanas = 0;
  document.getElementById("meginasanasSkaits").textContent = meginasanas;
  izveidotLaukumu(laukumaIzmers);
  pirmaKarte = null;
  otraKarte = null;
  bloķets = false;
}

//kartisu darbiba
function apgrieztKarti(kartesElements) {
  if (bloķets) return;
  const id = parseInt(kartesElements.dataset.id);
  const karte = kartes.find(k => k.id === id);
  if (karte.sakritis || kartesElements.classList.contains("apgriezta")) return;

  kartesElements.classList.add("apgriezta");

  if (!pirmaKarte) {
    pirmaKarte = { karte, elements: kartesElements };
  } else {
    otraKarte = { karte, elements: kartesElements };
    parbauditSakritibu();
  }
}

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
      pirmaKarte.elements.classList.remove("apgriezta");
      otraKarte.elements.classList.remove("apgriezta");
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
