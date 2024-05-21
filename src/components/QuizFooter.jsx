import { AnimatePresence, motion } from 'framer-motion'
import Button from './Button'

export default function QuizFooter({
    quizState,
    handleStartQuiz,
    handleNextQuestion,
    current,
    total,
    handleRestartQuiz,
    checked,
    isLoading,
}) {
    return (
        <footer
            className={`${quizState === 'active' ? 'justify-between' : 'justify-center'} flex items-center border-t-2 border-gray-200 px-7 py-5`}
        >
            <AnimatePresence mode="popLayout">
                {quizState === 'active' && (
                    <>
                        <p className="py-2">
                            <span className="text-lg font-medium">
                                {current}
                            </span>{' '}
                            of{' '}
                            <span className="text-lg font-medium">{total}</span>{' '}
                            Questions
                        </p>
                        {checked && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                            >
                                <Button onClick={handleNextQuestion}>
                                    Next
                                </Button>
                            </motion.div>
                        )}
                    </>
                )}
                {quizState === 'idle' && !isLoading && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                    >
                        <Button onClick={handleStartQuiz}>Start Quiz</Button>
                    </motion.div>
                )}
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                    >
                        <Button disabled={true}>Loading...</Button>
                    </motion.div>
                )}

                {quizState === 'end' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                    >
                        <Button onClick={handleRestartQuiz}>
                            Restart Quiz
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </footer>
    )
}
