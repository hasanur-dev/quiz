export function formatData(arr) {
    console.log(arr)
    const newArr = arr.map((ques) => {
        ques.options = [...ques.incorrectAnswers]
        const randomNumber = Math.floor(Math.random() * 4)
        ques.options.splice(randomNumber, 0, ques.correctAnswer)
        return ques
    })
    return newArr
}
