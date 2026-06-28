import MotoCard from "./MotoCard"

const MotoList = ({ motos, favorites, onToggleFavorite }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {motos.map((moto) => (
                <MotoCard
                    key={moto._id}
                    moto={moto}
                    isFavorited={favorites?.has(moto._id)}
                    onToggleFavorite={onToggleFavorite}
                />
            ))}
        </div>
    )
}

export default MotoList
