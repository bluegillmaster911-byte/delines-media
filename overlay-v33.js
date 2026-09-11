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
  function dressBringIn() {
    var h2s = document.querySelectorAll("#inquiry h2");
    for (var i = 0; i < h2s.length; i++) {
      var h2 = h2s[i];
      var title = (h2.textContent || "").replace(/\s+/g, " ").trim();
      if (!/bringing in/i.test(title)) continue;
      var panel = h2.closest(".rounded-xl") || h2.parentElement;
      if (panel) panel.classList.add("d-bring");
      var next = h2.nextElementSibling;
      if (!next || !next.classList.contains("d-bring-lead")) {
        var p = document.createElement("p");
        p.className = "d-bring-lead";
        p.textContent = "Wild game from the woods, or livestock from a partner farm — then swipe to pick the animal.";
        h2.insertAdjacentElement("afterend", p);
      }
    }
  }
  var ICO = {
    wild: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M12 21v-7"/><path d="M12 9.5c-2.2-3.2-5.4-4.2-7.4-3.1 1.2 3 3.2 4.2 5.2 4.2"/><path d="M12 9.5c2.2-3.2 5.4-4.2 7.4-3.1-1.2 3-3.2 4.2-5.2 4.2"/><path d="M7.6 6.6C6.4 4.6 4.4 3.5 2.4 4.2"/><path d="M16.4 6.6c1.2-2 3.2-3.1 5.2-2.4"/></svg>',
    farm: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 20V10l9-6 9 6v10"/><path d="M9 20v-6h6v6"/><path d="M3 10h18"/></svg>'
  };
  function dressKinds() {
    var buttons = document.querySelectorAll("#inquiry button.rounded-md.border-2");
    for (var i = 0; i < buttons.length; i++) {
      var btn = buttons[i];
      var label = ((btn.querySelector(".font-display") || btn).textContent || "").toLowerCase();
      var kind = label.indexOf("wild") !== -1 ? "wild" : label.indexOf("farm") !== -1 ? "farm" : "";
      if (!kind) continue;
      btn.classList.add("d-kind", "d-kind-" + kind);
      if (!btn.querySelector(".d-kind-ico")) {
        var ico = document.createElement("span");
        ico.className = "d-kind-ico";
        ico.setAttribute("aria-hidden", "true");
        ico.innerHTML = ICO[kind];
        btn.insertBefore(ico, btn.firstChild);
      }
    }
  }
  function wrapTrust(el, href, label, blank) {
    if (!el || (el.tagName === "A" && el.classList.contains("d-trust"))) return;
    var a = document.createElement("a");
    a.className = "d-trust";
    a.href = href;
    a.textContent = label;
    if (blank) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }
    el.replaceWith(a);
  }
  function dressTrust() {
    var row = document.querySelector('[aria-label="Trust signals"]');
    if (!row) return;
    var img = row.querySelector('img[alt="Welcome Hunters"]');
    if (img) wrapTrust(img, "/about", "Welcome Hunters");
    var nodes = row.querySelectorAll("span");
    for (var i = 0; i < nodes.length; i++) {
      var t = (nodes[i].textContent || "").replace(/\s+/g, " ").trim();
      if (/reed city/i.test(t)) {
        wrapTrust(
          nodes[i],
          "https://www.google.com/maps/search/?api=1&query=11376+E+32nd+Street,+Reed+City,+MI+49677",
          "Reed City, MI",
          true
        );
      } else if (/family shop/i.test(t)) {
        wrapTrust(nodes[i], "/about", "Family shop");
      } else if (/hunter/i.test(t)) {
        wrapTrust(nodes[i], "/processing", "Hunter-focused");
      }
    }
  }
  function dressTagline() {
    var p = document.querySelector(".hero-gradient .order-1 p.max-w-md");
    if (!p) return;
    if (p.querySelector(".d-tag-kicker")) return;
    p.innerHTML =
      '<span class="d-tag-kicker">Your harvest. Our craft.</span>' +
      '<span class="d-tag-sub">Wild game and livestock processing in the heart of Michigan.</span>';
  }
  function dressOrder() {
    var links = document.querySelectorAll('a[href="/order"], a[href="/drop-off"]');
    for (var i = 0; i < links.length; i++) {
      var a = links[i];
      if (a.dataset.dOrder) continue;
      a.dataset.dOrder = "1";
      a.addEventListener(
        "click",
        function (ev) {
          var href = ev.currentTarget.getAttribute("href");
          if (!href) return;
          ev.preventDefault();
          ev.stopPropagation();
          if (ev.stopImmediatePropagation) ev.stopImmediatePropagation();
          window.location.href = href;
        },
        true
      );
    }
  }
  function mountCall() {
    /* Origin header already has the shop number — do not inject a second one. */
    var extra = document.querySelectorAll("header a.d-call");
    for (var i = 0; i < extra.length; i++) extra[i].remove();
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
  var MAIL = "threebugs77@hotmail.com";
  var TEL = "231-872-9229";
  function sendMail(subject, data) {
    var lines = [];
    for (var k in data) if (Object.prototype.hasOwnProperty.call(data, k) && data[k]) lines.push(k + ": " + data[k]);
    window.location.href =
      "mailto:" + MAIL +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(lines.join("\n"));
  }
  function formDataMap(form) {
    var data = {};
    var fd = new FormData(form);
    fd.forEach(function (v, k) {
      v = String(v).trim();
      if (v) data[k] = v;
    });
    return data;
  }
  function wireMailtoForms() {
    var forms = document.querySelectorAll("main form");
    for (var i = 0; i < forms.length; i++) {
      var form = forms[i];
      if (form.dataset.dWired) continue;
      if (!shouldMailto(form)) continue;
      form.dataset.dWired = "1";
      form.addEventListener(
        "submit",
        function (ev) {
          var f = ev.currentTarget;
          if (!shouldMailto(f)) return;
          ev.preventDefault();
          ev.stopPropagation();
          if (ev.stopImmediatePropagation) ev.stopImmediatePropagation();
          var path = location.pathname;
          var subject = "Deline's website message";
          if (path.indexOf("/employment") === 0) subject = "Employment application — Deline's";
          else if (path.indexOf("/procurement") === 0) subject = "Procurement inquiry — Deline's";
          else if (path.indexOf("/contact") === 0) subject = "Contact the shop — Deline's";
          else if (path.indexOf("/order") === 0) subject = "Online cut order — Deline's";
          else if (path.indexOf("/checkout") === 0) subject = "Order / checkout — Deline's";
          sendMail(subject, formDataMap(f));
        },
        true
      );
    }
  }
  function shouldMailto(form) {
    if (!form) return false;
    if (form.classList.contains("d-form")) return true;
    var path = location.pathname;
    if (path.indexOf("/status") === 0) return false;
    if (path.indexOf("/order") === 0 || path.indexOf("/checkout") === 0) return false;
    var t = (form.textContent || "").toLowerCase();
    if (t.indexOf("look up") !== -1) return false;
    if (t.indexOf("continue to checkout") !== -1) return false;
    if (t.indexOf("add another") !== -1) return false;
    if (t.indexOf("submit order") !== -1) return false;
    if (t.indexOf("cardholder") !== -1) return false;
    return true;
  }
  function wireBlinds() {
    if (location.pathname.indexOf("/blinds") !== 0) return;
    var link = document.querySelector('a[href*="/checkout"]');
    if (!link) return;
    function modelOf(btn) {
      var t = (btn && btn.textContent) || "";
      if (/octagon/i.test(t)) return { id: "octagon", label: "Octagon $625" };
      return { id: "5x5", label: "5×5 $425" };
    }
    function fulfillOf(btn) {
      var t = (btn && btn.textContent) || "";
      return /delivery/i.test(t) ? "delivery" : "pickup";
    }
    function selected(groupLabel) {
      var group = document.querySelector('[role="radiogroup"][aria-label="' + groupLabel + '"]');
      if (!group) return null;
      var radios = group.querySelectorAll('[role="radio"]');
      for (var i = 0; i < radios.length; i++) {
        if (radios[i].getAttribute("aria-checked") === "true") return radios[i];
      }
      return radios[0] || null;
    }
    function sync() {
      var m = modelOf(selected("Blind model"));
      var f = fulfillOf(selected("Fulfillment"));
      link.href = "/checkout?type=blinds&model=" + m.id + "&fulfill=" + f;
      link.textContent = "Order " + m.label + " · " + f;
    }
    if (!link.dataset.dBlind) {
      link.dataset.dBlind = "1";
      document.addEventListener("click", function (ev) {
        var radio = ev.target && ev.target.closest && ev.target.closest('[role="radio"]');
        if (!radio) return;
        var group = radio.parentElement;
        if (!group) return;
        var radios = group.querySelectorAll('[role="radio"]');
        for (var i = 0; i < radios.length; i++) {
          radios[i].setAttribute("aria-checked", radios[i] === radio ? "true" : "false");
        }
        setTimeout(sync, 20);
      });
    }
    sync();
  }
  function replaceDeadSlot(html) {
    if (document.querySelector("form.d-form")) return null;
    var pulse =
      document.querySelector("main .animate-pulse") ||
      Array.prototype.filter.call(document.querySelectorAll("main .card"), function (el) {
        return /Loading order form/i.test(el.textContent || "");
      })[0];
    var wrap = document.createElement("div");
    wrap.innerHTML = html;
    var node = wrap.firstElementChild;
    if (pulse) pulse.replaceWith(node);
    else {
      var main = document.querySelector("main .container-page") || document.querySelector("main");
      if (!main) return null;
      main.appendChild(node);
    }
    return node;
  }
  function hasLiveForm() {
    var forms = document.querySelectorAll("main form");
    for (var i = 0; i < forms.length; i++) {
      if (forms[i].querySelector("input, select, textarea")) return true;
    }
    return false;
  }
  function reviveDeadPages() {
    var path = location.pathname;
    if (hasLiveForm() && path.indexOf("/order") !== 0 && path.indexOf("/checkout") !== 0 && path.indexOf("/contact") !== 0 && path.indexOf("/employment") !== 0) {
      wireMailtoForms();
      return;
    }
    if (path.indexOf("/contact") === 0 && !hasLiveForm()) {
      replaceDeadSlot(
        '<form class="d-form card" action="mailto:' + MAIL + '" method="get">' +
          '<div class="d-form-title">Message the shop</div>' +
          '<p class="d-form-help">Processing, blinds, or a question — we\'ll follow up. Or call <a href="tel:+12318729229">' + TEL + "</a>.</p>" +
          '<label>Name<input name="name" required placeholder="Your name" autocomplete="name"></label>' +
          '<label>Phone<input name="phone" type="tel" required placeholder="(231) 000-0000" autocomplete="tel"></label>' +
          '<label>Email<input name="email" type="email" placeholder="you@email.com" autocomplete="email"></label>' +
          '<label>Topic<select name="topic"><option>Processing</option><option>Hunting blinds</option><option>Buy an animal</option><option>Schedule a hunt</option><option>Other</option></select></label>' +
          '<label>Message<textarea name="message" required placeholder="How can we help?"></textarea></label>' +
          '<button type="submit">Send message</button>' +
          '<p class="d-form-or">Opens your email to ' + MAIL + "</p>" +
        "</form>"
      );
    }
    if (path.indexOf("/order") === 0 && !document.querySelector("main form input, main form select")) {
      replaceDeadSlot(
        '<form class="d-form card">' +
          '<div class="d-form-title">Start an online order</div>' +
          '<p class="d-form-help">Choose the animal and notes. No payment online — the shop confirms. Or call <a href="tel:+12318729229">' + TEL + "</a>.</p>" +
          '<label>Name<input name="name" required autocomplete="name"></label>' +
          '<label>Phone<input name="phone" type="tel" required autocomplete="tel"></label>' +
          '<label>Email<input name="email" type="email" autocomplete="email"></label>' +
          '<label>Species<select name="species"><option>Whitetail</option><option>Mule deer</option><option>Black bear</option><option>Elk</option><option>Moose</option><option>Wild hog</option><option>Axis</option><option>Corsican ram</option><option>Red stag</option><option>Turkey</option><option>Beef / cattle</option><option>Pork / hog</option><option>Goat</option><option>Lamb / sheep</option><option>Other</option></select></label>' +
          '<label>Amount<select name="amount"><option>Whole</option><option>Half</option><option>Not sure — call me</option></select></label>' +
          '<label>Drop-off date<input name="dropoff" type="date"></label>' +
          '<label>Cuts / notes<textarea name="notes" placeholder="Steaks, burger, sausage, jerky…"></textarea></label>' +
          '<button type="submit">Send order request</button>' +
          '<p class="d-form-or">Or <a href="/drop-off">drop off on-site</a></p>' +
        "</form>"
      );
    }
    if (path.indexOf("/checkout") === 0 && !document.querySelector("main form input")) {
      var q = new URLSearchParams(location.search);
      var model = q.get("model") || "";
      var fulfill = q.get("fulfill") || "pickup";
      var type = q.get("type") || "";
      var summary = type === "blinds"
        ? ((model === "octagon" ? "Octagon blind $625" : "5×5 blind $425") + " · " + fulfill)
        : "Shop order";
      replaceDeadSlot(
        '<form class="d-form card">' +
          '<div class="d-form-title">Checkout</div>' +
          '<p class="d-form-help">' + summary + ". No payment is taken online — the shop will confirm. Call <a href=\"tel:+12318729229\">" + TEL + "</a>.</p>" +
          '<input type="hidden" name="item" value="' + summary + '">' +
          '<label>Name<input name="name" required autocomplete="name"></label>' +
          '<label>Phone<input name="phone" type="tel" required autocomplete="tel"></label>' +
          '<label>Email<input name="email" type="email" autocomplete="email"></label>' +
          '<label>Notes<textarea name="notes" placeholder="Pickup window, delivery address, extras…"></textarea></label>' +
          '<button type="submit">Send this order</button>' +
          '<p class="d-form-or"><a href="/blinds">Back to blinds</a> · <a href="/order">Cut order</a></p>' +
        "</form>"
      );
    }
    if (path.indexOf("/employment") === 0 && !document.querySelector("#apply form, form.d-form, #apply input")) {
      var role = new URLSearchParams(location.search).get("role") || "";
      var pulse = document.querySelector("#apply") || document.querySelector("main .animate-pulse");
      var html =
        '<form class="d-form card" id="apply">' +
          '<div class="d-form-title">Apply</div>' +
          '<p class="d-form-help">Seasonal and year-round help. Call <a href="tel:+12318729229">' + TEL + "</a> if it\'s easier.</p>" +
          '<label>Role<select name="role">' +
            '<option value="seasonal-processing"' + (role === "seasonal-processing" ? " selected" : "") + ">Seasonal Processing Assistant</option>" +
            '<option value="counter-service"' + (role === "counter-service" ? " selected" : "") + ">Counter / Customer Service</option>" +
            '<option value="cut-wrap"' + (role === "cut-wrap" ? " selected" : "") + ">Cut & Wrap Technician</option>" +
            '<option value="blind-helper"' + (role === "blind-helper" ? " selected" : "") + ">Blind Assembly / Delivery Helper</option>" +
            '<option value="general-labor"' + (role === "general-labor" ? " selected" : "") + ">General Labor</option>" +
          "</select></label>" +
          '<label>Name<input name="name" required autocomplete="name"></label>' +
          '<label>Phone<input name="phone" type="tel" required autocomplete="tel"></label>' +
          '<label>Email<input name="email" type="email" autocomplete="email"></label>' +
          '<label>Availability<select name="availability"><option>Seasonal — deer season</option><option>Year-round</option><option>Either</option></select></label>' +
          '<label>About you<textarea name="notes" placeholder="Experience, days you can work…"></textarea></label>' +
          '<button type="submit">Send application</button>' +
        "</form>";
      if (pulse) {
        var wrap = document.createElement("div");
        wrap.innerHTML = html;
        pulse.replaceWith(wrap.firstElementChild);
      }
    }
    wireMailtoForms();
  }
  function scan() {
    var path = location.pathname;
    var home = path === "/" || path === "";
    var proc = path.indexOf("/processing") === 0;
    var nodes = document.querySelectorAll(".inquiry-tab-hunt");
    for (var i = 0; i < nodes.length; i++) toLink(nodes[i]);
    if (home || proc) {
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
    }
    if (home) {
      dressBringIn();
      dressKinds();
      dressTrust();
      dressTagline();
    }
    dressOrder();
    mountCall();
    watchTabs();
    wireMailtoForms();
    wireBlinds();
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
  setTimeout(reviveDeadPages, 280);
  setTimeout(reviveDeadPages, 1200);
})();
