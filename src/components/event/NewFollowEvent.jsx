import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { getPublicProfile } from '@/services/user.config'
import { AuthContext } from '@/context/auth.context'
import ProfilePic from '@/components/ui/ProfilePic'

const NewFollowEvent = ({event}) => {

    const { loggedUserId } = useContext(AuthContext)
    const [user, setUser] = useState(null)

    useEffect(() => {
        getPublicProfile(event.referenceId)
            .then((res) => setUser(res.data))
            .catch(console.error)
    }, [event.referenceId])

    if (!user) return null

    if (event.referenceId === loggedUserId) return <p className="text-sm">started following you</p>

    return (
        <div className="flex items-center gap-2">
            <p className="text-sm">started following</p>
            <Link to={`/user/${event.referenceId}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <span className="text-sm font-medium">@{user.handle}</span>
                <ProfilePic user={user} size="sm" />
            </Link>
        </div>
    )
}

export default NewFollowEvent