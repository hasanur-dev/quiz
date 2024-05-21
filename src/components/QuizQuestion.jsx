import Question from './Question'
import { AnimatePresence, motion } from 'framer-motion'

export default function QuizQuestion({
    data,
    currentIndex,
    handleChecked,
    checked,
    current,
}) {
    return (
        <AnimatePresence mode="popLayout">
            {current === currentIndex && (
                <motion.section
                    initial={{ x: 300, opacity: 0, scale: 0.3 }}
                    animate={{ x: 0, opacity: 1, scale: 1 }}
                    exit={{ x: 0, opacity: 0, scale: 0.3 }}
                    transition={{ duration: 0.6, delay: 0, type: 'spring' }}
                    className="grid gap-5  px-7 pb-10  pt-7"
                >
                    <Question
                        current={currentIndex + 1}
                        question={data[currentIndex]}
                        handleChecked={handleChecked}
                        checked={checked}
                    />
                </motion.section>
            )}
        </AnimatePresence>
    )
}
