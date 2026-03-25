let h2: HTMLHeadingElement = <HTMLHeadingElement>document.querySelector("h2");
let cards: NodeListOf<HTMLDivElement> = document.querySelectorAll(".card"); //la liste des cartes
let block: HTMLDivElement = document.querySelector(".block") as HTMLDivElement;
let reset: HTMLButtonElement = document.querySelector(
    ".rest",
) as HTMLButtonElement;

let etat: string[] = ["x", "o", "void"]; //les etats possibles
let tours = 0; //tour des joueur
let coups = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let finish = 0;

reset.addEventListener("click", () => location.reload());

// click sur une carte
cards.forEach((element, key) =>
    element.addEventListener("click", (_e) => clicky(element, key)),
);

//si on click on met le signe correspondant au joueur
async function clicky(element: HTMLDivElement, key: number) {
    //si la case est vide on peut le mettre
    if (element.classList.contains("void") && tours === 0) {
        element.classList.replace("void", etat[tours]);
        //puis on verifie si l'on a gagner
        check();

        //on retire un coup
        coups = coups.filter((value) => value !== key);
        console.log(coups);

        //on change de tours
        tours += 1;
        tours %= 2;

        //l'ia  joue
        await compTour();
        tours += 1;
        tours %= 2;
        check();
    }
}

/**
 * Met en pause
 */
function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function check() {
    //ligne
    for (let i = 0; i < 7; i += 3)
        if (
            cards[i].classList[1] !== "void" &&
            cards[i].classList[1] === cards[i + 1].classList[1] &&
            cards[i + 1].classList[1] === cards[i + 2].classList[1]
        ) {
            end(cards[i].classList[1]);
        }

    //colonne
    for (let i = 0; i < 3; i++)
        if (
            cards[i].classList[1] !== "void" &&
            cards[i].classList[1] === cards[i + 3].classList[1] &&
            cards[i + 3].classList[1] === cards[i + 6].classList[1]
        ) {
            end(cards[i].classList[1]);
        }

    //diagonal gauche
    if (
        cards[0].classList[1] !== "void" &&
        cards[0].classList[1] === cards[4].classList[1] &&
        cards[4].classList[1] === cards[8].classList[1]
    )
        end(cards[0].classList[1]);

    //diagonal droite
    if (
        cards[2].classList[1] !== "void" &&
        cards[2].classList[1] === cards[4].classList[1] &&
        cards[4].classList[1] === cards[6].classList[1]
    )
        end(cards[2].classList[1]);

    //aucune combinaison
    if (
        cards[0].classList[1] !== "void" &&
        cards[1].classList[1] !== "void" &&
        cards[2].classList[1] !== "void" &&
        cards[3].classList[1] !== "void" &&
        cards[4].classList[1] !== "void" &&
        cards[5].classList[1] !== "void" &&
        cards[6].classList[1] !== "void" &&
        cards[7].classList[1] !== "void" &&
        cards[8].classList[1] !== "void"
    )
        end("");
}

function end(winner: string) {
    finish = 1;
    switch (winner) {
        case "x":
            block.style.background = "lightgreen";
            block.querySelector("h1").innerText = "Victoire";

            break;
        case "o":
            block.style.background = "salmon";
            block.querySelector("h1").innerText = "Echec";
            break;
        default:
            block.style.background = "grey";
            block.querySelector("h1").innerText = "Egalite";

            break;
    }
    block.style.display = "flex";
}

async function compTour() {
    if (!finish) {
        //on choisi un des coup disponible
        let rnd = Math.floor(Math.random() * (coups.length - 1));
        console.log(rnd);

        await sleep(rnd * 500);
        // on change la carte se trouvant a cette position
        cards[coups[rnd]].classList.replace("void", "o");

        // on retire la valeur se trouvant a cette position
        coups = coups.filter((value, index) => index !== rnd);
        console.log(coups);

        // block.style.display = "none";
    }
}
