export default function Option({
    option,
    correct,
    wrong,
    handleAnswer,
    checked,
}) {
    return (
        // <button
        //     onClick={() => handleAnswer(option)}
        //     className={`${correct ? 'bg-green-200' : 'hover:bg-indigo-200/60'} ${checked ? 'pointer-events-none' : ''}  ${wrong ? ' border-red-200 bg-red-200/70 text-red-800 hover:bg-red-200/70' : 'hover:bg-indigo-200/60'} correct cursor-pointer rounded-md border border-indigo-300 bg-indigo-50/50 px-4 py-2.5 font-medium text-gray-800 transition-colors duration-200`}
        // >
        //     <p>{option}</p>
        // </button>
        <button
            onClick={() => handleAnswer(option)}
           className={`${correct ? 'correct' : ''} ${wrong ? 'wrong' : ''}`}
        >
            {option}
        </button>
    )
}
