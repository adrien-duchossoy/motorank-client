import { useState, useEffect } from "react"
import { myFeed } from "../services/event.config"
import EventCard from "../components/event/EventCard"
import FeedPageSkeleton from "./skeleton/FeedPageSkeleton"

const FeedPage = () => {
    const [events, setEvents] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        myFeed()
            .then((res) => setEvents(res.data))
            .catch(console.error)
            .finally(() => setIsLoading(false))
    }, [])

    if (isLoading) return <FeedPageSkeleton />

    return(
        <div className="px-4 md:px-26 lg:px-32 pt-6">
            <h1 className="text-xl font-bold mb-6">Feed</h1>
            {events.length === 0 ? (
                <p className="text-sm text-zinc-500">Nothing to see yet. Follow other bikers to see their activity.</p>
            ) : (
                <ul className="space-y-4">
                    {events.map((event) => (
                        <li key={event._id}>
                            <EventCard key={event._id} event={event} />
                        </li>
                    ))}
                </ul>
            )}

        </div>
    )
}

export default FeedPage