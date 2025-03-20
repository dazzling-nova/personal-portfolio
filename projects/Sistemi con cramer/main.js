class Matrix2x2 {
    constructor(p11, p12, p21, p22) {
        this.p11 = p11;
        this.p12 = p12;
        this.p21 = p21;
        this.p22 = p22;
    }

    determinant() {
        return this.p11 * this.p22 - this.p12 * this.p21;
    }
}

class Matrix3x3 {
    constructor(p11, p12, p13, p21, p22, p23, p31, p32, p33) {
        this.p11 = p11;
        this.p12 = p12;
        this.p13 = p13;
        this.p21 = p21;
        this.p22 = p22;
        this.p23 = p23;
        this.p31 = p31;
        this.p32 = p32;
        this.p33 = p33;
    }

    determinant() {
        return (
            this.p11 * this.p22 * this.p33 +
            this.p12 * this.p23 * this.p31 +
            this.p13 * this.p21 * this.p32 -
            this.p13 * this.p22 * this.p31 -
            this.p11 * this.p23 * this.p32 -
            this.p12 * this.p21 * this.p33
        );
    }
}

function solve2x2(a1, a2, b1, b2, c1, c2) {
    if (a1 / a2 == b1 / b2) {
        if (c1 / c2 != a1 / a2) return ["imp", "imp", "imp"];
        return ["indet", "indet", "indet"];
    }

    let A = new Matrix2x2(a1, b1, a2, b2);
    let Ax = new Matrix2x2(c1, b1, c2, b2);
    let Ay = new Matrix2x2(a1, c1, a2, c2);

    let det = A.determinant();
    let detX = Ax.determinant();
    let detY = Ay.determinant();

    let x = detX / det;
    let y = detY / det;

    return [x, y];
}

function solve3x3(a1, a2, a3, b1, b2, b3, c1, c2, c3, d1, d2, d3) {
    let A = new Matrix3x3(a1, b1, c1, a2, b2, c2, a3, b3, c3);
    let Ax = new Matrix3x3(d1, b1, c1, d2, b2, c2, d3, b3, c3);
    let Ay = new Matrix3x3(a1, d1, c1, a2, d2, c2, a3, d3, c3);
    let Az = new Matrix3x3(a1, b1, d1, a2, b2, d2, a3, b3, d3);

    let det = A.determinant();
    let detX = Ax.determinant();
    let detY = Ay.determinant();
    let detZ = Az.determinant();

    if (det == 0) return ["imp/indet", "imp/indet", "imp/indet"];

    let x = detX / det;
    let y = detY / det;
    let z = detZ / det;

    return [x, y, z];
}

// console.log(solve2x2(3, 9, -2, -6, 1, 3));
// console.log(solve3x3(1, 2, 4, 1, -1, 2, 1, 1, -1, 3, 2, 5));

const form1 = document.querySelector("#form1");
const form2 = document.querySelector("#form2");
const result1 = document.querySelector("#result1");
const result2 = document.querySelector("#result2");
const result3 = document.querySelector("#result3");

form1.addEventListener("submit", (e) => {
    e.preventDefault();

    let coeff = Array.from(document.querySelectorAll("#form1 input")).reduce(
        (acc, input) => ({ ...acc, [input.id]: input.value }),
        {}
    );

    let solution = solve2x2(
        coeff.input1,
        coeff.input2,
        coeff.input3,
        coeff.input4,
        coeff.input5,
        coeff.input6
    );

    result1.innerHTML = `x = ${solution[0]}`;
    result2.innerHTML = `y = ${solution[1]}`;
});

form2.addEventListener("submit", (e) => {
    e.preventDefault();

    let coeff = Array.from(document.querySelectorAll("#form2 input")).reduce(
        (acc, input) => ({ ...acc, [input.id]: input.value }),
        {}
    );

    let solution = solve3x3(
        coeff.input7,
        coeff.input8,
        coeff.input9,
        coeff.input10,
        coeff.input11,
        coeff.input12,
        coeff.input13,
        coeff.input14,
        coeff.input15,
        coeff.input16,
        coeff.input17,
        coeff.input18
    );

    result1.innerHTML = `x = ${solution[0]}`;
    result2.innerHTML = `y = ${solution[1]}`;
    result3.innerHTML = `z = ${solution[2]}`;
});

const link1 = document.querySelector("#link1");
const link2 = document.querySelector("#link2");

link1.addEventListener("click", (e) => {
    e.preventDefault();

    link1.classList.add("selected-page");
    link2.classList.remove("selected-page");

    form1.classList.remove("hidden-form");
    form2.classList.add("hidden-form");

    result3.classList.add("hidden-result");
});

link2.addEventListener("click", (e) => {
    e.preventDefault();

    link2.classList.add("selected-page");
    link1.classList.remove("selected-page");

    form2.classList.remove("hidden-form");
    form1.classList.add("hidden-form");

    result3.classList.remove("hidden-result");
});
