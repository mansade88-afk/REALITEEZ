(function () {
  "use strict";
  const S = window.SITE;
  if (!S) return;

  const $ = (sel) => document.querySelector(sel);
  const esc = (v) =>
    String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const isSafeUrl = (u) => /^https:\/\//i.test(String(u || ""));

  const TEE_PATH =
    "M38 8 L58 2 C62 12 78 16 90 16 C102 16 118 12 122 2 L142 8 L176 30 L160 62 L140 52 L140 158 L40 158 L40 52 L20 62 L4 30 Z";
  const tee = (fill) =>
    `<svg viewBox="0 0 180 162" aria-hidden="true"><path d="${TEE_PATH}" fill="${esc(fill)}" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/></svg>`;

  const money = (p) => (p > 0 ? `$${Number(p).toFixed(0)}` : "Quote");

  // Sample banner
  if (S.isSampleContent) {
    const b = $("#sample");
    b.hidden = false;
  }

  // Hero photo (optional)
  if (S.brand.heroImage) {
    const v = $("#hero-visual");
    v.removeAttribute("aria-hidden");
    v.innerHTML = `<img class="hero-photo" src="${esc(S.brand.heroImage)}" alt="${esc(S.brand.heroImageAlt || "")}">`;
  }

  // Steps
  $("#steps").innerHTML = S.steps
    .map(
      (s, i) => `<div class="step"><span class="n">${i + 1}</span><h3>${esc(s.title)}</h3><p>${esc(s.body)}</p></div>`
    )
    .join("");

  // Products
  const productSelect = $("#item");
  $("#products").innerHTML = S.products
    .map((p) => {
      const buy = isSafeUrl(p.paymentLink)
        ? `<a class="btn btn-spot btn-sm" href="${esc(p.paymentLink)}" target="_blank" rel="noopener">Buy now</a>`
        : `<button class="btn btn-sm" type="button" data-customize="${esc(p.id)}">${p.price > 0 ? "Customize" : "Get a quote"}</button>`;
      return `<article class="card">
        <div class="chip" style="color:var(--ink)">${tee(p.swatch)}<span class="hex">${esc(String(p.swatch).toUpperCase())}</span></div>
        <div class="body">
          <h3>${esc(p.name)}</h3>
          <p class="mono spec">${esc(p.spec)}</p>
          <p>${esc(p.blurb)}</p>
          <div class="tags">${p.methods.map((m) => `<span class="tag">${esc(m)}</span>`).join("")}</div>
        </div>
        <div class="foot">
          <span class="price">${p.price > 0 && p.priceNote === "from" ? "<small>from</small>" : ""}${money(p.price)}${
        p.price > 0 && p.priceNote !== "from" ? ` <small>${esc(p.priceNote)}</small>` : ""
      }</span>
          ${buy}
        </div>
      </article>`;
    })
    .join("");
  productSelect.innerHTML =
    `<option value="">Choose an item</option>` +
    S.products.map((p) => `<option value="${esc(p.name)}">${esc(p.name)}</option>`).join("") +
    `<option value="Something else">Something else</option>`;

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-customize]");
    if (!btn) return;
    const p = S.products.find((x) => x.id === btn.dataset.customize);
    if (p) productSelect.value = p.name;
    $("#order").scrollIntoView({ behavior: "smooth" });
    setTimeout(() => $("#name").focus({ preventScroll: true }), 400);
  });

  // Methods
  $("#methods").innerHTML = S.methods
    .map((m) => `<tr><td>${esc(m.name)}</td><td>${esc(m.best)}</td><td class="mono">${esc(m.min)}</td></tr>`)
    .join("");

  // FAQ
  $("#faq").innerHTML = S.faq
    .map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`)
    .join("");

  // Contact + socials
  const c = S.contact;
  const contactLines = [];
  if (c.email) contactLines.push(`<a href="mailto:${esc(c.email)}">${esc(c.email)}</a>`);
  if (c.phone) contactLines.push(`<a href="tel:${esc(c.phone.replace(/[^\d+]/g, ""))}">${esc(c.phone)}</a>`);
  if (c.city) contactLines.push(`<span>${esc(c.city)}</span>`);
  if (!contactLines.length) contactLines.push(`<span>Use the custom order form to reach us.</span>`);
  $("#contact").innerHTML = contactLines.join("");
  const socials = [
    ["Instagram", c.instagram],
    ["TikTok", c.tiktok],
    ["Facebook", c.facebook],
  ].filter(([, u]) => isSafeUrl(u));
  $("#social").innerHTML = socials
    .map(([n, u]) => `<a href="${esc(u)}" target="_blank" rel="noopener">${n}</a>`)
    .join("");
  $("#year").textContent = new Date().getFullYear();

  // Order form
  const form = $("#order-form");
  const status = $("#form-status");
  const fallback = $("#fallback");
  const setStatus = (msg, kind) => {
    status.textContent = msg;
    status.className = "form-status" + (kind ? " " + kind : "");
  };
  const summarize = (data) =>
    [
      `Custom order request — ${S.brand.name}`,
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Phone: ${data.get("phone") || "-"}`,
      `Item: ${data.get("item")}`,
      `Quantity: ${data.get("quantity")}`,
      `Needed by: ${data.get("deadline") || "-"}`,
      ``,
      `${data.get("details")}`,
    ].join("\n");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (form.website.value) return; // honeypot: bots fill hidden fields
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const btn = form.querySelector("button[type=submit]");

    if (!isSafeUrl(S.formEndpoint)) {
      fallback.hidden = false;
      $("#fallback-text").textContent = summarize(data);
      $("#fallback-to").textContent = c.email
        ? `Send this to ${c.email}:`
        : "Copy your request and send it to us by DM or text:";
      setStatus("Your request is ready to send.", "ok");
      return;
    }

    btn.disabled = true;
    setStatus("Sending…");
    try {
      const res = await fetch(S.formEndpoint, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error("HTTP " + res.status);
      form.reset();
      setStatus("Request received. We'll reply with a proof and quote within 1 business day.", "ok");
    } catch (err) {
      console.error("Order form submit failed:", err);
      setStatus("That didn't go through. Check your connection and try again.", "err");
    } finally {
      btn.disabled = false;
    }
  });

  $("#copy-request").addEventListener("click", async () => {
    const pre = $("#fallback-text");
    try {
      await navigator.clipboard.writeText(pre.textContent);
      setStatus("Copied. Paste it into an email or DM to us.", "ok");
    } catch {
      const r = document.createRange();
      r.selectNodeContents(pre);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(r);
      setStatus("Text selected. Press Ctrl/Cmd + C to copy.", "ok");
    }
  });

  // Order status lookup (no order database yet: routes the request to the shop)
  const statusForm = $("#status-form");
  statusForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const msg = $("#status-msg");
    const num = statusForm.order.value.trim();
    if (!num) {
      msg.textContent = "Enter the order number from your confirmation.";
      return;
    }
    if (!isSafeUrl(S.formEndpoint)) {
      msg.textContent = c.email
        ? `Email ${c.email} with order ${num} and we'll reply with an update.`
        : `Send us order ${num} by DM or text and we'll reply with an update.`;
      return;
    }
    try {
      const data = new FormData();
      data.append("type", "order-status");
      data.append("order", num);
      const res = await fetch(S.formEndpoint, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error("HTTP " + res.status);
      msg.textContent = `Got it. We'll send an update on order ${num} soon.`;
    } catch (err) {
      console.error("Order status request failed:", err);
      msg.textContent = "That didn't go through. Check your connection and try again.";
    }
  });

  // Structured data for search engines
  const ld = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: S.brand.name,
    description: S.brand.pitch,
    url: S.brand.url,
    ...(c.email && { email: c.email }),
    ...(c.phone && { telephone: c.phone }),
    ...(c.city && { address: { "@type": "PostalAddress", addressLocality: c.city } }),
    sameAs: socials.map(([, u]) => u),
    makesOffer: S.products
      .filter((p) => p.price > 0)
      .map((p) => ({
        "@type": "Offer",
        priceCurrency: "USD",
        price: p.price,
        itemOffered: { "@type": "Product", name: p.name, description: p.blurb },
      })),
  };
  const tag = document.createElement("script");
  tag.type = "application/ld+json";
  tag.textContent = JSON.stringify(ld);
  document.head.appendChild(tag);
})();
