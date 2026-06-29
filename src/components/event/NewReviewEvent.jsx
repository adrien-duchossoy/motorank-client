
import { useState, useEffect } from "react"
import ProfileReviewCard from '../profile/ProfileReviewCard'
import { getReviewById } from '@/services/review.config'

const NewReviewEvent = ({event}) => {

    const [review, setReview] = useState(null)

    useEffect(() => {
        getReviewById(event.referenceId)
            .then((res) => setReview(res.data))
            .catch(console.error)
    }, [event.referenceId])

    if (!review) return null

    return(
        <div>
            <p>{event.message}</p>
            <ProfileReviewCard review={review}/>
        </div>
    )
}

export default NewReviewEvent