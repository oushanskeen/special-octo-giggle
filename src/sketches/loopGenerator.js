function* bblSort(arr) {
    for (var i = 0; i < arr.length; i++) {
        // Last i elements are already in place
        for (var j = 0; j < (arr.length - i - 1); j++) {
            // Checking if the item at present iteration
            // is greater than the next iteration
            if (arr[j] > arr[j + 1]) {
                // If the condition is true
                // then swap them
                var temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
            }
            yield arr;
        }
    }
    // Print the sorted array
    console.log(arr);
}

const sort = bblSort([1,4,2,3,1,8,4])
console.log("SORT VALUE", sort.next().value)
console.log("SORT VALUE", sort.next().value)
console.log("SORT VALUE", sort.next().value)
console.log("SORT VALUE", sort.next().value)
console.log("SORT VALUE", sort.next().value)
console.log("SORT VALUE", sort.next().value)
console.log("SORT VALUE", sort.next().value)
console.log("SORT VALUE", sort.next().value)
console.log("SORT VALUE", sort.next().value)
console.log("SORT VALUE", sort.next().value)
console.log("SORT VALUE", sort.next().value)
console.log("SORT VALUE", sort.next().value)
console.log("SORT VALUE", sort.next().value)
console.log("SORT VALUE", sort.next().value)
console.log("SORT VALUE", sort.next().value)
