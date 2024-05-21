import Spinner from './Spinner'
import { motion } from 'framer-motion'

export default function LoadingScreen() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 2 }}
            className="flex justify-center py-20"
        >
            <Spinner />
        </motion.div>
    )
}
