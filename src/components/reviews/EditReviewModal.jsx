import { useState, useEffect } from "react"
import { updateMyReview } from "../../services/review.config"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { StarIcon } from "@hugeicons/core-free-icons"

const EditReviewModal = ({ review, open, onClose, onUpdated }) => {
    const [rating, setRating] = useState(review?.rating ?? 5)
    const [hoverRating, setHoverRating] = useState(null)
    const [comment, setComment] = useState(review?.comment ?? "")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (review) {
            setRating(review.rating)
            setComment(review.comment ?? "")
            setError(null)
        }
    }, [review])

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        updateMyReview(review._id, { rating, comment })
            .then((res) => {
                onUpdated(res.data)
                onClose()
            })
            .catch(() => setError("Something went wrong. Please try again."))
            .finally(() => setLoading(false))
    }

    const displayRating = hoverRating ?? rating

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Edit your review</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-5 pt-2">
                    <div>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">Rating</p>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(null)}
                                >
                                    <HugeiconsIcon
                                        icon={StarIcon}
                                        size={28}
                                        className={star <= displayRating ? "text-orange-400" : "text-zinc-300 dark:text-zinc-600"}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">Comment</p>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows={4}
                            className="w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600 resize-none"
                            placeholder="Share your experience..."
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-red-500">{error}</p>
                    )}

                    <div className="flex justify-end gap-3">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Saving..." : "Save changes"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default EditReviewModal
