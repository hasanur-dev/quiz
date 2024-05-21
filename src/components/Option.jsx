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
            className={`${checked ? 'pointer-events-none' : ''} 
                ${correct ? 'border-green-200/60 bg-green-200/60 text-green-800  hover:bg-green-200/70' : 'hover:bg-indigo-200/60'} 
                ${wrong ? ' border-red-200 bg-red-200/70 text-red-800 hover:bg-red-200/70' : 'hover:bg-indigo-200/60'} cursor-pointer rounded-md border border-indigo-300 bg-indigo-50/50 px-4 py-2.5 font-medium  text-gray-800 transition-colors duration-200`}
        >
            <p>{option}</p>
        </button>
    )
}
