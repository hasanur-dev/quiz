export default function Option({
    option,
    correct,
    wrong,
    handleAnswer,
    checked,
}) {
    return (
        <button
            onClick={() => handleAnswer(option)}
            className={`${checked ? 'pointer-events-none' : ''} ${correct ? 'correct' : 'hover:bg-indigo-200/60'} ${wrong ? 'wrong' : 'hover:bg-indigo-200/60'} cursor-pointer rounded-md border border-indigo-300 bg-indigo-50/50 px-4 py-2.5 font-medium text-gray-800 transition-colors duration-200`}
        >
            {option}
        </button>
    )
}
