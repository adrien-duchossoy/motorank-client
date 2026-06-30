import { useEffect } from "react"
import confetti from "canvas-confetti"
import { HugeiconsIcon } from "@hugeicons/react"
import { CheckmarkBadge01Icon } from "@hugeicons/core-free-icons"

const fireRealistic = () => {
    const count = 200
    const defaults = { origin: { y: 0.7 }, gravity: 0.6, ticks: 400 }

    const fire = (particleRatio, opts) => {
        confetti({ ...defaults, ...opts, particleCount: Math.floor(count * particleRatio) })
    }

    fire(0.25, { spread: 26, startVelocity: 35 })
    fire(0.2,  { spread: 60, startVelocity: 25 })
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8, startVelocity: 20 })
    fire(0.1,  { spread: 120, startVelocity: 15, decay: 0.92, scalar: 1.2 })
    fire(0.1,  { spread: 120, startVelocity: 28 })
}

const VerifiedCelebration = ({ open, onClose }) => {
    useEffect(() => {
        if (!open) return
        fireRealistic()
        const timer = setTimeout(onClose, 4000)
        return () => clearTimeout(timer)
    }, [open])

    if (!open) return null

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl px-10 py-10 flex flex-col items-center gap-4 max-w-sm mx-4 animate-in zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="rounded-full bg-[var(--primary)]/15 p-4">
                    <HugeiconsIcon
                        icon={CheckmarkBadge01Icon}
                        size={48}
                        className="text-[var(--primary)]"
                    />
                </div>

                <div className="text-center">
                    <h2 className="text-xl font-bold">You're Verified!</h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1.5 leading-relaxed">
                        You've written 5 reviews and earned your Verified badge.
                    </p>
                </div>

                <button
                    onClick={onClose}
                    className="mt-1 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                >
                    Dismiss
                </button>
            </div>
        </div>
    )
}

export default VerifiedCelebration
