import { motion } from 'framer-motion'
export default function EndScreen({ score, total }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
        >
            <h2 className="px-7 py-10 text-center text-lg font-medium">
                You Scored{' '}
                <span className="text-2xl font-semibold">{score}</span> out of{' '}
                <span className="text-2xl font-semibold">{total}</span>
            </h2>
        </motion.div>
    )
}
