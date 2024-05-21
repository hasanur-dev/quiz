import { useState } from 'react'
import Logo from './Logo'
import Timer from './Timer'
import { AnimatePresence, motion } from 'framer-motion'

export default function QuizHeader({ quizState, checked, timeLeft, bar }) {
    return (
        <header className="relative flex items-center justify-between px-7 py-5 shadow-md">
            <Logo />
            {quizState === 'active' && (
                <>
                    <Timer timeLeft={timeLeft} />
                    {bar && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{
                                animationDuration: '15s',
                                animationPlayState: checked
                                    ? 'paused'
                                    : 'running',
                            }}
                            className={`bar absolute bottom-0 left-0 h-[3px]  rounded-full bg-indigo-400`}
                        ></motion.div>
                    )}
                    {!bar && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{
                                animationDuration: '15s',
                                animationPlayState: checked
                                    ? 'paused'
                                    : 'running',
                            }}
                            className={`bar absolute bottom-0 left-0 h-[3px]  rounded-full bg-indigo-400`}
                        ></motion.div>
                    )}
                </>
            )}
        </header>
    )
}
