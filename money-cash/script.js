let price = 1.87;

let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

const moneyValue = [
  ['PENNY', 0.01],
  ['NICKEL', 0.05],
  ['DIME', 0.1],
  ['QUARTER', 0.25],
  ['ONE', 1],
  ['FIVE', 5],
  ['TEN', 10],
  ['TWENTY', 20],
  ['ONE HUNDRED', 100]
];

const cash = document.getElementById("cash");
const changeDue = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");
const priceScreen = document.getElementById("price-screen");

priceScreen.textContent = `Total: $${price}`;

const cashDrawerSpans = document.querySelectorAll("#cash-drawer p span");

cid.forEach(([denomination, amount]) => {
  const key = denomination.toLowerCase().replace(' ', '');
  cashDrawerSpans.forEach(span => {
    if (span.id === key) {
      span.textContent = amount;
    }
  });
});

const getChange = (diff) => {
  let changeToGive = [];

  for (let i =  moneyValue.length - 1; i >= 0; i--) {
    const denomination = moneyValue[i][0];
    const value = moneyValue[i][1];
    const availableAmount = Math.round(cid[i][1] * 100) / 100;

    if (diff <= 0) break;
    if (availableAmount === 0 || value > diff) continue;

    const maxToTake = Math.floor(availableAmount / value);
    const amountToTake = Math.min(maxToTake, Math.floor(diff / value));

    if (amountToTake > 0) {
      const totalTaken = amountToTake * value;
      changeToGive.push([denomination, totalTaken]);
      diff -= totalTaken;
      cid[i][1] -= totalTaken;
      diff = Math.round(diff * 100) / 100; 
    }
  }
  console.log(changeToGive);
  console.log(diff);
  if (diff >= 0.01) return null;

  changeToGive.forEach(([denomination, amount]) => {
    const key = denomination.toLowerCase().replace(' ', '');
    const span = document.getElementById(key);
    span.textContent = cid.find(([denom]) => denom === denomination)[1];
  });

  return changeToGive; // Return the change that was given
}

const update = () => {
  const cashValue = parseFloat(cash.value);
  const diff = cashValue - price;
  if (diff < 0) {
    alert("Customer does not have enough money to purchase the item");
    return;
  } else if (diff === 0){
    changeDue.textContent = "No change due - customer paid with exact cash";
  } else {
    changeDue.textContent = "Status: ";
    const changeGiven = getChange(diff);
    if (changeGiven === null) {
      changeDue.textContent += "INSUFFICIENT_FUNDS";
    } else {
      let isAllZero = true;
      cid.forEach(([_denomination, amount]) => {
        if (amount !== 0) {
          isAllZero = false;
        }
      });
      if (isAllZero) {
        changeDue.textContent += "CLOSED";
        changeGiven.forEach(([deno, amount]) => {
          changeDue.textContent += ` ${deno}: $${amount}`;
        }) 
      } else {
        changeDue.textContent += "OPEN";
        changeGiven.forEach(([deno, amount]) => {
          changeDue.textContent += ` ${deno}: $${amount}`;
        }) 
      }
    }
  }
}

purchaseBtn.addEventListener("click", update);