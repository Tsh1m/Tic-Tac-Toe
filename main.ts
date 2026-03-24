let h2: HTMLHeadingElement = <HTMLHeadingElement>document.querySelector("h2");
let cards: NodeListOf<HTMLDivElement> = document.querySelectorAll(".card"); //la liste des cartes
let etat: string[] = ["x", "o", "void"]; //les etats possibles
let tours = 0; //tour des joueur
let coups = [0, 1, 2, 3, 4, 5, 6, 7, 8];

// click sur une carte
cards.forEach((element) => {
    element.addEventListener("click", (e) => {
        // si comp n'a pas jouer blocker la card
        tours %= 2;
        clicky(element, etat[tours]);
        check();
        tours += 1;

        tours %= 2;
        compTour();
        tours += 1;
    });
});

//si on click on met le signe correspondant au joueur
function clicky(el: HTMLDivElement, etat: string) {
    if (el.classList.contains("void")) el.classList.replace("void", etat);
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
    // console.table(cards);
}

function end(winner: string) {
    switch (winner) {
        case "x":
            h2.innerText = "Victoire";
            break;
        case "o":
            h2.innerText = "Echec";
            break;
        default:
            break;
    }
    locationbar;
}
function compTour() {
    //mettre une dive qui bloque l'ecran
    // place un cercle retire un element des coups
    setTimeout;
    let rnd = Math.floor(Math.random() * 8);
    cards[rnd].classList.replace("void", "o");
}
