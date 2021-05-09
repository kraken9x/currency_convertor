const form = document.getElementById("main-form");
const result = document.getElementById("result");
const currencySO = form.currency;
const convertedCurrencySO = form.convertedCurrency;
fetch("https://free.currconv.com/api/v7/currencies?apiKey=d994b28c949c5c134824")
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    console.log(data);
    // Logic đổ dữ liệu ra select option
    let currencies = Object.keys(data.results);
    for (let cur of currencies) {
      currencySO.innerHTML += `<option value="${cur}">${cur}</option>`;
      convertedCurrencySO.innerHTML += `<option value="${cur}">${cur}</option>`;
    }
  })
  .catch(function (err) {
    console.log(err);
  });

// Gọi form ra, gắn sự kiện onsubmit, preventDefault()
form.onsubmit = function (e) {
  e.preventDefault();
  let cur = form.currency.value;
  let concur = form.convertedCurrency.value;
  let convertedAmount = form.amount.value;
  result.innerHTML = `<img src="./loading.gif">`;
  fetch(
    `https://free.currconv.com/api/v7/convert?q=${cur}_${concur}&apiKey=d994b28c949c5c134824`
  )
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);
      let query = `${cur}_${concur}`;
      let convertedValue = data.results[query].val;
      let convertedResult = convertedAmount * convertedValue;
      result.innerHTML = convertedResult;
    })
    .catch(function (err) {
      console.log(err);
    });
};
