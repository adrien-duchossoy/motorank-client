import { useContext, useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { FavouriteIcon } from "@hugeicons/core-free-icons"
import { AuthContext } from "@/context/auth.context"
import { toggleLike } from "@/services/event.config"

const EventLikes = ({ event }) => {
    const { loggedUserId } = useContext(AuthContext)
    const [likes, setLikes] = useState(event.likes ?? [])

    const liked = likes.includes(loggedUserId)

    const handleToggle = () => {
        toggleLike(event._id)
            .then((res) => setLikes(res.data.likes))
            .catch(console.error)
    }

    return (
        <button
            onClick={handleToggle}
            className={`flex items-center gap-1.5 text-sm transition-colors ${
                liked
                    ? "text-red-500"
                    : "text-zinc-400 hover:text-red-400"
            }`}
        >
            <HugeiconsIcon
                icon={FavouriteIcon}
                size={16}
                strokeWidth={liked ? 0 : 1.5}
                className={liked ? "fill-red-500" : ""}
            />
            {likes.length > 0 && <span>{likes.length}</span>}
        </button>
    )
}

export default EventLikes
