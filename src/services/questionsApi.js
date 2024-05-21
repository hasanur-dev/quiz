export async function getQuestions(cat, dif) {
    console.log(cat, dif)
    const url = `https://the-trivia-api.com/v2/questions?limit=10&categories=${cat}&${
        dif !== 'all' ? `difficulties=${dif}` : ''
    }`
    console.log(url)
    const res = await fetch(url)
    const data = await res.json()
    return data
}
