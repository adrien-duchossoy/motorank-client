import { useState, useEffect } from "react"
import { toast } from "sonner"
import { myProfile, listFavorites } from "../services/user.config"
import { myGarage, deleteFromMyGarage } from "../services/garage.config"
import { myReviews, deleteMyReview } from "../services/review.config"
import ProfileHeader from "../components/profile/ProfileHeader"
import GarageCard from "../components/profile/GarageCard"
import ProfileReviewCard from "../components/profile/ProfileReviewCard"
import MotoCard from "../components/MotoCard"
import EditReviewModal from "../components/reviews/EditReviewModal"
import ProfileSheet from "../components/profile/ProfileSheet"

const MyProfilePage = () => {
    const [profile, setProfile] = useState(null)
    const [garage, setGarage] = useState([])
    const [reviews, setReviews] = useState([])
    const [favorites, setFavorites] = useState([])
    const [editingReview, setEditingReview] = useState(null)
    const [profileSheetOpen, setProfileSheetOpen] = useState(false)

    useEffect(() => {
        myProfile().then((res) => setProfile(res.data)).catch(console.error)
        myGarage().then((res) => setGarage(res.data)).catch(console.error)
        myReviews().then((res) => setReviews(res.data)).catch(console.error)
        listFavorites().then((res) => setFavorites(res.data)).catch(console.error)
    }, [])

    const handleDeleteGarage = (entryId) => {
        deleteFromMyGarage(entryId)
            .then(() => setGarage((prev) => prev.filter((e) => e._id !== entryId)))
            .catch(() => toast.error("Could not remove from garage"))
    }

    const handleDeleteReview = (reviewId) => {
        deleteMyReview(reviewId)
            .then(() => setReviews((prev) => prev.filter((r) => r._id !== reviewId)))
            .catch(console.error)
    }

    const handleUpdatedReview = (updated) => {
        setReviews((prev) => prev.map((r) =>
            r._id === updated._id
                ? { ...r, rating: updated.rating, comment: updated.comment, media: updated.media }
                : r
        ))
    }

    if (!profile) return null

    const garageContent = garage.length === 0 ? (
        <p className="text-sm text-zinc-500 dark:text-zinc-400">No bikes in your garage yet.</p>
    ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {garage.map((entry) => (
                <GarageCard key={entry._id} entry={entry} onDelete={handleDeleteGarage} />
            ))}
        </div>
    )

    const reviewsContent = reviews.length === 0 ? (
        <p className="text-sm text-zinc-500 dark:text-zinc-400">You haven't written any reviews yet.</p>
    ) : (
        <div className="flex flex-col gap-4">
            {reviews.map((review) => (
                <ProfileReviewCard
                    key={review._id}
                    review={review}
                    canEdit
                    onEdit={setEditingReview}
                    onDelete={handleDeleteReview}
                />
            ))}
        </div>
    )

    const savedContent = favorites.length === 0 ? (
        <p className="text-sm text-zinc-500 dark:text-zinc-400">No saved bikes yet.</p>
    ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {favorites.map((moto) => (
                <MotoCard key={moto._id} moto={moto} />
            ))}
        </div>
    )

    return (
        <>
            <ProfileHeader
                profile={profile}
                reviewCount={reviews.length}
                followersPath="/me/followers"
                followingPath="/me/following"
                action={
                    <button
                        onClick={() => setProfileSheetOpen(true)}
                        className="w-full md:w-auto text-sm font-medium px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:border-zinc-500 transition-colors"
                    >
                        Edit profile
                    </button>
                }
            />

            <div className="px-4 md:px-16 lg:px-32 pt-6 pb-12 flex flex-col gap-10">
                <Section title="Garage">{garageContent}</Section>
                <Section title="Reviews">{reviewsContent}</Section>
                <Section title="Saved">{savedContent}</Section>
            </div>

            <EditReviewModal
                review={editingReview}
                open={!!editingReview}
                onClose={() => setEditingReview(null)}
                onUpdated={handleUpdatedReview}
            />

            <ProfileSheet
                open={profileSheetOpen}
                onClose={() => setProfileSheetOpen(false)}
            />
        </>
    )
}

const Section = ({ title, children }) => (
    <section>
        <h2 className="text-base font-semibold mb-4">{title}</h2>
        {children}
    </section>
)

export default MyProfilePage
