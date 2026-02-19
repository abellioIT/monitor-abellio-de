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


// Hier ist ein Knackpunkt im Design. initPage verlangt vorgerendertes HTML, nicht nur die Daten an sich
// das werden wir hier ändern
function initPage(e) {
    $("html, body").animate({ scrollTop: 0 }, "slow"),
        TweenMax.to(".preloader", 1.2, {
            autoAlpha: 0,
            scale: 1.2,
            top: 30,
            ease: Back.easeOut,
            onComplete: removePreloader,
        }),
        $("#main-content").html(e.page),
        $(".section").each(function () {
            var e = $(this).data("monitor-title"),
                i = "#" + $(this).attr("id");
            $("#menu").append('<li><a href="' + i + '">' + e + "</a></li>");
        }),
        $("#menu").children("li").eq(0).addClass("active"),
        $(".page-title").text($("#menu").children("li.active").text()),
        (slideCount = $(".section").length),
        $(".section").eq(0).find(".traffic-news-area").length
            ? adjustTimerOnTrafficNews()
            : (timer = setInterval(proceedToNextSlide, delay)),
        $(".section")
            .find(".items-container")
            .each(function (e, i) {
                var a = $(this);
                a.slick({
                    infinite: !1,
                    centerMode: !1,
                    arrows: !1,
                    centerPadding: "14px",
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    autoplay: !0,
                    autoplaySpeed: trafficBoxShowDuration / 5,
                    pauseOnHover: !1,
                    speed: animationSpeed,
                }),
                    a
                        .on("beforeChange", function (e, i, t, n) {
                            $(this)
                                .parentsUntil(".section")
                                .find(".nav-railway")
                                .find("li")
                                .removeClass("active")
                                .eq(Math.floor(n / 2))
                                .addClass("active"),
                                n >= i.$slides.length - 2 && a.slick("slickPause");
                        })
                        .slick("slickPause");
            }),
        (isFirstRun = !1),
        setTimeout(reloadPage, 600000);
}

// TweenMax ist seltsam
function proceedToNextSlide() {
    resetTimerOnOriginalDelay &&
        ((resetTimerOnOriginalDelay = !1), clearInterval(timer), (timer = setInterval(proceedToNextSlide, delay))),
        $("#menu").children("li").removeClass("active").eq(slideIndex).addClass("active"),
        $(".page-title").text($("#menu").children("li.active").text()),
        $(".section").eq(slideIndex).find(".traffic-news-area").length && adjustTimerOnTrafficNews(),
        ++slideIndex >= slideCount && (slideIndex = 0);
    var e = $(".section")
        .eq(slideIndex - 1)
        .offset().top;
    TweenMax.to(window, 0, { scrollTo: { y: e - 130 }, ease: Linear.easeNone });
}

// Das hier verstehe ich kein bisschen
function adjustTimerOnTrafficNews() {
    var e = $(".section").eq(slideIndex),
        i = e.find(".items-container"),
        a = e.find(".box-traffic-news").length,
        t = 1e4 * Math.ceil(a / i.slick("slickGetOption", "slidesToShow")),
        n = t / Math.ceil(a / 2) - animationSpeed;
    t < slideShowDuration && (n = (t = slideShowDuration) / Math.ceil(a / 2) - animationSpeed),
        isFirstRun && slideIndex--,
        clearInterval(timer),
        (timer = setInterval(proceedToNextSlide, t)),
        (resetTimerOnOriginalDelay = !0),
        i.slick("slickGoTo", 0, !0),
        i.slick("slickSetOption", "autoplaySpeed", n, !1),
        i.slick("slickPlay");
}
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

function parseSiteFormResponse(raw) {
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

  const danger = `<svg xmlns="http://www.w3.org/2000/svg" height="" viewBox="0 -960 960 960" width="" fill="#000000"><path d="M480-79q-16 0-30.5-6T423-102L102-423q-11-12-17-26.5T79-480q0-16 6-31t17-26l321-321q12-12 26.5-17.5T480-881q16 0 31 5.5t26 17.5l321 321q12 11 17.5 26t5.5 31q0 16-5.5 30.5T858-423L537-102q-11 11-26 17t-31 6Zm0-361q17 0 28.5-11.5T520-480v-160q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640v160q0 17 11.5 28.5T480-440Zm0 120q17 0 28.5-11.5T520-360q0-17-11.5-28.5T480-400q-17 0-28.5 11.5T440-360q0 17 11.5 28.5T480-320Z"/></svg>`


  const html = data.map(item =>  {

    const key = item.linie.toLowerCase().replace(/\s+/g, "");
    const color = lineColors[key] || "#999"; // fallback
    console.log(`Karte für Linie ${key} wird gebaut.`)


    return `
    <div class="traffic-card">

        <div>
            <div class="card-header">
                <div class="line-badge" style="background-color: ${color}">${item.linie}</div>
                <div class="warning-icon">${danger}</div>
            </div>

            <div class="route">
                <div class="route-from">${item.von}</div>
                <div class="route-arrow">→</div>
                <div class="route-to">${item.nach}</div>
                <div class="route-direction">(Einfache Richtung)</div>
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
  fetchHtml(baustellen_url)
])
  .then(([verkehrHtml, baustellenHtml]) => {
    const pv = parseSiteFormResponse(verkehrHtml);
    const pb = parseSiteFormResponse(baustellenHtml);
    // Als erstes sollen die Verkehrmeldungen angezeigt werden und dann erst die Baustellenmeldung
    const combined = pv.concat(pb);
    console.log(combined)
    const html = renderTrafficCards(combined);
    document.getElementById("main-content").innerHTML = html;
    document.querySelector(".preloader")?.remove();
  })
  .catch(error => {
    console.error("Fetch error:", error);
});
