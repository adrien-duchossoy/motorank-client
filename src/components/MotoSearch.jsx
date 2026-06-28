import { useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { HugeiconsIcon } from "@hugeicons/react"
import { Search01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons"

const MotoSearch = ({ search, onSearchChange, types, activeType, onTypeChange }) => {
    const pillsRef = useRef(null)
    const [showScrollHint, setShowScrollHint] = useState(true)

    const handlePillsScroll = () => {
        const el = pillsRef.current
        if (!el) return
        setShowScrollHint(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
    }

    return (
        <>
            <div className="relative mb-4">
                <span className="absolute inset-y-0 left-3 flex items-center text-muted-foreground pointer-events-none">
                    <HugeiconsIcon icon={Search01Icon} size={18} />
                </span>
                <Input
                    className="pl-9"
                    placeholder="Search brand or model"
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>

            <div className="relative mb-6">
                <div ref={pillsRef} onScroll={handlePillsScroll} className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                    {types.map((type) => (
                        <button
                            key={type}
                            onClick={() => onTypeChange(type)}
                            className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                                activeType === type
                                    ? "bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-zinc-900 dark:border-white"
                                    : "bg-transparent text-zinc-600 border-zinc-300 hover:border-zinc-500 dark:text-zinc-400 dark:border-zinc-700"
                            }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
                <div className={`md:hidden absolute right-0 inset-y-0 flex items-center pl-6 bg-gradient-to-l from-background to-transparent pointer-events-none transition-opacity ${showScrollHint ? "opacity-100" : "opacity-0"}`}>
                    <HugeiconsIcon icon={ArrowRight01Icon} size={16} className="text-zinc-400" />
                </div>
            </div>
        </>
    )
}

export default MotoSearch
