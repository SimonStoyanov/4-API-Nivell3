import {AltJokeRes, JsonRes, Report} from './interfaces.ts'

const options = {
    headers: {
        'Accept': 'application/json'
    }
}

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
    const res = await fetch('https://icanhazdadjoke.com/', options);
    if (!res.ok) return Promise.reject("Failed to fetch dad joke!");
    return await res.json();
}

async function fetchJokeAlt(): Promise<AltJokeRes> {
    joke.innerHTML = "<br/>L o a d i n g . . .";
    button.disabled = true;

    const res = await fetch('https://api.api-ninjas.com/v1/jokes', { 
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
            return data.joke;
        })
        .catch((error) => console.log(error))
    } else {
        fetchJokeAlt()
        .then((data) => {
            joke.innerHTML = `${data[0].joke}`;
            currJoke = data[0].joke;
            console.log(data[0].joke);
        })
    }
}

function sendReport(): void {
    jokeReport.push({
        joke: currJoke, 
        score: currScore, 
        date: new Date().toISOString()
    })
    console.log(jokeReport);
    getJoke();
}