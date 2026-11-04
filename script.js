'use strict';
const header = document.querySelector('.site-header');
const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 133);
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();
// Match the source site's shortest-column footer placement at each breakpoint.
const footerGrid = document.querySelector('.footer-masonry');
function arrangeFooter() {
  const groups = [...footerGrid.children];
  const columns = window.innerWidth < 576 ? 1 : window.innerWidth < 768 ? 2 : 4;
  const heights = Array(columns).fill(0);
  const width = footerGrid.clientWidth / columns;
  groups.forEach(group => {
    const column = heights.indexOf(Math.min(...heights));
    group.style.position = 'absolute';
    group.style.width = `${100 / columns}%`;
    group.style.left = `${column * width}px`;
    group.style.top = `${heights[column]}px`;
    heights[column] += group.getBoundingClientRect().height;
  });
  footerGrid.style.height = `${Math.max(...heights)}px`;
}
new ResizeObserver(arrangeFooter).observe(footerGrid.parentElement);
document.fonts.ready.then(arrangeFooter);
document.querySelector('#cookie-settings').addEventListener('click', event => {
  event.preventDefault();
  document.querySelector('#nastaveni-cookies').showModal();
});
const menuToggle = document.querySelector('#menu-toggle');
const searchToggle = document.querySelector('#search-toggle');
const menu = document.querySelector('#mobile-nav');
const search = document.querySelector('#search-panel');
function setPanel(button, panel, open) {
  button.setAttribute('aria-expanded', String(open));
  panel.hidden = !open;
}
menuToggle.addEventListener('click', () => {
  setPanel(searchToggle, search, false);
  setPanel(menuToggle, menu, menu.hidden);
});
searchToggle.addEventListener('click', () => {
  setPanel(menuToggle, menu, false);
  setPanel(searchToggle, search, search.hidden);
  if (!search.hidden) document.querySelector('#search').focus();
});
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  if (!menu.hidden) { setPanel(menuToggle, menu, false); menuToggle.focus(); }
  if (!search.hidden) { setPanel(searchToggle, search, false); searchToggle.focus(); }
});
document.querySelectorAll('[data-project]').forEach(link => {
  link.addEventListener('click', () => {
    const radio = [...document.querySelectorAll('[name="project"]')].find(input => input.value === link.dataset.project);
    if (radio) radio.checked = true;
  });
});
const form = document.querySelector('#contact-form');
const status = document.querySelector('#form-status');
form.addEventListener('submit', async event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const endpoint = window.BAUMIT_CONFIG?.formEndpoint;
  if (!endpoint) {
    status.textContent = 'Formulář v tomto náhledu zatím neodesílá zprávy. Kontaktujte nás prosím prostřednictvím kontaktního formuláře na Baumit.cz.';
    const link = document.createElement('a');
    link.href = 'https://baumit.cz/kontakty/kontaktni-formular';
    link.textContent = ' Otevřít kontaktní formulář →';
    link.style.textDecoration = 'underline';
    status.append(link);
    return;
  }
  const submit = form.querySelector('[type="submit"]');
  submit.disabled = true;
  status.textContent = 'Odesíláme vaši zprávu…';
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const url = new URL(endpoint);
    if (url.protocol !== 'https:') throw new Error('HTTPS endpoint required');
    const response = await fetch(url, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' }, signal: controller.signal });
    if (!response.ok) throw new Error('Request failed');
    status.textContent = 'Děkujeme. Vaše zpráva byla úspěšně odeslána. Odborník Baumitu se vám ozve.';
    form.reset();
  } catch {
    status.textContent = 'Zprávu se nepodařilo odeslat. Zkuste to prosím znovu nebo využijte kontaktní formulář na Baumit.cz. Vyplněné údaje zůstávají zachovány.';
  } finally {
    clearTimeout(timeout);
    submit.disabled = false;
  }
});
