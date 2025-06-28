const container = document.querySelector(".container");
const containerRef = document.querySelector(".container").parentNode;
const numberInput = document.querySelector("#square");

const bodyRef = document.querySelector("body").parentNode;
let size = 16;
let isdrawing = false;

let currentColor = "black";
let isRandomColor = false;

const randomColor = () => {
    const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F',];
    let hexColor = "";
    for (let i = 0; i < 6; i++) {
        if (hexColor.length == 6) {
            break;
        }
        hexColor += arr[Math.floor(Math.random() * arr.length)];
    }

    return hexColor;
}

const darkenLevel = 50;
const randomHSL = (darkenLevel) => {
    let hsl = new Array();
    hsl.push(parseInt(Math.floor(Math.random() * 360)));
    // hsl.push(parseInt(Math.floor(Math.random() * 100)));
    hsl.push(50);
    if (darkenLevel <= 100) {
        hsl[2] = darkenLevel;
    } else {
        hsl[2] = 50;
    }
    console.log(hsl);
    return hsl;
}



let btnDiv = document.createElement("div");
btnDiv.className = "btn-container";
btnDiv.style.cssText = `
    display : flex;
    gap :  10px;
    margin : 20px;
`;

// creating new button for random color and black color
let randomColorBtn = document.createElement("button");
randomColorBtn.textContent = "Random Color";
randomColorBtn.addEventListener("click", () => {
    isRandomColor = true;
    currentColor = randomColor();
})

let blackBtn = document.createElement("button");
blackBtn.className = "black";
blackBtn.textContent = "Black";
blackBtn.addEventListener("click", () => {
    isRandomColor = false;
    currentColor = "black";
})

const erazerBtn = document.createElement("button");
erazerBtn.className = "erazerBtn";
erazerBtn.textContent = "Erazer";
erazerBtn.addEventListener("click", () => {
    isRandomColor = false;
    currentColor = "#f0f0f0";
});

const clearBtn = document.createElement("button");
clearBtn.className = "clearBtn";
clearBtn.textContent = "Clear";
clearBtn.addEventListener("click", () => {
    document.querySelectorAll(".grid-cell").forEach(cell => {
        cell.style.backgroundColor = "#f0f0f0";
        cell.dataset.darkness = "0";
        cell.dataset.hue = "";
    })
});


// append btn
btnDiv.append(blackBtn, randomColorBtn, erazerBtn, clearBtn);
document.body.insertBefore(btnDiv, container);


btnDiv.appendChild(blackBtn);


blackBtn.addEventListener("click", () => {
    color = "black";
})


document.body.style.cssText = `
    display : flex ;
    flex-direction : column;
    justify-content : center;
    align-items : center;
    min-height: 100vh;
    font-family: Arial, sans-serif;
`;

numberInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {

        console.log(numberInput.value);
        const newSize = parseInt(numberInput.value); // avoid floating number
        if (newSize >= 1 && newSize <= 100) {
            size = newSize;
            drawGrid(size);
        } else {
            alert("Please enter a number between 1 and 64");
            numberInput.value = size;
            numberInput.focus();
        }
    }
});

document.addEventListener("DOMContentLoaded", () => {
    drawGrid(size);
})


