export default function Button({ children, disabled, onClick }) {
    return (
        <button
            onClick={() => {
                if (onClick) onClick()
            }}
            className={`${disabled ? 'pointer-events-none' : ''} rounded-md bg-indigo-500 px-7 py-2.5 tracking-wide text-gray-50 transition-all duration-200 hover:bg-indigo-600 hover:shadow-md active:scale-95`}
        >
            {children}
        </button>
    )
}
