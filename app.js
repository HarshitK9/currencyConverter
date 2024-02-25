const base_url =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (Currcode in countryList) {
    let newoptions = document.createElement("option");
    newoptions.innerText = Currcode;
    newoptions.value = Currcode;
    if (select.name === "from" && Currcode === "USD") {
      newoptions.selected = "Selected";
    } else if (select.name === "to" && Currcode === "INR") {
      newoptions.selected = "Selected";
    }
    select.append(newoptions);
  }
  select.addEventListener("change", (evt) => {
    updateflag(evt.target);
  });
}
const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal == "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  //console.log(fromCurr.value, toCurr.value);
  const URL = `${base_url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[toCurr.value.toLowerCase()];
  console.log(rate);
  let finalamount = amtVal * rate;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalamount} ${toCurr.value}`;
};
const updateflag = (Element) => {
  let Currcode = Element.value;
  let counryCode = countryList[Currcode];
  let newsrc = `https://flagsapi.com/${counryCode}/flat/64.png`;
  let img = Element.parentElement.querySelector("img");
  img.src = newsrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});