const drawGrid = (size) => {

    container.innerHTML = "";
    makeContainer(size);
    for (let i = 0; i < size * size; i++) {
        let gridCell = document.createElement("div");
        gridCell.className = "grid-cell";
        const cellSize = Math.min(20, 500 / size);
        gridCell.style.cssText = `
            height: ${cellSize}px;
            width: ${cellSize}px;
            background-color: #f0f0f0;
            border: 1px solid #ddd;
            user-select : none;
            transition: background-color 0.09s;

        `;

        // Add hover effect
        gridCell.addEventListener('mousedown', (e) => {
            isdrawing = true;
            e.preventDefault();
            const randomHSLColor  = randomHSL();
            // gridCell.style.backgroundColor = isRandomColor ? `#${randomColor()}` : currentColor;
            gridCell.style.backgroundColor = isRandomColor ? `hsl(${randomHSLColor[0]},${randomHSLColor[1]}%, ${randomHSLColor[2]}% )` : currentColor;
            console.log(`${randomHSLColor[0]}`);
            console.log(`${randomHSLColor[1]}%`);
            console.log(`${randomHSLColor[2]}%`);
            randomHSL[2] += 10;
            randomHSL(randomHSLColor[2] + 10);
            console.log("new opacity : " + randomHSLColor[2]);



        });

        gridCell.addEventListener('mouseover', () => {
            if (isdrawing) {
                const randomHSLColor  = randomHSL();
                // gridCell.style.backgroundColor = isRandomColor ? `#${randomColor()}` : currentColor;
               gridCell.style.backgroundColor = isRandomColor ? `hsl(${randomHSLColor[0]},${randomHSLColor[1]}%, ${randomHSLColor[2]}% )` : currentColor;
                console.log(`${randomHSLColor[0]}`);
                console.log(`${randomHSLColor[1]}%`);
                console.log(`${randomHSLColor[2]}%`);
                randomHSL[2] += 10;

            }
        })

        gridCell.addEventListener("mouseup", () => {
            isdrawing = false;
        })

        container.appendChild(gridCell);
    }

    // stop when mouse is released

    document.addEventListener("mouseup", () => {
        isdrawing = false;
    })
}

// const drawGrid = (size) => {
//     container.innerHTML = "";
//     makeContainer(size);

//     for (let i = 0; i < size * size; i++) {
//         let cell = document.createElement("div");
//         cell.className = "grid-cell";
//         const cellSize = Math.min(20, 500 / size);

//         cell.style.cssText = `
//             height: ${cellSize}px;
//             width: ${cellSize}px;
//             background-color: #f0f0f0;
//             border: 1px solid #ddd;
//             user-select: none;
//             transition: background-color 0.1s;
//         `;

//         cell.dataset.darkness = "0";
//         cell.dataset.rgb = "";

//         const paintCell = (cell) => {
//             let darkness = parseInt(cell.dataset.darkness);
//             if (darkness >= 10) return;
//             darkness++;
//             cell.dataset.darkness = darkness;

//             if (currentColor === "#f0f0f0") {
//                 cell.style.backgroundColor = currentColor;
//                 cell.dataset.darkness = "0";
//                 cell.dataset.rgb = "";
//                 return;
//             }

//             if (isRandomColor) {
//                 // Assign and store original RGB color
//                 if (!cell.dataset.rgb) {
//                     const r = Math.floor(Math.random() * 256);
//                     const g = Math.floor(Math.random() * 256);
//                     const b = Math.floor(Math.random() * 256);
//                     cell.dataset.rgb = `${r},${g},${b}`;
//                 }

//                 const [r, g, b] = cell.dataset.rgb.split(",").map(Number);
//                 const factor = 1 - darkness * 0.1;

//                 const newR = Math.floor(r * factor);
//                 const newG = Math.floor(g * factor);
//                 const newB = Math.floor(b * factor);

//                 cell.style.backgroundColor = `rgb(${newR}, ${newG}, ${newB})`;

//             } else {
//                 // Black darkening via HSL
//                 const lightness = 100 - darkness * 10;
//                 cell.style.backgroundColor = `hsl(0, 0%, ${lightness}%)`;
//             }
//         };

//         cell.addEventListener("mousedown", () => {
//             isdrawing = true;
//             paintCell(cell);
//         });

//         cell.addEventListener("mouseover", () => {
//             if (isdrawing) {
//                 paintCell(cell);
//             }
//         });

//         cell.addEventListener("mouseup", () => {
//             isdrawing = false;
//         });

//         container.appendChild(cell);
//     }

//     document.addEventListener("mouseup", () => {
//         isdrawing = false;
//     });
// };

function makeContainer(size) {
    container.style = `
        display : grid;
        grid-template-rows : repeat(${size}, 1fr);
        grid-template-columns : repeat(${size}, 1fr);
        gap : 1px;
        width : fit-content;
        margin: 20px auto;
        border: 2px solid #333;
        padding: 2px;
        background: #ddd;
        `;


}
