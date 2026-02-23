// In diesem Rythmus schiebt der slider die Nachrichten durch 
const sliderDelay = 12 * 1000;
// Nach dieser Zeit wird die Seite komplett neu geladen,
// und somit die Daten neu von SiteForum gefetcht
const reloadAfter =  10 * 60 * 1000; // 10 Minuten

// Siteforum API
const verkehrslage_url = "https://abrmd.siteforum.com/de/app/webtools/messages.widget?design=0&navigation=0&action=overview&scheduled=0";
const baustellen_url = "https://abrmd.siteforum.com/de/app/webtools/messages.widget?design=0&navigation=0&action=overview&scheduled=1";

// Diese Farben stammen aus der Siteforum API, und müssten manuell angepasst werden, falls neue Linien dazu kommen
const lineColors = {
  rb75: "#b17f4a",
  re17: "#36a9e1",
  rb20: "#95c11f",
  rb59: "#d47f8f",
  rb51: "#804a96",
  re19: "#95c11f",
  re15: "#2aaae2",
  re9: "#000",
  re16: "#2e4c9c",
  re10: "#52ae32",
  "30": "#000",
  re18: "#000",
  rb44: "#d47f8f",
  rb25: "#52ae32",
  rb48: "#2d847e",
  rb77: "#73542f",
  re8: "#000",
  re28: "#000",
  s7: "#000",
  rb57: "#000"
};


$("#header-date").clock({ seconds: "false", langSet: "de" }),
$("#header-time").clock({ seconds: "false", calendar: "false", langSet: "de" });

//---------------------------------------------------------------------------------------------------
// Ab hier hat Abellio das Zepter wieder selbst in die Hand genommen und gecodet
//

