import { useNavigate } from "react-router-dom"
import ProfilePic from '@/components/ui/ProfilePic'

const UserRow = ({ user, isFollowing, onFollow }) => {
    const navigate = useNavigate()

    return (
        <div className="flex items-center gap-4 py-4">
            <button onClick={() => navigate(`/user/${user._id}`)}>
                <ProfilePic user={user} size="lg" />
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
