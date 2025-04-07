import {AltJokeRes, JsonRes, Report} from './interfaces.ts'

const API_JOKE_0: string = 'https://icanhazdadjoke.com/';
const API_JOKE_1: string = 'https://api.api-ninjas.com/v1/jokes';

const options = {
    headers: {
        'Accept': 'application/json'
    }
}

const bgImg: string[] = [
    "data:image/svg+xml;utf8,%3Csvg viewBox=%220 0 1000 1000%22 xmlns=%22http:%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cdefs%3E%3CclipPath id=%22a%22%3E%3Cpath fill=%22currentColor%22 d=%22M735 640.5q-73 140.5-278.5 216T134 716Q17 500 162 332.5t361-207Q739 86 773.5 293T735 640.5Z%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3Cg clip-path=%22url(%23a)%22%3E%3Cpath fill=%22%23f7e545%22 d=%22M735 640.5q-73 140.5-278.5 216T134 716Q17 500 162 332.5t361-207Q739 86 773.5 293T735 640.5Z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E",
    "data:image/svg+xml;utf8,%3Csvg viewBox=%220 0 1000 1000%22 xmlns=%22http:%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cdefs%3E%3CclipPath id=%22a%22%3E%3Cpath fill=%22currentColor%22 d=%22M858.5 689.5Q719 879 497 884T229 694.5Q183 500 218.5 287t240-141q204.5 72 372 213t28 330.5Z%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3Cg clip-path=%22url(%23a)%22%3E%3Cpath fill=%22%23f7e545%22 d=%22M858.5 689.5Q719 879 497 884T229 694.5Q183 500 218.5 287t240-141q204.5 72 372 213t28 330.5Z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E",
    "data:image/svg+xml;utf8,%3Csvg viewBox=%220 0 1000 1000%22 xmlns=%22http:%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cdefs%3E%3CclipPath id=%22a%22%3E%3Cpath fill=%22currentColor%22 d=%22M754 660q-69 160-238 132.5t-331.5-160Q22 500 140 290.5T480.5 115Q703 149 763 324.5T754 660Z%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3Cg clip-path=%22url(%23a)%22%3E%3Cpath fill=%22%23f7e545%22 d=%22M754 660q-69 160-238 132.5t-331.5-160Q22 500 140 290.5T480.5 115Q703 149 763 324.5T754 660Z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E",
    "data:image/svg+xml;utf8,%3Csvg viewBox=%220 0 1000 1000%22 xmlns=%22http:%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cdefs%3E%3CclipPath id=%22a%22%3E%3Cpath fill=%22currentColor%22 d=%22M795 699q-65 199-292 194T197.5 694Q119 500 222 348.5T507.5 184Q690 171 775 335.5T795 699Z%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3Cg clip-path=%22url(%23a)%22%3E%3Cpath fill=%22%23f7e545%22 d=%22M795 699q-65 199-292 194T197.5 694Q119 500 222 348.5T507.5 184Q690 171 775 335.5T795 699Z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E"      
];

const card: HTMLDivElement = document.querySelector<HTMLDivElement>('#card')!;
const button: HTMLButtonElement = document.querySelector<HTMLButtonElement>('#nextJoke')!;
const score_1: HTMLButtonElement | null = document.querySelector<HTMLButtonElement>('#score_1');
const score_2: HTMLButtonElement | null = document.querySelector<HTMLButtonElement>('#score_2');
const score_3: HTMLButtonElement | null = document.querySelector<HTMLButtonElement>('#score_3');
const joke: HTMLElement = document.querySelector<HTMLParagraphElement>('#joke')!;

let jokeReport: Array<Report> = [];
let currScore: 1 | 2 | 3 | undefined;
let currJoke: string;

button.addEventListener('click', () => sendReport());
handleScore(score_1, 1);
handleScore(score_2, 2);
handleScore(score_3, 3);

function resetScoreState() {
    [score_1, score_2, score_3].forEach(btn => {
        if (btn) btn.style.backgroundColor = "";
    });
}

function handleScore(btn: HTMLButtonElement | null, score: 1 | 2 | 3): void {
    btn?.addEventListener('click', () => {
        resetScoreState();
        if (btn) btn.style.backgroundColor = "lightblue";
        currScore = score;
    })
}

async function fetchJoke(): Promise<JsonRes> {
    const res = await fetch(API_JOKE_0, options);
    if (!res.ok) return Promise.reject("Failed to fetch dad joke!");
    return await res.json();
}

async function fetchJokeAlt(): Promise<AltJokeRes> {
    joke.innerHTML = "<br/>L o a d i n g . . .";
    button.disabled = true;

    const res = await fetch(API_JOKE_1, { 
        headers: {
            'X-Api-Key': '5NgpNoCFZF3q9FM1Ko4lTA==WDBFAhey5Ldv1607',
            'Content-Type': 'application/json'
        }    
    });

    button.disabled = false;
    if (!res.ok) return Promise.reject("Failed to fetch dad joke!");
    return await res.json();
}

export function getJoke(): void {
    currScore = undefined; // resets currScore
    resetScoreState();

    if (Math.random() < 0.5) {
        fetchJoke()
        .then((data) => {
            joke.innerHTML = `${data.joke}`;
            currJoke = data.joke;
        })
        .catch((error) => console.log(error))
    } else {
        fetchJokeAlt()
        .then((data) => {
            joke.innerHTML = `${data[0].joke}`;
            currJoke = data[0].joke;
        })
    }
}

let bgIterator = 0;

function sendReport(): void {
    jokeReport.push({
        joke: currJoke, 
        score: currScore, 
        date: new Date().toISOString()
    })
    getJoke();
    if (bgIterator >= bgImg.length) bgIterator = 0;
    card.style.setProperty('--bg-image', `url('${bgImg[bgIterator++]}')`);
}