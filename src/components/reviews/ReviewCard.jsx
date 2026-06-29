import { Link } from "react-router-dom"
import { HugeiconsIcon } from "@hugeicons/react"
import { StarIcon, Edit01Icon, Delete01Icon } from "@hugeicons/core-free-icons"
import ProfilePic from '@/components/ui/ProfilePic'

const ReviewCard = ({ review, loggedUserId, onEdit, onDelete }) => {
    console.log(review.media) 
    const isOwn = review.userId._id === loggedUserId

    return (
        <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-4">
            <div className="flex items-start justify-between mb-3">
                <Link to={`/user/${review.userId._id}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                    <ProfilePic user={review.userId} size="md" />
                    <div>
                        <p className="font-medium text-sm">{review.userId.displayName}</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">@{review.userId.handle}</p>
                    </div>
                </Link>
                <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <HugeiconsIcon
                            key={star}
                            icon={StarIcon}
                            size={14}
                            className={star <= review.rating ? "text-orange-400" : "text-zinc-300 dark:text-zinc-600"}
                        />
                    ))}
                </div>
            </div>

            {review.comment && (
                <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-3 leading-relaxed">
                    {review.comment}
                </p>
            )}

            {review.media?.length > 0 && (
                <div className="flex gap-2 mb-3 overflow-x-auto no-scrollbar">
                    {review.media.map((url, i) => (
                        <img
                            key={i}
                            src={url}
                            alt={`photo ${i + 1}`}
                            className="w-24 h-24 rounded-lg object-cover shrink-0"
                        />
                    ))}
                </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <span className="text-xs text-zinc-400">
                    {new Date(review.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    })}
                </span>
                {isOwn && (
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => onEdit(review)}
                            className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
                        >
                            <HugeiconsIcon icon={Edit01Icon} size={16} />
                        </button>
                        <button
                            onClick={() => onDelete(review._id)}
                            className="text-zinc-400 hover:text-red-500 transition-colors"
                        >
                            <HugeiconsIcon icon={Delete01Icon} size={16} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ReviewCard
