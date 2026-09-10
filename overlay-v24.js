(function () {
  var URL = "https://legendsranch.com/";
  var WT = "https://cdn.jsdelivr.net/gh/bluegillmaster911-byte/delines-media@2f39b25/whitetail-hero.jpg";
  var BB = "https://cdn.jsdelivr.net/gh/bluegillmaster911-byte/delines-media@103b7dc/black-bear-hero.jpg";
  var EK = "https://cdn.jsdelivr.net/gh/bluegillmaster911-byte/delines-media@50a5e9e/elk-hero.jpg";
  var MS = "https://cdn.jsdelivr.net/gh/bluegillmaster911-byte/delines-media@3bcc629/moose-hero.jpg";
  var HG = "https://cdn.jsdelivr.net/gh/bluegillmaster911-byte/delines-media@b3d7f24/wild-hog-hero.jpg";
  var MD = "https://cdn.jsdelivr.net/gh/bluegillmaster911-byte/delines-media@6b3c245/mule-deer-hero.jpg";
  var AX = "https://cdn.jsdelivr.net/gh/bluegillmaster911-byte/delines-media@1fbe434/axis-hero.jpg";
  var CR = "https://cdn.jsdelivr.net/gh/bluegillmaster911-byte/delines-media@1fbe434/corsican-hero.jpg";
  var RS = "https://cdn.jsdelivr.net/gh/bluegillmaster911-byte/delines-media@1fbe434/red-stag-hero.jpg";
  function toLink(btn) {
    if (!btn || btn.tagName === "A") return;
    var a = document.createElement("a");
    a.href = URL;
    a.className = btn.className;
    a.innerHTML = btn.innerHTML;
    a.setAttribute("aria-label", "Schedule Your Hunt at Legends Ranch");
    a.rel = "noopener noreferrer";
    btn.replaceWith(a);
  }
  function swapSpeciesHeroes() {
    var imgs = document.querySelectorAll("img");
    for (var i = 0; i < imgs.length; i++) {
      var img = imgs[i];
      if (img.closest && img.closest(".hero-gradient .order-2")) continue;
      var hay = ((img.getAttribute("src") || "") + " " + (img.getAttribute("srcset") || "") + " " + (img.getAttribute("alt") || "")).toLowerCase();
      var next = "";
      var pos = "center center";
      if (hay.indexOf("whitetail") !== -1) { next = WT; }
      else if (hay.indexOf("black-bear") !== -1 || hay.indexOf("black bear") !== -1 || (hay.indexOf("bear") !== -1 && hay.indexOf("photo") !== -1)) {
        next = BB;
      } else if (hay.indexOf("elk") !== -1) {
        next = EK;
      } else if (hay.indexOf("moose") !== -1) {
        next = MS;
      } else if (hay.indexOf("wild-hog") !== -1 || hay.indexOf("wild hog") !== -1 || hay.indexOf("boar") !== -1) {
        next = HG;
      } else if (hay.indexOf("mule") !== -1) {
        next = MD;
      } else if (hay.indexOf("axis") !== -1) {
        next = AX;
      } else if (hay.indexOf("corsican") !== -1) {
        next = CR;
      } else if (hay.indexOf("red-stag") !== -1 || hay.indexOf("red stag") !== -1 || hay.indexOf("stag") !== -1) {
        next = RS;
      } else if (hay.indexOf("turkey") !== -1) {
        img.style.objectFit = "contain";
        img.style.objectPosition = pos;
        continue;
      }
      if (!next) continue;
      if (img.dataset.d2hero === next) continue;
      img.dataset.d2hero = next;
      img.removeAttribute("srcset");
      img.src = next;
      img.style.objectFit = "contain";
      img.style.objectPosition = pos;
    }
  }
  function dressCards() {
    var cards = document.querySelectorAll("#inquiry .snap-x button.group");
    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      var photo = card.querySelector("span.relative");
      if (!photo) continue;
      var labelEl = card.querySelector("span.font-display");
      var name = labelEl ? (labelEl.textContent || "").trim() : "";
      var cap = photo.querySelector(".d-sp-cap");
      if (!cap) {
        cap = document.createElement("span");
        cap.className = "d-sp-cap";
        photo.appendChild(cap);
      }
      if (name && cap.textContent !== name) cap.textContent = name;
    }
  }
  function mountCall() {
    if (document.querySelector(".d-call")) return;
    var header = document.querySelector("header.sticky .container-page");
    if (!header) return;
    var a = document.createElement("a");
    a.className = "d-call";
    a.href = "tel:+12318729229";
    a.setAttribute("aria-label", "Call Deline's at 231-872-9229");
    a.textContent = "Call 231-872-9229";
    var burger = header.querySelector("button[aria-controls='mobile-nav']");
    if (burger) header.insertBefore(a, burger);
    else header.appendChild(a);
  }
  function watchTabs() {
    var tabs = document.querySelectorAll(".btn.inquiry-tab");
    for (var i = 0; i < tabs.length; i++) {
      if (tabs[i].dataset.dWatch) continue;
      if (tabs[i].classList.contains("inquiry-tab-hunt")) continue;
      tabs[i].dataset.dWatch = "1";
      tabs[i].addEventListener("click", function (ev) {
        var tab = ev.currentTarget;
        setTimeout(function () {
          if (!tab || tab.getAttribute("aria-expanded") !== "true") return;
          var inq = document.getElementById("inquiry");
          if (inq) inq.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 90);
      });
    }
  }
  function mountChrome() {
    var rails = document.querySelectorAll("#inquiry .snap-x");
    for (var r = 0; r < rails.length; r++) (function (rail) {
      var host = rail.parentElement;
      if (!host) return;
      host.style.position = "relative";
      var kids = rail.querySelectorAll(":scope > .snap-start");
      var n = kids.length;
      var overlay = host.querySelector(":scope > .d-sp-overlay");
      if (!overlay) {
        overlay = document.createElement("div");
        overlay.className = "d-sp-overlay";
        var prev = document.createElement("button");
        prev.type = "button";
        prev.className = "d-prev-sp";
        prev.setAttribute("aria-label", "Previous species");
        prev.textContent = "\u2039";
        var next = document.createElement("button");
        next.type = "button";
        next.className = "d-next-sp";
        next.setAttribute("aria-label", "Next species");
        next.textContent = "\u203A";
        overlay.appendChild(prev);
        overlay.appendChild(next);
        host.appendChild(overlay);
        var dots = document.createElement("div");
        dots.className = "d-sp-dots";
        host.appendChild(dots);
        prev.addEventListener("click", function (ev) {
          ev.preventDefault(); ev.stopPropagation();
          rail.scrollBy({ left: -Math.round(rail.clientWidth * 0.98), behavior: "smooth" });
        });
        next.addEventListener("click", function (ev) {
          ev.preventDefault(); ev.stopPropagation();
          rail.scrollBy({ left: Math.round(rail.clientWidth * 0.98), behavior: "smooth" });
        });
      }
      var dotsEl = host.querySelector(":scope > .d-sp-dots");
      if (dotsEl && dotsEl.children.length !== n) {
        dotsEl.innerHTML = "";
        for (var i = 0; i < n; i++) {
          (function (idx) {
            var sp = document.createElement("span");
            sp.setAttribute("role", "button");
            sp.setAttribute("aria-label", "Species " + (idx + 1));
            sp.addEventListener("click", function (ev) {
              ev.preventDefault(); ev.stopPropagation();
              rail.scrollTo({ left: idx * Math.max(1, rail.clientWidth), behavior: "smooth" });
            });
            dotsEl.appendChild(sp);
          })(i);
        }
      }
      var countEl = host.querySelector(":scope > .d-sp-count");
      if (!countEl) {
        countEl = document.createElement("div");
        countEl.className = "d-sp-count";
        countEl.setAttribute("aria-live", "polite");
        host.appendChild(countEl);
      }
      var prevEl = overlay.querySelector(".d-prev-sp");
      var nextEl = overlay.querySelector(".d-next-sp");
      function place() {
        overlay.style.top = rail.offsetTop + "px";
        overlay.style.height = Math.max(140, rail.offsetHeight) + "px";
      }
      function sync() {
        place();
        var w = Math.max(1, rail.clientWidth);
        var idx = Math.round(rail.scrollLeft / w);
        if (idx < 0) idx = 0;
        if (idx > n - 1) idx = n - 1;
        if (dotsEl) {
          var spans = dotsEl.querySelectorAll("span");
          for (var s = 0; s < spans.length; s++) spans[s].classList.toggle("on", s === idx);
        }
        if (countEl && n) countEl.textContent = (idx + 1) + " / " + n;
        if (prevEl) prevEl.style.display = idx <= 0 ? "none" : "flex";
        if (nextEl) nextEl.style.display = idx >= n - 1 ? "none" : "flex";
      }
      if (!rail.dataset.dSync) {
        rail.dataset.dSync = "1";
        rail.tabIndex = 0;
        rail.addEventListener("scroll", sync, { passive: true });
        window.addEventListener("resize", place);
        rail.addEventListener("keydown", function (ev) {
          if (ev.key === "ArrowRight") {
            ev.preventDefault();
            rail.scrollBy({ left: Math.round(rail.clientWidth * 0.98), behavior: "smooth" });
          } else if (ev.key === "ArrowLeft") {
            ev.preventDefault();
            rail.scrollBy({ left: -Math.round(rail.clientWidth * 0.98), behavior: "smooth" });
          }
        });
      }
      sync();
    })(rails[r]);
  }
  function scan() {
    var nodes = document.querySelectorAll(".inquiry-tab-hunt");
    for (var i = 0; i < nodes.length; i++) toLink(nodes[i]);
    swapSpeciesHeroes();
    var rails = document.querySelectorAll(".snap-x");
    for (var r = 0; r < rails.length; r++) {
      rails[r].style.scrollSnapType = "x mandatory";
      var kids = rails[r].querySelectorAll(":scope > .snap-start");
      for (var k = 0; k < kids.length; k++) {
        if (k === kids.length - 1) kids[k].classList.add("d-last-species");
        else kids[k].classList.remove("d-last-species");
      }
    }
    mountChrome();
    dressCards();
    mountCall();
    watchTabs();
  }
  var tmr = 0;
  function scanSoon() {
    if (tmr) clearTimeout(tmr);
    tmr = setTimeout(scan, 70);
  }
  function go(ev) {
    var el = ev.target;
    if (!el || !el.closest) return;
    var hit = el.closest(".inquiry-tab-hunt");
    if (!hit) {
      var btn = el.closest("button, a");
      if (btn && /schedule your hunt/i.test((btn.textContent || "").replace(/\s+/g, " "))) hit = btn;
    }
    if (!hit) return;
    ev.preventDefault();
    ev.stopPropagation();
    if (ev.stopImmediatePropagation) ev.stopImmediatePropagation();
    window.location.href = URL;
  }
  document.addEventListener("click", go, true);
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", scan);
  else scan();
  new MutationObserver(scanSoon).observe(document.documentElement, { childList: true, subtree: true });
})();
