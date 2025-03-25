export interface JsonRes {
    id: string,
    joke: string,
    status: number
}

/**
 * @joke the joke in string
 * @score (optional) only can be of 1, 2 or 3
 * @date date of the report in ISO format
 */
export interface Report {
    joke: string,
    score?: 1 | 2 | 3 | undefined;
    date: string
}