const itemObject = [
  { quantity: 1, price: 200 },
  { quantity: 3, price: 350 },
  { quantity: 5, price: 400 },
];

/**
 * Given the array, implement a function for generating a new array which doubles the
 quantity and price in each object.
* @param {any[]} array - itemObject array.
* @return {any[]} new array
*/
function doubleQuantity(array) {
  return array.map((item) => {
    return {
      quantity: item.quantity * 2,
      price: item.price * 2,
    };
  });
}

/**
 * Given the array, implement a function for generating a new array which contains item
quantity > 2 and price > 300 only.
 * @param {any[]} array - itemObject array. 
 * @return {any[]} new array
 */
function filterArray(array) {
  return array.filter((item) => item.quantity > 2 && item.price > 300);
}

/**
 * Given the array, implement a function to calculate the total value of the items.
 * @param {any[]} array - itemObject array.
 * @return {number} total value
 */
function totalValue(array) {
  return array.reduce((pre, cur) => {
    if (pre.quantity && pre.price) {
      return pre.quantity * pre.price + cur.price * cur.quantity;
    }
    return pre + cur.price * cur.quantity;
  });
}

// console.log(itemObject);
console.log(doubleQuantity(itemObject));
console.log(filterArray(itemObject));
console.log(totalValue(itemObject));
// console.log(itemObject);

// =============================== Line Break ==========================================================

const string = ` Perhaps The Easiest-to-understand Case For Reduce Is To Return
The Sum Of All The Elements In An Array `;

/**
 * Given the string, implement a function to remove all the non-alphabet characters and
extra space in the string and convert the string to all lowercase.
 * @param {string} string - input string
 * @return {string} modified string
 */
function removeNonAlphabet(string) {
  return string
    .split(" ")
    .map((word) => {
      word = word.toLowerCase();
      if (!word.includes("\n")) {
        // remove all non-alphabet characters
        word = word.replaceAll(/[^a-z]/gi, "");
      }

      return word;
    })
    .filter((item) => item) //remove excess empty strings
    .join(" ");
}

console.log(removeNonAlphabet(string));

// =============================== Line Break ==========================================================

const first = [
  { uuid: 2, name: "test" },
  { uuid: 5, name: "test5" },
  { uuid: 3, name: "test3" },
];

const second = [
  { uuid: 6, role: "pm" },
  { uuid: 4, role: "engineer" },
  { uuid: 1, role: "manager" },
  { uuid: 2, role: "associate" },
];

/**
 * Implement a function to merge two arrays of objects on uuid, but first has uuid and
name, second has uuid and role. With the not existing property, fill with null. Sort
according to uuid after merge.
 * @param {any[]} array1 
 * @param {any[]} array2 
 */
function mergeArrays(...arrays) {
  const keys = [];
  let temp = [];
  // retrieve keys from array1 and array2
  for (const array of arrays) {
    retrieveKeys(array, keys);
  }

  temp = temp
    .concat(...arrays)
    .map((item) => {
      for (const key of keys) {
        if (!item[key]) {
          item[key] = null;
        }
      }
      return item;
    })
    .sort((a, b) => a.uuid - b.uuid);

  //remove duplicate when uuid conflict
  let curId, index;
  for (let i = 0; i < temp.length; i++) {
    if (!curId || curId !== temp[i].uuid) {
      curId = temp[i].uuid;
      index = i;
    } else {
      for (const key of keys) {
        if (!temp[index][key]) {
          temp[index][key] = temp[i][key];
        }
      }
      temp.splice(i, 1);
    }
  }
  return temp;
}

/**
 * Retrieve keys from array and store them in keys array.
 * @param {any[]} array
 * @param {string[]} keys
 */
function retrieveKeys(array, keys) {
  for (const item of array) {
    const tempKeys = Object.keys(item);
    for (const key of tempKeys) {
      if (keys.indexOf(key) === -1) {
        keys.push(key);
      }
    }
  }
}

console.log(mergeArrays(first, second));
