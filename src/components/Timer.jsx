import { useState } from 'react'
import { useEffect } from 'react'

export default function Timer({ timeLeft }) {
    return (
        <div className="flex items-center gap-3 rounded-md bg-indigo-200 px-2 py-1.5 font-medium text-indigo-900">
            Time Left{' '}
            <span className="flex items-center rounded-[4px] bg-gray-800 px-2.5 py-0.5 text-gray-100">
                {timeLeft > 9 ? timeLeft : `0${timeLeft}`}
            </span>
        </div>
    )
}
