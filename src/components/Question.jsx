import { useEffect, useState } from 'react'
import Option from './Option'
import OptionsContainer from './OptionsContainer'
import { AnimatePresence } from 'framer-motion'

export default function Question({
    current,
    question,
    checked,
    handleChecked,
}) {
    const [answer, setAnswer] = useState('')
    const handleAnswer = (answer) => {
        setAnswer(answer)
        handleChecked(true, answer === question.correctAnswer)
    }
    return (
        <>
            <h2 className="text-2xl font-semibold">
                {current}. {question.question.text}
            </h2>
            <OptionsContainer>
                {question.options.map((op) => {
                    return (
                        <Option
                            key={op}
                            correct={checked && op === question.correctAnswer}
                            wrong={
                                op === answer &&
                                answer !== question.correctAnswer
                            }
                            option={op}
                            checked={checked}
                            handleAnswer={handleAnswer}
                        />
                    )
                })}
            </OptionsContainer>
        </>
    )
}
