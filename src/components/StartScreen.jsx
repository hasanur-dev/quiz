import { motion } from 'framer-motion'
import Select from './Select'
export default function StartScreen({
    categories,
    difficulties,
    cat,
    dif,
    setCat,
    setDif,
}) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="grid gap-4 px-7 py-10"
        >
            <h2 className="text-center text-lg font-medium">
                Select your preferences and press the button below to start the
                quiz
            </h2>
            <div className="flex flex-col gap-4">
                <div>
                    <Select
                        label="Category"
                        options={categories}
                        selected={cat}
                        setSelected={setCat}
                    />
                </div>
                <div>
                    <Select
                        label="Difficulty"
                        options={difficulties}
                        selected={dif}
                        setSelected={setDif}
                    />
                </div>
            </div>
        </motion.div>
    )
}
