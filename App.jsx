import { useEffect, useState } from 'react'
import Main from './components/Main'
import QuizContainer from './components/QuizContainer'
import QuizFooter from './components/QuizFooter'
import QuizHeader from './components/QuizHeader'
import QuizQuestion from './components/QuizQuestion'
import StartScreen from './components/StartScreen'
import EndScreen from './components/EndScreen'
import LoadingScreen from './components/LoadingScreen'
import { useQuery } from '@tanstack/react-query'
import { getQuestions } from './services/questionsApi'
import { formatData } from './helpers/formatData'
import { AnimatePresence, motion } from 'framer-motion'

export default function App() {
    const [quizState, setQuizState] = useState('idle')
    const [quizData, setQuizData] = useState([])
    const [fetch, setFetch] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [checked, setChecked] = useState(false)
    const [score, setScore] = useState(0)

    const handleQuizState = (s) => {
        setQuizState(s)
    }
    const handleStartQuiz = () => {
        setFetch(true)
    }
    const handleNextQuestion = () => {
        handleChecked(false)
        if (currentIndex + 1 === quizData.length) {
            handleQuizState('end')
            return
        } else setCurrentIndex(currentIndex + 1)
    }
    const handleChecked = (value, isCorrect) => {
        if (isCorrect) setScore((prev) => prev + 1)
        setChecked(value)
    }
    const { data, isLoading, isSuccess } = useQuery({
        queryKey: ['quiz-data'],
        queryFn: getQuestions,
        enabled: fetch,
    })

    useEffect(() => {
        if (isSuccess) {
            setQuizData(formatData(data))
            handleQuizState('active')
        }
    }, [isSuccess, data])

    return (
        <div className="flex min-h-dvh items-center justify-center bg-gray-800 p-6 text-gray-700">
            <Main>
                <QuizContainer>
                    <QuizHeader quizState={quizState} />
                    {quizState === 'idle' && !isLoading && <StartScreen />}
                    {isLoading && <LoadingScreen />}
                    {quizState === 'active' && (
                        <AnimatePresence mode="popLayout">
                            <motion.div
                                initial={{ x: 200 }}
                                animate={{ x: 0 }}
                                exit={{ x: -200 }}
                                transition={{ duration: 2 }}
                            >
                                <QuizQuestion
                                    data={quizData}
                                    currentIndex={currentIndex}
                                    checked={checked}
                                    handleChecked={handleChecked}
                                />
                            </motion.div>
                        </AnimatePresence>
                    )}
                    {quizState === 'end' && (
                        <EndScreen score={score} total={quizData.length} />
                    )}
                    <QuizFooter
                        quizState={quizState}
                        handleStartQuiz={handleStartQuiz}
                        handleNextQuestion={handleNextQuestion}
                        current={currentIndex + 1}
                        total={quizData.length}
                    />
                </QuizContainer>
            </Main>
        </div>
    )
}
