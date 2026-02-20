function getParameterByName(e) {
    var i = RegExp("[\\?&]" + (e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]")) + "=([^&#]*)").exec(
        location.search
    );
    return null !== i && decodeURIComponent(i[1].replace(/\+/g, " "));
}
var timer,
    reloadTimer,
    resetTimerOnOriginalDelay = !1,
    slideIndex = 1,
    slideCount = 0,
    animationDuration = 1e3,
    animationSpeed = 300,
    slideShowDuration = 3e4,
    trafficBoxShowDuration = 1e4,
    delay = slideShowDuration,
    isFirstRun = !0;
function reloadPage() {}

$("#header-date").clock({ seconds: "false", langSet: "de" }),
$("#header-time").clock({ seconds: "false", calendar: "false", langSet: "de" });

var parameter = getParameterByName("id") || "auskunft";


// Auch das hier erschließt sich mir nicht
function removePreloader() {
    $(".preloader").remove();
}

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

  // Für Verkehrsmeldungen
  const danger = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#000000"><path d="M480-79q-16 0-30.5-6T423-102L102-423q-11-12-17-26.5T79-480q0-16 6-31t17-26l321-321q12-12 26.5-17.5T480-881q16 0 31 5.5t26 17.5l321 321q12 11 17.5 26t5.5 31q0 16-5.5 30.5T858-423L537-102q-11 11-26 17t-31 6Zm0-361q17 0 28.5-11.5T520-480v-160q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640v160q0 17 11.5 28.5T480-440Zm0 120q17 0 28.5-11.5T520-360q0-17-11.5-28.5T480-400q-17 0-28.5 11.5T440-360q0 17 11.5 28.5T480-320Z"/></svg>`
  // Für Baustellen
  const maintenance = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#1f1f1f"><path d="M508.5-331.5Q520-343 520-360t-11.5-28.5Q497-400 480-400t-28.5 11.5Q440-377 440-360t11.5 28.5Q463-320 480-320t28.5-11.5ZM440-440h80v-200h-80v200ZM370-80l-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm40-320Z"/></svg>`


  const html = data.map(item =>  {
    var icon

    if(item.meldung === "verkehr"){
      icon = danger
    }else{
      icon = maintenance
    }
    const key = item.linie.toLowerCase().replace(/\s+/g, "");
    const color = lineColors[key] || "#999"; // fallback
    console.log(`Karte für Linie ${key} wird gebaut.`)


    return `
    <div class="traffic-card">

        <div>
            <div class="card-header">
                <div class="line-badge" style="background-color: ${color}">${item.linie}</div>
                <div class="warning-icon">${icon}</div>
            </div>

            <div class="route">
                <div class="route-from">${item.von}</div>
                <div class="route-arrow">→</div>
                <div class="route-to">${item.nach}</div>
                <div class="route-direction">(Einfache Richtung)</div>
            </div>
            
            <div class="section headline">
            ${item.headline}
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
// das vorne verschwindenede element, wird hinten drangetan
function startTicker() {
  const wrapper = document.querySelector(".cards-wrapper");
  const cardWidth = wrapper.firstElementChild.offsetWidth + 40; // 40px = gap

  const delay = 15 * 1000 // 15 Sekunden

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


const verkehrslage_url = "https://abrmd.siteforum.com/de/app/webtools/messages.widget?design=0&navigation=0&action=overview&scheduled=0";
const baustellen_url = "https://abrmd.siteforum.com/de/app/webtools/messages.widget?design=0&navigation=0&action=overview&scheduled=1";


Promise.all([
  fetchHtml(verkehrslage_url),
  // fetchHtml(baustellen_url)
])
  .then(([verkehrHtml]) => {
  // .then(([verkehrHtml, baustellenHtml]) => {
    const pv = parseSiteFormResponse("verkehr",verkehrHtml);
    // const pb = parseSiteFormResponse("baustelle",baustellenHtml);
    // Als erstes sollen die Verkehrmeldungen angezeigt werden und dann erst die Baustellenmeldung
    // const combined = pv.concat(pb);
    // console.log(combined)
    console.log(pv)
    const html = renderTrafficCards(pv);
    document.getElementById("cards-wrapper").innerHTML = html;
    
    // Wärend die Daten geladen werden, wird nur ein Preloader angezeigt.
    // Dieser wird hier entfernt 
    document.querySelector(".preloader")?.remove();

    startTicker();

  })
  .catch(error => {
    console.error("Fetch error:", error);
});

const reloadAfter =  10 * 60 * 1000;

setTimeout(() => {
  window.location.reload();
}, reloadAfter);

