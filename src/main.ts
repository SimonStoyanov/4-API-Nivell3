import './styles/style.css'

const options = {
    headers: {
        'Accept': 'application/json'
    }
}

interface JsonRes {
    id: string,
    joke: string,
    status: number
}

const button: HTMLButtonElement | null = document.querySelector<HTMLButtonElement>('#nextJoke');
const joke: HTMLElement = document.querySelector<HTMLParagraphElement>('#joke')!;

button?.addEventListener('click', getJoke);

async function fetchJoke(): Promise<JsonRes> {
    const res = await fetch('https://icanhazdadjoke.com/', options);
    if (!res.ok) return Promise.reject("Failed to fetch dad joke!");
    return await res.json();
}

function getJoke(): void {
    fetchJoke()
        .then((data) => {
        joke.innerHTML = `${data.joke}`
        console.log(data);
        })
        .catch((error) => console.log(error))
}

// Create joke at init
getJoke();