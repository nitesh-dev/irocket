
const arr = []

for (let i = 1; i <= 119; i += 2) {

    // const name = `intro-${numToString(i)}.jpg`
    // const name = `finishline-0${numToString(i)}.png`
    // const name = `rocket-h-${numToString(i, 2)}.png`
    const name = `rocket-j-placement-${numToString(i, 4)}.png`
    // finish-background-62.jpg
    

    arr.push(name)
}

console.log(JSON.stringify(arr))


function numToString(num = 0, count = 3) {
    let str = num.toString()

    return str.padStart(count, "0")
}

