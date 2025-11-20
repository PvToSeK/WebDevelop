let brnContainer = document.getElementById("brnContainer");
let resetBtn = document.getElementById("resetBtn");
let index = 2;
let generator = null;
const MAX = 3;  
let totalSum = 0;



function genBtn() {
    if (index > MAX) {
        clearInterval(generator);
        return;
    }

    let newBtn = document.createElement("button");
    newBtn.textContent = index;
    newBtn.value = index;


    newBtn.addEventListener("click", function () {
        totalSum += Number(this.value);
        totalSpan.textContent = totalSum;

        this.remove(); 
    });

    brnContainer.append(newBtn);
    index++;
}



function startGenerating() {
    generator = setInterval(genBtn, 1000);
}

startGenerating();



resetBtn.addEventListener("click", function () {
    clearInterval(generator);   
    totalSum = 0;
    index = 1;      

    brnContainer.innerHTML= "";
                 

    startGenerating();           
});
