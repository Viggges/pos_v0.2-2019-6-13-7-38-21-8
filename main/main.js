'use strict';
var totalPrice = 0.00;
function printReceipt(inputs) {
  let allItems = loadAllItems();
  //console.log(allItems);
  let itemMap = solveItems(allItems, inputs);
  //console.log(itemMap.size);
  let itemStr = formatInfo(itemMap);
  let printResult = printFormat(itemStr);
  console.log(printResult);
 
}
function solveItems(allItems, inputs) {
  let countMap = new Map();
  for (let i = 0; i < inputs.length; i++) {
    if (!countMap.has(inputs[i])) {
      countMap.set(inputs[i], 1);
    } else {
      countMap.set(inputs[i], countMap.get(inputs[i]) + 1);
    }
  }
  //console.log(countMap.size);
  let itemMap = new Map();
  for (let j = 0; j < allItems.length; j++) {
    if (countMap.has(allItems[j]["barcode"])) {
      itemMap.set(allItems[j]["barcode"], {
        "name": allItems[j]["name"],
        "count": countMap.get(allItems[j]["barcode"]),
        "unit": allItems[j]["unit"],
        "price": allItems[j]["price"].toFixed(2),
        "diviTotal": (allItems[j]["price"] * countMap.get(allItems[j]["barcode"])).toFixed(2)
      })
      totalPrice += (allItems[j]["price"] * countMap.get(allItems[j]["barcode"]));
    }
  }
  return itemMap;
}
function formatInfo(itemMap) {
  let itemStr = "";
  itemMap.forEach(function (value) {
    itemStr += ("名称：" + value["name"] + "，数量：" + value["count"]
      + value["unit"] + "，单价：" + value["price"]
      + "(元)，小计：" + value["diviTotal"] + "(元)\n")
  })
  return itemStr;
}
function printFormat(itemStr) {
  let printResult = "***<没钱赚商店>收据***\n";
  printResult += itemStr;
  printResult += "----------------------\n";
  printResult += ("总计：" + totalPrice.toFixed(2) + "(元)\n");
  printResult += "**********************";
  return printResult;
}
