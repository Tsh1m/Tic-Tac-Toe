"use strict";
let h2 = document.querySelector("h2"); //les tours
let cards = document.querySelectorAll(".card"); //la liste des cartes
let reset = document.querySelector(".rest"); //boutton relance
let etat = ["x", "o", "void"]; //etats possibles
let tours = 0; //tour des joueur
let coups = [0, 1, 2, 3, 4, 5, 6, 7, 8]; //coup disponible
let finish = 0; //fin de parti
reset.addEventListener("click", () => location.reload());
// click sur une carte
cards.forEach((element, key) => element.addEventListener("click", (_e) => clicky(element, key)));
//si on click on met le signe correspondant au joueur
async function clicky(element, key) {
    //si la case est vide on peut mettre un X
    if (element.classList.contains("void") && tours === 0) {
        element.classList.replace("void", etat[tours]);
        //puis on verifie si l'on a gagner
        check();
        h2.innerText = "Au tour de l'ia";
        //on retire un coup
        coups = coups.filter((value) => value !== key);
        console.log(coups);
        //on change de tours
        tours += 1;
        tours %= 2;
        //l'ia  joue
        await iaTour();
        tours += 1;
        tours %= 2;
        check();
    }
}
/**
 * Met en pause
 */
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
function check() {
    //ligne
    for (let i = 0; i < 7; i += 3)
        if (cards[i].classList[1] !== "void" &&
            cards[i].classList[1] === cards[i + 1].classList[1] &&
            cards[i + 1].classList[1] === cards[i + 2].classList[1]) {
            end(cards[i].classList[1]);
        }
    //colonne
    for (let i = 0; i < 3; i++)
        if (cards[i].classList[1] !== "void" &&
            cards[i].classList[1] === cards[i + 3].classList[1] &&
            cards[i + 3].classList[1] === cards[i + 6].classList[1]) {
            end(cards[i].classList[1]);
        }
    //diagonal gauche
    if (cards[0].classList[1] !== "void" &&
        cards[0].classList[1] === cards[4].classList[1] &&
        cards[4].classList[1] === cards[8].classList[1])
        end(cards[0].classList[1]);
    //diagonal droite
    else if (cards[2].classList[1] !== "void" &&
        cards[2].classList[1] === cards[4].classList[1] &&
        cards[4].classList[1] === cards[6].classList[1])
        end(cards[2].classList[1]);
    //aucune combinaison
    else if (cards[0].classList[1] !== "void" &&
        cards[1].classList[1] !== "void" &&
        cards[2].classList[1] !== "void" &&
        cards[3].classList[1] !== "void" &&
        cards[4].classList[1] !== "void" &&
        cards[5].classList[1] !== "void" &&
        cards[6].classList[1] !== "void" &&
        cards[7].classList[1] !== "void" &&
        cards[8].classList[1] !== "void")
        end("");
}
function end(winner) {
    finish = 1;
    switch (winner) {
        case "x":
            document.body.style.background = "lightgreen";
            h2.innerText = "Victoire";
            break;
        case "o":
            document.body.style.background = "salmon";
            h2.innerText = "Echec";
            break;
        default:
            document.body.style.background = "grey";
            h2.innerText = "Egalite";
            break;
    }
    reset.style.display = "block";
}
async function iaTour() {
    if (!finish) {
        let sec = Math.floor(Math.random() * 6) + 2; //on attend un peu
        await sleep(sec * 500);
        //on choisi un des coup disponible aleatoirement
        let rnd = Math.floor(Math.random() * (coups.length - 1));
        // on change la carte se trouvant a cette position
        cards[coups[rnd]].classList.replace("void", "o");
        // on retire la valeur se trouvant a cette position
        coups = coups.filter((value, index) => index !== rnd);
        h2.innerText = "A votre tour";
    }
}
