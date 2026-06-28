import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import { HugeiconsIcon } from "@hugeicons/react"
import { QuillWrite01Icon, PencilEdit01Icon } from "@hugeicons/core-free-icons"
import { toast } from "sonner"
import { getMotoInfo } from "../services/moto.config"
import { allModelReviews, deleteMyReview } from "../services/review.config"
import { addToMyGarage } from "../services/garage.config"
import { addToFavorite, removeFavorite, myProfile } from "../services/user.config"
import { AuthContext } from "../context/auth.context"
import MotoHero from "../components/moto/MotoHero"
import MotoHeader from "../components/moto/MotoHeader"
import MotoSpecs from "../components/moto/MotoSpecs"
import ReviewList from "../components/reviews/ReviewList"
import EditReviewModal from "../components/reviews/EditReviewModal"
import WriteReviewModal from "../components/reviews/WriteReviewModal"
import EditMotoModal from "../components/moto/EditMotoModal"

const MotoDetailPage = () => {
    const { slug } = useParams()
    const { loggedUserId, isLoggedIn, loggedUserRole } = useContext(AuthContext)
    const canEdit = loggedUserRole === "verified" || loggedUserRole === "admin"
    const [moto, setMoto] = useState(null)
    const [reviews, setReviews] = useState([])
    const [editingReview, setEditingReview] = useState(null)
    const [writeModalOpen, setWriteModalOpen] = useState(false)
    const [editMotoOpen, setEditMotoOpen] = useState(false)
    const [isFavorited, setIsFavorited] = useState(false)

    useEffect(() => {
        getMotoInfo(slug)
            .then((res) => {
                setMoto(res.data)
                return allModelReviews(res.data._id)
            })
            .then((res) => setReviews(res.data))
            .catch((err) => console.error(err))
    }, [slug])

    useEffect(() => {
        if (!isLoggedIn || !moto) return
        myProfile()
            .then((res) => {
                const favorites = res.data.favorites ?? []
                setIsFavorited(favorites.includes(moto._id))
            })
            .catch((err) => console.error(err))
    }, [isLoggedIn, moto])

    const handleToggleFavorite = () => {
        const action = isFavorited ? removeFavorite : addToFavorite
        action(moto._id)
            .then(() => {
                setIsFavorited((prev) => !prev)
                toast(isFavorited ? `${moto.modelName} removed from favorites` : `${moto.modelName} saved to favorites`)
            })
            .catch(() => toast.error("Could not update favorites"))
    }

    const handleDeleteReview = (reviewId) => {
        deleteMyReview(reviewId)
            .then(() => setReviews((prev) => prev.filter((r) => r._id !== reviewId)))
            .catch((err) => console.error(err))
    }

    const handleEditReview = (review) => {
        setEditingReview(review)
    }

    const handleUpdatedReview = (updated) => {
        setReviews((prev) => prev.map((r) =>
            r._id === updated._id
                ? { ...r, rating: updated.rating, comment: updated.comment, media: updated.media }
                : r
        ))
    }

    const handleWriteReview = () => {
        setWriteModalOpen(true)
    }

    const handleCreatedReview = () => {
        allModelReviews(moto._id)
            .then((res) => setReviews(res.data))
            .catch((err) => console.error(err))
    }

    const handleAddToGarage = () => {
        addToMyGarage({ motorcycleId: moto._id })
            .then(() => toast(`${moto.modelName} added to your garage`))
            .catch(() => toast(`Could not add to garage`))
    }

    if (!moto) return null

    return (
        <div>
            <MotoHero
                moto={moto}
                isFavorited={isFavorited}
                onToggleFavorite={isLoggedIn ? handleToggleFavorite : null}
            />

            <WriteReviewModal
                motorcycleId={moto._id}
                open={writeModalOpen}
                onClose={() => setWriteModalOpen(false)}
                onCreated={handleCreatedReview}
            />

            <EditReviewModal
                review={editingReview}
                open={!!editingReview}
                onClose={() => setEditingReview(null)}
                onUpdated={handleUpdatedReview}
            />

            <EditMotoModal
                moto={moto}
                open={editMotoOpen}
                onClose={() => setEditMotoOpen(false)}
                onUpdated={(updated) => setMoto(updated)}
            />

            <div className="px-4 md:px-16 lg:px-32 pt-6 pb-12 space-y-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    <MotoHeader moto={moto} />
                    <div className="flex flex-col items-end gap-3">
                        <MotoSpecs moto={moto} />
                        {isLoggedIn && (
                            <div className="hidden md:flex gap-2">
                                {canEdit && (
                                    <button
                                        onClick={() => setEditMotoOpen(true)}
                                        className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:border-zinc-500 dark:hover:border-zinc-500 transition-colors"
                                    >
                                        <HugeiconsIcon icon={PencilEdit01Icon} size={15} />
                                        Edit
                                    </button>
                                )}
                                <button
                                    onClick={handleAddToGarage}
                                    className="text-sm font-medium px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:border-zinc-500 dark:hover:border-zinc-500 transition-colors"
                                >
                                    + Add to garage
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {isLoggedIn && (
                    <div className="flex gap-3 md:hidden">
                        <button
                            onClick={handleAddToGarage}
                            className="flex-1 text-sm font-medium px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:border-zinc-500 transition-colors"
                        >
                            + Add to garage
                        </button>
                        {canEdit && (
                            <button
                                onClick={() => setEditMotoOpen(true)}
                                className="flex items-center justify-center gap-2 text-sm font-medium px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:border-zinc-500 transition-colors"
                            >
                                <HugeiconsIcon icon={PencilEdit01Icon} size={15} />
                                Edit
                            </button>
                        )}
                        <button
                            onClick={handleWriteReview}
                            className="flex-1 flex items-center justify-center gap-2 text-sm font-medium px-4 py-2 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 transition-colors"
                        >
                            <HugeiconsIcon icon={QuillWrite01Icon} size={15} />
                            Write a review
                        </button>
                    </div>
                )}

                <ReviewList
                    reviews={reviews}
                    loggedUserId={loggedUserId}
                    isLoggedIn={isLoggedIn}
                    onWriteReview={handleWriteReview}
                    onEditReview={handleEditReview}
                    onDeleteReview={handleDeleteReview}
                />
            </div>
        </div>
    )
}

export default MotoDetailPage
