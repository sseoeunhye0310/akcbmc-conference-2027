/**
 * Front-end interactions for the AKCBMC conference site.
 * Runtime configuration is loaded from the Cloudflare Worker API.
 */

async function loadSiteConfig() {
  try {
    const response = await fetch("/api/config", {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Config request failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("사이트 설정을 불러오지 못했습니다.", error);
    return {};
  }
}

function configureRegistrationButtons(registrationFormUrl) {
  const buttons = document.querySelectorAll(".js-apply");
  const hasValidUrl =
    typeof registrationFormUrl === "string" &&
    /^https:\/\//i.test(registrationFormUrl);

  buttons.forEach((button) => {
    if (hasValidUrl) {
      button.href = registrationFormUrl;
      button.target = "_blank";
      button.rel = "noopener noreferrer";
      button.removeAttribute("aria-disabled");
      return;
    }

    button.href = "#apply";
    button.setAttribute("aria-disabled", "true");
    button.addEventListener("click", (event) => {
      event.preventDefault();
      alert("대회 신청 링크를 준비 중입니다.");
    });
  });
}

function setupMobileNavigation() {
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  if (!navToggle || !navLinks) return;

  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(open));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

function setupTripAccordions() {
  document.querySelectorAll(".trip__btn").forEach((button) => {
    button.addEventListener("click", () => {
      const trip = button.closest(".trip");
      if (!trip) return;

      const open = trip.classList.toggle("is-open");
      button.setAttribute("aria-expanded", String(open));
    });
  });
}

async function init() {
  setupMobileNavigation();
  setupTripAccordions();

  const config = await loadSiteConfig();
  configureRegistrationButtons(config.registrationFormUrl);
}

init();
