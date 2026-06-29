import { useState, useEffect, useContext } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Delete02Icon } from "@hugeicons/core-free-icons"
import { AuthContext } from "@/context/auth.context"
import { getComments, createComment, deleteComment } from "@/services/eventComment.config"

const EventComments = ({ event }) => {
    const { loggedUserId } = useContext(AuthContext)
    const [comments, setComments] = useState([])
    const [text, setText] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getComments(event._id)
            .then((res) => setComments(res.data))
            .catch(console.error)
    }, [event._id])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!text.trim()) return
        setLoading(true)
        createComment(event._id, { content: text })
            .then((res) => {
                setComments((prev) => [...prev, res.data])
                setText("")
            })
            .catch(console.error)
            .finally(() => setLoading(false))
    }

    const handleDelete = (commentId) => {
        deleteComment(commentId)
            .then(() => setComments((prev) => prev.filter((c) => c._id !== commentId)))
            .catch(console.error)
    }

    return (
        <div className="space-y-3">
            {[...comments].reverse().map((comment) => (
                <div key={comment._id} className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2">
                        <span className="text-sm font-medium">{comment.userId?.handle}</span>
                        <span className="text-sm text-zinc-500">{comment.content}</span>
                    </div>
                    {comment.userId?._id === loggedUserId && (
                        <button
                            onClick={() => handleDelete(comment._id)}
                            className="text-zinc-300 hover:text-red-400 transition-colors shrink-0"
                        >
                            <HugeiconsIcon icon={Delete02Icon} size={14} />
                        </button>
                    )}
                </div>
            ))}

            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-1 text-sm bg-transparent border-b border-zinc-200 dark:border-zinc-700 focus:outline-none focus:border-zinc-400 py-1"
                />
                <button
                    type="submit"
                    disabled={loading || !text.trim()}
                    className="text-sm font-medium text-zinc-700 dark:text-zinc-300 disabled:opacity-40"
                >
                    Post
                </button>
            </form>
        </div>
    )
}

export default EventComments
