import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Comment01Icon } from "@hugeicons/core-free-icons"
import NewReviewEvent from './NewReviewEvent'
import NewFollowEvent from './NewFollowEvent'
import GarageAddEvent from './GarageAddEvent'
import EventLikes from './EventLikes'
import EventComments from './EventComments'
import ProfilePic from '@/components/ui/ProfilePic'

const timeAgo = (date) => {
    const seconds = Math.floor((Date.now() - new Date(date)) / 1000)
    if (seconds < 3600)  return `${Math.floor(seconds / 60)}m`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`
    if (seconds < 2592000) return `${Math.floor(seconds / 86400)}d`
    return `${Math.floor(seconds / 2592000)}mo`
}

const componentsByType = {
    new_review: NewReviewEvent,
    new_follow: NewFollowEvent,
    garage_add: GarageAddEvent,
}

const EventCard = ({ event }) => {
    const ContentComponent = componentsByType[event.type]
    const [commentsOpen, setCommentsOpen] = useState(false)

    return (
        <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2">
                <ProfilePic user={event.actorId} size="sm" />
                <span className="font-medium">{event.actorId?.handle}</span>
                <span className="text-xs text-zinc-400">{timeAgo(event.createdAt)} ago</span>
            </div>

            {ContentComponent
                ? <ContentComponent event={event} />
                : <p>{event.message}</p>
            }

            <div className="pt-1 border-t border-zinc-100 dark:border-zinc-800 space-y-3">
                <div className="flex items-center gap-4">
                    <EventLikes event={event} />
                    <button
                        onClick={() => setCommentsOpen((prev) => !prev)}
                        className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                    >
                        <HugeiconsIcon icon={Comment01Icon} size={16} strokeWidth={1.5} />
                        {event.commentCount > 0 && <span>{event.commentCount}</span>}
                    </button>
                </div>

                {commentsOpen && <EventComments event={event} />}
            </div>
        </div>
    )
}

export default EventCard