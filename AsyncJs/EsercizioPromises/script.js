let messaggio = document.getElementById("messaggio")
async function f() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("fatto!"), 1000);
  });

  let result = await promise; // attende fino a quando la promise si risolve
 messaggio.textContent = result;
  // "fatto!"
}

f();
