import { useNavigate } from "react-router-dom"
import { HugeiconsIcon } from "@hugeicons/react"
import { User02Icon } from "@hugeicons/core-free-icons"

const UserRow = ({ user, isFollowing, onFollow }) => {
    const navigate = useNavigate()

    return (
        <div className="flex items-center gap-4 py-4">
            <button
                onClick={() => navigate(`/user/${user._id}`)}
                className="w-12 h-12 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden shrink-0"
            >
                {user.profilePicture ? (
                    <img src={user.profilePicture} alt={user.displayName} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-400">
                        <HugeiconsIcon icon={User02Icon} size={20} />
                    </div>
                )}
            </button>

            <button onClick={() => navigate(`/user/${user._id}`)} className="flex-1 min-w-0 text-left">
                <p className="text-sm font-medium">{user.displayName}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">@{user.handle}</p>
            </button>

            {isFollowing ? (
                <span className="text-sm text-zinc-400">Followed</span>
            ) : (
                <button
                    onClick={onFollow}
                    className="text-sm font-medium px-4 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:border-zinc-500 transition-colors shrink-0"
                >
                    Follow back
                </button>
            )}
        </div>
    )
}

export default UserRow
