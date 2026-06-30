import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons"
import { myProfile, getFollowers, getFollowing, followUser } from "../services/user.config"
import ProfileHeader from "../components/profile/ProfileHeader"
import ProfileSheet from "../components/profile/ProfileSheet"
import UserRow from "../components/profile/UserRow"
import FollowListPageSkeleton from "./skeleton/FollowListPageSkeleton"

const FollowListPage = ({ type }) => {
    const navigate = useNavigate()
    const [profile, setProfile] = useState(null)
    const [users, setUsers] = useState([])
    const [followingIds, setFollowingIds] = useState(new Set())
    const [profileSheetOpen, setProfileSheetOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchList = type === "followers" ? getFollowers : getFollowing
        Promise.all([myProfile(), fetchList()])
            .then(([profileRes, listRes]) => {
                setProfile(profileRes.data)
                setFollowingIds(new Set(profileRes.data.following.map(String)))
                setUsers(listRes.data)
            })
            .catch(console.error)
            .finally(() => setIsLoading(false))
    }, [type])

    const handleFollow = (userId) => {
        followUser(userId)
            .then(() => setFollowingIds((prev) => new Set([...prev, String(userId)])))
            .catch(() => toast.error("Could not follow"))
    }

    if (isLoading) return <FollowListPageSkeleton />

    return (
        <>
            <div className="md:hidden flex items-center gap-3 px-4 py-4 border-b border-zinc-200 dark:border-zinc-800">
                <button
                    onClick={() => navigate(-1)}
                    className="p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                    <HugeiconsIcon icon={ArrowLeft01Icon} size={20} />
                </button>
                <h1 className="font-semibold text-base capitalize">{type}</h1>
            </div>

            <div className="hidden md:block">
                <ProfileHeader
                    profile={profile}
                    reviewCount={profile.reviewCount ?? 0}
                    followersPath="/me/followers"
                    followingPath="/me/following"
                    action={
                        <button
                            onClick={() => setProfileSheetOpen(true)}
                            className="text-sm font-medium px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:border-zinc-500 transition-colors"
                        >
                            Edit profile
                        </button>
                    }
                />
            </div>

            <div className="px-4 md:px-16 lg:px-32 pb-12">
                {users.length === 0 ? (
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 pt-6">No {type} yet.</p>
                ) : (
                    <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                        {users.map((user) => (
                            <UserRow
                                key={user._id}
                                user={user}
                                isFollowing={followingIds.has(String(user._id))}
                                onFollow={() => handleFollow(user._id)}
                            />
                        ))}
                    </div>
                )}
            </div>

            <ProfileSheet open={profileSheetOpen} onClose={() => setProfileSheetOpen(false)} />
        </>
    )
}

export default FollowListPage
