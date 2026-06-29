import { useState, useEffect } from "react"
import { myFeed } from "../services/event.config"

import EventCard from "../components/event/EventCard"

const FeedPage = () => {
    const [events, setEvents] = useState([])

    useEffect(() => {
        myFeed()
            .then((res) => {
                res.data.forEach( e => console.log(e.type, e))
                console.log(res.data)
                setEvents(res.data)
            })
            .catch(console.error)
    }, [])

    return(
        <div className="px-4 md:px-26 lg:px-32 pt-6">
            <h1 className="text-xl font-bold mb-6">Feed</h1>
            {events.length === 0 ? (
                <p className="text-sm text-zinc-500">Nothing to see yet. Follow other bikers to see their activity.</p>
            ) : (
                <ul className="space-y-4">
                    {events.map((event) => (
                        <li key={event.id} className="border rounded-xl p-4">
                            <EventCard key={event._id} event={event} />
                            <pre>{JSON.stringify(event, null, 2)}</pre>
                        </li>
                    ))}
                </ul>
            )}

        </div>
    )
}

export default FeedPage