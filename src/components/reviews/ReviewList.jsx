import { HugeiconsIcon } from "@hugeicons/react"
import { QuillWrite01Icon } from "@hugeicons/core-free-icons"
import ReviewCard from "./ReviewCard"

const ReviewList = ({ reviews, loggedUserId, isLoggedIn, onWriteReview, onEditReview, onDeleteReview }) => {
    return (
        <section>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold uppercase tracking-wide">Community Reviews</h2>
                {isLoggedIn && (
                    <button
                        onClick={onWriteReview}
                        className="hidden md:flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:border-zinc-500 dark:hover:border-zinc-500 transition-colors"
                    >
                        <HugeiconsIcon icon={QuillWrite01Icon} size={15} />
                        Write a review
                    </button>
                )}
            </div>

            {reviews.length === 0 ? (
                <p className="text-sm text-zinc-500 dark:text-zinc-400">No reviews yet. Be the first!</p>
            ) : (
                <div className="flex flex-col gap-4">
                    {reviews.map((review) => (
                        <ReviewCard
                            key={review._id}
                            review={review}
                            loggedUserId={loggedUserId}
                            onEdit={onEditReview}
                            onDelete={onDeleteReview}
                        />
                    ))}
                </div>
            )}
        </section>
    )
}

export default ReviewList
