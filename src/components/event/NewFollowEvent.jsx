const NewFollowEvent = ({event}) => {
    return(
        <p>
            reviewed <strong>{event.metadata.motoName}</strong> - {event.metadata.rating}/5
        </p>
    )
}

export default NewFollowEvent