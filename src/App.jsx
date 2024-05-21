import { useCallback, useEffect, useState } from 'react'
import Main from './components/Main'
import QuizContainer from './components/QuizContainer'
import QuizFooter from './components/QuizFooter'
import QuizHeader from './components/QuizHeader'
import QuizQuestion from './components/QuizQuestion'
import StartScreen from './components/StartScreen'
import EndScreen from './components/EndScreen'
import LoadingScreen from './components/LoadingScreen'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getQuestions } from './services/questionsApi'
import { formatData } from './helpers/formatData'
import { AnimatePresence } from 'framer-motion'

const categories = [
    'random',
    'music',
    'sport_and_leisure',
    'film_and_tv',
    'arts_and_literature',
    'history',
    'society_and_culture',
    'science',
    'geography',
    'food_and_drink',
    'general_knowledge',
]
const difficulties = ['all', 'easy', 'medium', 'hard']

export default function App() {
    const [quizState, setQuizState] = useState('idle')
    const [quizData, setQuizData] = useState([])
    const [fetch, setFetch] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [checked, setChecked] = useState(false)
    const [score, setScore] = useState(0)
    const [timeLeft, setTimeLeft] = useState(15) // Initialize timer to 15 seconds
    const [timerActive, setTimerActive] = useState(false)
    const [bar, setBar] = useState(false)
    const queryClient = useQueryClient()

    const [cat, setCat] = useState(categories[0])
    const [dif, setDif] = useState(difficulties[0])

    const handleQuizState = (s) => {
        setQuizState(s)
    }
    const handleStartQuiz = () => {
        setFetch(true)
    }
    const handleRestartQuiz = () => {
        setQuizState('idle')
        setQuizData([])
        setFetch(false)
        setCurrentIndex(0)
        setChecked(false)
        setScore(0)
        setTimeLeft(15)
        setTimerActive(false)
        queryClient.clear(['quiz-data'])
    }
    const handleNextQuestion = useCallback(() => {
        handleChecked(false)
        if (currentIndex + 1 === quizData.length) {
            handleQuizState('end')
            return
        } else {
            setCurrentIndex(0)
            setTimeLeft(15)
            setCurrentIndex(currentIndex + 1)
            setTimerActive(true)
            setBar(!bar)
        }
    }, [currentIndex, quizData.length, bar])
    const handleChecked = (value, isCorrect) => {
        if (isCorrect) setScore((prev) => prev + 1)
        setChecked(value)
        setTimerActive(false)
    }
    const { data, isLoading, isSuccess } = useQuery({
        queryKey: ['quiz-data'],
        queryFn: () => getQuestions(cat, dif),
        enabled: fetch,
    })

    useEffect(() => {
        if (isSuccess) {
            setQuizData(formatData(data))
            handleQuizState('active')
            setTimerActive(true)
        }
    }, [isSuccess, data])

    useEffect(() => {
        if (!timerActive) return
        if (!timeLeft) {
            handleNextQuestion()
            setTimeLeft(15)
            setTimerActive(true)
            return
        } // Exit if time left is 0

        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1)
        }, 1000)

        return () => clearInterval(intervalId) // Cleanup on unmount
    }, [timeLeft, timerActive, handleNextQuestion])

    return (
        <div className="flex min-h-dvh items-center justify-center overflow-hidden bg-gray-800 p-6 text-gray-700">
            <Main>
                <AnimatePresence>
                    <QuizContainer>
                        <QuizHeader
                            quizState={quizState}
                            checked={checked}
                            timeLeft={timeLeft}
                            bar={bar}
                        />
                        {quizState === 'idle' && !isLoading && (
                            <StartScreen
                                categories={categories}
                                difficulties={difficulties}
                                cat={cat}
                                setCat={setCat}
                                dif={dif}
                                setDif={setDif}
                            />
                        )}
                        {isLoading && <LoadingScreen />}

                        {quizState === 'active' &&
                            quizData.map((q, i) => {
                                return (
                                    <QuizQuestion
                                        key={i}
                                        data={quizData}
                                        currentIndex={currentIndex}
                                        checked={checked}
                                        handleChecked={handleChecked}
                                        current={i}
                                    />
                                )
                            })}

                        {quizState === 'end' && (
                            <EndScreen score={score} total={quizData.length} />
                        )}
                        <QuizFooter
                            quizState={quizState}
                            handleStartQuiz={handleStartQuiz}
                            handleNextQuestion={handleNextQuestion}
                            current={currentIndex + 1}
                            total={quizData.length}
                            handleRestartQuiz={handleRestartQuiz}
                            checked={checked}
                            isLoading={isLoading}
                        />
                    </QuizContainer>
                </AnimatePresence>
            </Main>
        </div>
    )
}
