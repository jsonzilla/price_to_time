function saveOptions(e) {
  e.preventDefault();
  browser.storage.local.set({
    salary : document.querySelector("#salary").value,
    month_hours : document.querySelector("#month_hours").value,
    hour_work_per_day : document.querySelector("#hour_work_per_day").value,
    filter : document.querySelector("#filter").value
  });
}

function restoreOptions() {
  function setCurrentChoice(result) {
    document.querySelector("#salary").value = result.salary || "2.500,00";
    document.querySelector("#month_hours").value = result.month_hours || "220";
    document.querySelector("#hour_work_per_day").value = result.hour_work_per_day || "8.5";
    document.querySelector("#filter").value = result.filter || 
      `a-color-price, offer-price, kfs-price, a-text-strike,price, new-price, 
      dealPriceText, price_inside_buybox, hl-item__displayPrice,
      sales-price, price-tag-fraction, price__fraction, promotion-item__price`
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  let getting = browser.storage.local.get();
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
