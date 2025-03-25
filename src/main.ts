import './styles/style.css'

const options = {
    headers: {
        'Accept': 'application/json'
    }
}

const button: HTMLButtonElement | null = document.querySelector<HTMLButtonElement>('#nextJoke');
const joke: HTMLElement = document.querySelector<HTMLParagraphElement>('#joke')!;

button?.addEventListener('click', _fetchJoke => {
    fetchJoke()
        .then((data) => {
            joke.innerHTML = `${data.joke}`
            console.log(data);
        })
        .catch((error) => console.log(error))
});

function fetchJoke(): Promise<{id: string, joke: string, status: number}> {
    return fetch('https://icanhazdadjoke.com/', options)
        .then((res) => {
            if (!res.ok) return Promise.reject("Failed to fetch dad joke!");
            return res.json();
        })
}

// Create joke at init
fetchJoke()
    .then((data) => {
        joke.innerHTML = `${data.joke}`
        console.log(data);
    })
    .catch((error) => console.log(error))