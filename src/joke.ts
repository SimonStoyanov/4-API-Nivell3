import {JsonRes, Report} from './interfaces.ts'

const options = {
    headers: {
        'Accept': 'application/json'
    }
}

const button: HTMLButtonElement | null = document.querySelector<HTMLButtonElement>('#nextJoke');
const score_1: HTMLButtonElement | null = document.querySelector<HTMLButtonElement>('#score_1');
const score_2: HTMLButtonElement | null = document.querySelector<HTMLButtonElement>('#score_2');
const score_3: HTMLButtonElement | null = document.querySelector<HTMLButtonElement>('#score_3');
const joke: HTMLElement = document.querySelector<HTMLParagraphElement>('#joke')!;

let jokeReport: Array<Report> = [];
let currScore: 1 | 2 | 3 | undefined;
let currJoke: JsonRes;

button?.addEventListener('click', () => sendReport());
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
    const res = await fetch('https://icanhazdadjoke.com/', options);
    if (!res.ok) return Promise.reject("Failed to fetch dad joke!");
    return await res.json();
}

export function getJoke(): void {
    currScore = undefined; // resets currScore
    resetScoreState();
    fetchJoke()
        .then((data) => {
            joke.innerHTML = `${data.joke}`
            currJoke = data;
            return data.joke;
        })
        .catch((error) => console.log(error))
}

function sendReport(): void {
    jokeReport.push({
        joke: currJoke.joke, 
        score: currScore, 
        date: new Date().toISOString()
    })
    console.log(jokeReport);
    getJoke();
}