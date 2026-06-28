import { HugeiconsIcon } from "@hugeicons/react"
import { StarIcon, Edit01Icon, Delete01Icon } from "@hugeicons/core-free-icons"

const ProfileReviewCard = ({ review, canEdit, onEdit, onDelete }) => {
    const moto = review.motorcycleId

    return (
        <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
            <div className="w-full aspect-[16/5] bg-zinc-100 dark:bg-zinc-800">
                {moto?.picture && (
                    <img
                        src={moto.picture}
                        alt={`${moto.brandName} ${moto.modelName}`}
                        className="w-full h-full object-cover"
                    />
                )}
            </div>

            <div className="p-4 space-y-3">
                <div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{moto?.brandName}</p>
                    <p className="text-lg font-semibold leading-tight">{moto?.modelName}</p>
                </div>

                <div className="border-t border-zinc-100 dark:border-zinc-800 pt-3 space-y-3">
                    <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <HugeiconsIcon
                                key={star}
                                icon={StarIcon}
                                size={14}
                                className={star <= review.rating ? "text-orange-400" : "text-zinc-300 dark:text-zinc-600"}
                            />
                        ))}
                    </div>

                    {review.comment && (
                        <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">{review.comment}</p>
                    )}

                    {review.media?.length > 0 && (
                        <div className="flex gap-2 overflow-x-auto no-scrollbar">
                            {review.media.map((url, i) => (
                                <img key={i} src={url} alt={`photo ${i + 1}`} className="w-24 h-24 rounded-lg object-cover shrink-0" />
                            ))}
                        </div>
                    )}

                    <div className="flex items-center justify-between pt-1 border-t border-zinc-100 dark:border-zinc-800">
                        <span className="text-xs text-zinc-400">
                            {new Date(review.createdAt).toLocaleDateString("en-GB", {
                                day: "numeric", month: "long", year: "numeric",
                            })}
                        </span>
                        {canEdit && (
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => onEdit(review)}
                                    className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
                                >
                                    <HugeiconsIcon icon={Edit01Icon} size={16} />
                                </button>
                                <button
                                    onClick={() => onDelete(review._id)}
                                    className="text-zinc-400 hover:text-red-500 transition-colors"
                                >
                                    <HugeiconsIcon icon={Delete01Icon} size={16} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileReviewCard
