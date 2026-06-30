import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import { toast } from "sonner"
import { getPublicProfile, listPublicReviews, getPublicGarage, followUser, unfollowUser } from "../services/user.config"
import { AuthContext } from "../context/auth.context"
import ProfileHeader from "../components/profile/ProfileHeader"
import GarageCard from "../components/profile/GarageCard"
import ProfileReviewCard from "../components/profile/ProfileReviewCard"
import ProfilePageSkeleton from "./skeleton/ProfilePageSkeleton"

const UserProfilePage = () => {
    const { accountId } = useParams()
    const { isLoggedIn, loggedUserId } = useContext(AuthContext)
    const [profile, setProfile] = useState(null)
    const [garage, setGarage] = useState([])
    const [reviews, setReviews] = useState([])
    const [isFollowing, setIsFollowing] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        Promise.all([
            getPublicProfile(accountId),
            getPublicGarage(accountId),
            listPublicReviews(accountId),
        ]).then(([profileRes, garageRes, reviewsRes]) => {
            setProfile(profileRes.data)
            setIsFollowing(profileRes.data.followers?.includes(loggedUserId) ?? false)
            setGarage(garageRes.data)
            setReviews(reviewsRes.data)
        })
        .catch(console.error)
        .finally(() => setIsLoading(false))
    }, [accountId, loggedUserId])

    const handleToggleFollow = () => {
        const action = isFollowing ? unfollowUser : followUser
        action(accountId)
            .then(() => {
                setIsFollowing((prev) => !prev)
                toast(isFollowing ? "Unfollowed" : `Following ${profile.displayName ?? profile.handle}`)
            })
            .catch(() => toast.error("Could not update follow status"))
    }

    if (isLoading) return <ProfilePageSkeleton />

    const isOwnProfile = loggedUserId === accountId

    return (
        <div>
            <ProfileHeader
                profile={profile}
                reviewCount={reviews.length}
                action={isLoggedIn && !isOwnProfile && (
                    <button
                        onClick={handleToggleFollow}
                        className="w-full md:w-auto text-sm font-medium px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:border-zinc-500 transition-colors"
                    >
                        {isFollowing ? "Following" : "+ Follow"}
                    </button>
                )}
            />

            <div className="px-4 md:px-16 lg:px-32 pt-6 pb-12 flex flex-col gap-10">
                <Section title="Garage">
                    {garage.length === 0 ? (
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">No bikes yet.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {garage.map((entry) => (
                                <GarageCard key={entry._id} entry={entry} />
                            ))}
                        </div>
                    )}
                </Section>

                <Section title="Reviews">
                    {reviews.length === 0 ? (
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">No reviews yet.</p>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {reviews.map((review) => (
                                <ProfileReviewCard key={review._id} review={review} />
                            ))}
                        </div>
                    )}
                </Section>
            </div>
        </div>
    )
}

const Section = ({ title, children }) => (
    <section>
        <h2 className="text-base font-semibold mb-4">{title}</h2>
        {children}
    </section>
)

export default UserProfilePage