function fetchHtml(url) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network error for ${url}`);
      }
      return response.text();
    });
}

// Diese Funktion hol sich aus dem CMS json.
// Das Siteforum liefert an sich aber nur HTML
// Daher bauen wir hier einen Parser für dass HTML welchs
// https://abrmd.siteforum.com/de/app/webtools/messages.widget?&design=0&navigation=0&action=overview&scheduled=0
// zurückgegeben wird.

function parseSiteFormResponse(meldung, raw) {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(raw, "text/html");

    const results = [];

    const messageItems = doc.querySelectorAll(".ids-fgi-row");

    messageItems.forEach(el => {

      const linie = el.querySelector(".ids-wt-line-label")?.textContent.trim() || "";

      const von = el.querySelector(".ids-wt-line-from")?.childNodes[0]?.textContent.trim() || "";
      const nach = el.querySelector(".ids-wt-line-to")?.childNodes[0]?.textContent.trim() || "";

      const abschnittVon = el.querySelector(".ids-wt-affected-from")?.childNodes[0]?.textContent.trim() || "";
      const abschnittNach = el.querySelector(".ids-wt-affected-to")?.childNodes[0]?.textContent.trim() || "";

      const zeitraum = el.querySelector(".ids-wt-time .ids-text")?.textContent.trim() || "";

      const headline = el.querySelector(".ids-wt-label")?.textContent.trim() || "";

      results.push({
        meldung,
        linie,
        von,
        nach,
        betroffener_abschnitt: {
          von: abschnittVon,
          nach: abschnittNach
        },
        zeitraum,
        headline
      });
    });

    return results;

  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

function renderTrafficCards(data) {

  // Die beiden folgenden SVGs sind aus der Schienenlounge

  // Für Verkehrsmeldungen
  const troete = `
    <?xml version="1.0" encoding="UTF-8"?>
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 250" fill="#1f1f1f">
    <path d="M0,0 L250,0 L250,250 L0,250 Z " fill="#6b717a" transform="translate(0,0)"/>
    <path d="M0,0 L9,0 L14,5 L25,24 L40,25 L46,34 L48,38 L47,43 L42,50 L43,55 L53,73 L53,79 L48,85 L35,88 L-1,95 L-16,98 L-19,98 L-15,105 L-16,110 L-24,115 L-18,127 L-14,134 L-14,143 L-17,148 L-22,152 L-31,152 L-37,148 L-51,124 L-54,119 L-54,117 L-58,118 L-70,118 L-79,113 L-84,107 L-86,101 L-86,88 L-81,80 L-74,74 L-51,61 L-44,55 L-34,42 L-23,28 L-12,14 L-3,3 Z " fill="#080808" transform="translate(127,53)"/>
    <path d="M0,0 L2,0 L16,25 L26,42 L39,64 L39,66 L16,71 L-16,77 L-19,77 L-33,52 L-35,49 L-34,44 L-22,29 L-12,16 Z " fill="#FDFDFD" transform="translate(122,68)"/>
    <path d="M0,0 L2,0 L8,11 L17,27 L16,30 L-8,44 L-14,46 L-23,45 L-31,38 L-33,34 L-33,25 L-28,17 L-19,11 Z " fill="#F9F9F9" transform="translate(80,119)"/>
    <path d="M0,0 L4,1 L12,14 L28,42 L42,66 L43,72 L38,73 L32,64 L18,39 L4,15 L-2,5 L-1,1 Z " fill="#F6F6F6" transform="translate(130,59)"/>
    <path d="M0,0 L2,0 L18,28 L19,29 L18,36 L16,38 L9,38 L3,30 L-10,8 L-10,6 Z " fill="#F8F8F8" transform="translate(88,160)"/>
    <path d="M0,0 L4,1 L5,5 L-8,13 L-15,17 L-20,16 L-20,11 Z " fill="#0E0E0E" transform="translate(205,59)"/>
    <path d="M0,0 L4,1 L5,5 L-4,11 L-11,11 L-16,7 L-16,2 L-11,1 L-10,3 L-3,2 Z " fill="#0F0F0F" transform="translate(71,147)"/>
    <path d="M0,0 L4,1 L5,2 L4,9 L1,19 L-4,19 L-5,18 L-4,10 L-1,1 Z " fill="#0F0F0F" transform="translate(172,45)"/>
    <path d="M0,0 L11,2 L17,5 L16,10 L6,9 L-1,6 L-2,2 Z " fill="#0E0E0E" transform="translate(188,90)"/>
    <path d="M0,0 L8,0 L12,6 L10,11 L9,13 L7,13 L0,1 Z " fill="#F0F0F0" transform="translate(156,85)"/>
    <path d="M0,0 L4,2 L5,6 L-1,8 L-3,5 L-2,1 Z " fill="#F0F0F0" transform="translate(99,154)"/>
    <path d="M0,0 L5,1 L4,6 L-1,5 Z " fill="#080808" transform="translate(82,141)"/>
    </svg>
  `

  // Für Baustellen
  const werkzeug = `
  <?xml version="1.0" encoding="UTF-8"?>
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 250" fill="#1f1f1f">
  <path d="M0,0 L250,0 L250,250 L0,250 Z " fill="#6b717a" transform="translate(0,0)"/>
  <path d="M0,0 L14,0 L19,5 L19,10 L-6,35 L-6,44 L-5,54 L-4,55 L15,56 L40,31 L47,32 L50,36 L50,50 L45,63 L37,74 L27,81 L16,85 L-7,85 L-21,100 L-28,108 L-37,118 L-46,128 L-53,136 L-62,146 L-69,154 L-79,165 L-86,173 L-93,179 L-102,182 L-111,182 L-121,177 L-129,168 L-132,160 L-132,150 L-127,140 L-118,131 L-110,124 L-99,114 L-91,107 L-81,98 L-71,89 L-63,82 L-53,73 L-43,64 L-35,57 L-35,33 L-30,21 L-23,12 L-13,5 Z " fill="#FBFBFB" transform="translate(166,34)"/>
  <path d="M0,0 L14,0 L19,5 L19,10 L-6,35 L-6,44 L-5,54 L-4,55 L15,56 L40,31 L47,32 L50,36 L50,50 L45,63 L37,74 L27,81 L16,85 L-7,85 L-21,100 L-28,108 L-37,118 L-46,128 L-53,136 L-62,146 L-69,154 L-79,165 L-86,173 L-93,179 L-102,182 L-111,182 L-121,177 L-129,168 L-132,160 L-132,150 L-127,140 L-118,131 L-110,124 L-99,114 L-91,107 L-81,98 L-71,89 L-63,82 L-53,73 L-43,64 L-35,57 L-35,33 L-30,21 L-23,12 L-13,5 Z M-2,7 L-11,11 L-19,17 L-25,25 L-29,34 L-29,51 L-28,59 L-42,72 L-50,79 L-60,88 L-68,95 L-79,105 L-87,112 L-97,121 L-107,130 L-115,137 L-121,142 L-125,149 L-125,161 L-121,169 L-112,175 L-100,175 L-92,171 L-81,159 L-74,151 L-65,141 L-56,131 L-49,123 L-40,113 L-31,103 L-24,95 L-15,85 L-9,78 L-2,79 L15,79 L27,74 L36,66 L43,52 L43,38 L36,44 L20,60 L16,62 L-5,61 L-10,57 L-11,55 L-12,33 L-3,23 L10,10 L12,9 L12,7 Z " fill="#0C0C0C" transform="translate(166,34)"/>
  <path d="M0,0 L5,1 L4,6 L-36,46 L-41,46 L-42,42 Z " fill="#101010" transform="translate(130,115)"/>
  <path d="M0,0 L10,0 L15,4 L14,8 L9,7 L2,7 L0,10 L1,15 L3,17 L9,16 L14,15 L15,20 L8,24 L2,24 L-4,20 L-7,15 L-7,8 L-3,2 Z " fill="#101010" transform="translate(56,177)"/>
  <path d="M0,0 L4,1 L5,5 L2,8 L-3,7 L-2,2 Z " fill="#131313" transform="translate(81,164)"/>
  </svg>
  `
  
  
  const html = data.map(item =>  {
    var icon

    if(item.meldung === "verkehr"){
      icon = troete
    }else{
      // Bei Baustellenmeldungen bleibt es gleich
      icon = werkzeug
    }
    const key = item.linie.toLowerCase().replace(/\s+/g, "");
    const color = lineColors[key] || "#999"; // fallback

    return `
    <div class="traffic-card">

        <div>
            <div class="card-header">
                <div class="line-badge" style="background-color: ${color}">${item.linie}</div>
                <div class="warning-icon">${icon}</div>
            </div>

            <div class="route">
                <div class="route-from">${item.von}</div>
                <div class="route-arrow">nach</div>
                <div class="route-to">${item.nach}</div>
                <div class="route-direction">(Einfache Richtung)</div>
            </div>
            
            <div class="section">
                <div class="section-title">Grund:</div>
                <div>${item.headline}</div>
            </div>

            <div class="section">
                <div class="section-title">Zeitraum:</div>
                <div>${item.zeitraum}</div>
            </div>

            <div class="section">
                <div class="section-title">Betroffener Abschnitt:</div>
                <div>${item.betroffener_abschnitt.von} bis ${item.betroffener_abschnitt.nach}</div>
            </div>
        </div>
    </div>
  `;}).join("");
  return html
}

// Ticker slidet alle Elemente in .cards-wrapper (hier .traffic-cards) von rechts nach links
// das vorne verschwindenede element, wird hinten dran getan
function startTicker(delay) {
  const wrapper = document.querySelector(".cards-wrapper");
  const cardWidth = wrapper.firstElementChild.offsetWidth + 40; // 40px = gap


  setInterval(() => {
    wrapper.style.transition = "transform 0.5s ease";
    wrapper.style.transform = `translateX(-${cardWidth}px)`;
    setTimeout(() => {
      wrapper.style.transition = "none";
      wrapper.appendChild(wrapper.firstElementChild);
      wrapper.style.transform = "translateX(0)";
    }, 500); // match transition duration
    // Änder diese Nummer um den Ticker zu verlangsamen ode rzu beschleunigen (5000 => 5 Sekunden)
  }, delay);
}

// --------------------------------------------------------------------
// The action starts here

// URL-Parameter auslesen
const urlParams = new URLSearchParams(window.location.search);
const type = urlParams.get('type') || 'alle'; // z.B. ?type=verkehr, ?type=baustelle, ?type=alle

let promises = [];

if (type === 'verkehr' || type === 'alle' || !type) {
  promises.push(fetchHtml(verkehrslage_url));
}
if (type === 'baustelle' || type === 'alle' || !type) {
  promises.push(fetchHtml(baustellen_url));
}


Promise.all(promises).then((results) => {

    let pv = [];
    let pb = [];
    let index = 0;

    if (type === 'verkehr' || type === 'alle' || !type) {
      pv = parseSiteFormResponse("verkehr", results[index]);
      index++;
    }
    if (type === 'baustelle' || type === 'alle' || !type) {
      pb = parseSiteFormResponse("baustelle", results[index]);
    }

    const combined = pv.concat(pb);
    console.log(combined);

    // Wenn keine Verkehrsmeldungen am Start sind dann return diese tolle Meldung, dass alles ok ist :))))))
    if((pv.length === 0) && (pb.length === 0)){
      var html = `
      <div class="traffic-card no-messages">

          <div>
              <div class="section headline">
              <b>Verkehrmeldungen</b>
              </div>

              <div class="section">
              Momentan liegen keine Verkehrmeldungen vor.
              </div>

              <div class="section">
              <em>Abellio wünscht gute Fahrt!</em>
              </div>
          </div>
      </div>
    `
    }
    var html = renderTrafficCards(combined);
    document.getElementById("cards-wrapper").innerHTML = html;
    
    // Wärend die Daten geladen werden, wird nur ein Preloader angezeigt.
    // Dieser wird hier entfernt 
    document.querySelector(".preloader")?.remove();
    
    if((pv.length > 1) || (pb.length > 1)){
      startTicker(sliderDelay);
    }

  })
  .catch(error => {
    console.error("Fetch error:", error);
});

setTimeout(() => {
  window.location.reload();
}, reloadAfter);

