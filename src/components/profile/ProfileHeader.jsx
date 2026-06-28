import { Link } from "react-router-dom"
import { HugeiconsIcon } from "@hugeicons/react"
import { User02Icon } from "@hugeicons/core-free-icons"

const ProfileHeader = ({ profile, reviewCount, action, followersPath, followingPath }) => {
    const avatarImg = profile.profilePicture ? (
        <img src={profile.profilePicture} alt={profile.displayName} className="w-full h-full object-cover" />
    ) : (
        <div className="w-full h-full flex items-center justify-center text-zinc-400">
            <HugeiconsIcon icon={User02Icon} size={36} />
        </div>
    )

    return (
        <div className="bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-4 md:px-16 lg:px-32 py-8">

            <div className="flex flex-col items-center text-center gap-4 md:hidden">
                <div className="w-24 h-24 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                    {avatarImg}
                </div>
                <div>
                    <h1 className="text-xl font-bold">{profile.displayName}</h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">@{profile.handle}</p>
                </div>
                {action}
                <div className="flex gap-8">
                    <Stat label="followers" value={profile.followers?.length ?? 0} to={followersPath} />
                    <Stat label="reviews"   value={reviewCount} />
                    <Stat label="following" value={profile.following?.length ?? 0} to={followingPath} />
                </div>
                {profile.description && (
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed text-left">{profile.description}</p>
                )}
            </div>

            <div className="hidden md:flex items-start gap-6">
                <div className="w-24 h-24 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden shrink-0">
                    {avatarImg}
                </div>
                <div className="shrink-0">
                    <h1 className="text-2xl font-bold">{profile.displayName}</h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">@{profile.handle}</p>
                    {action && <div className="mt-3">{action}</div>}
                </div>
                <div className="flex flex-col gap-3 ml-8">
                    <div className="flex gap-8">
                        <Stat label="followers" value={profile.followers?.length ?? 0} to={followersPath} />
                        <Stat label="reviews"   value={reviewCount} />
                        <Stat label="following" value={profile.following?.length ?? 0} to={followingPath} />
                    </div>
                    {profile.description && (
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-sm">{profile.description}</p>
                    )}
                </div>
            </div>

        </div>
    )
}

const Stat = ({ label, value, to }) => {
    const content = (
        <>
            <p className="text-base font-bold">
                {value >= 1000 ? `${(value / 1000).toFixed(1)}K` : value}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">{label}</p>
        </>
    )

    if (to) return (
        <Link to={to} className="hover:opacity-70 transition-opacity">
            {content}
        </Link>
    )

    return <div>{content}</div>
}

export default ProfileHeader
