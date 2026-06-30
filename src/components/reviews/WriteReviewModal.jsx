import { useState, useRef, useContext } from "react"
import { createReview, myReviews } from "../../services/review.config"
import { AuthContext } from "../../context/auth.context"
import { uploadImage } from "../../services/upload.config"
import VerifiedCelebration from "@/components/ui/VerifiedCelebration"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { StarIcon } from "@hugeicons/core-free-icons"

const WriteReviewModal = ({ motorcycleId, open, onClose, onCreated }) => {
  const { authenticateUser } = useContext(AuthContext)
  const [rating, setRating] = useState(5)
  const [hoverRating, setHoverRating] = useState(null)
  const [comment, setComment] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [media, setMedia] = useState([])
  const [uploading, setUploading] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)

  const fileInputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    createReview({ motorcycleId, rating, comment, media })
      .then(() => myReviews())
      .then((res) => {
        if (res.data.length === 5) {
          setShowCelebration(true)
          authenticateUser()
        }
        onCreated()
        onClose()
        setRating(5)
        setComment("")
      })
      .catch((err) => {
        const msg = err.response?.data?.errorMessage
        setError(msg ?? "Something went wrong. Please try again.")
      })
      .finally(() => setLoading(false))
  }

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const formData = new FormData()
    formData.append("image", file)
    setUploading(true)
    uploadImage(formData)
      .then((res) => setMedia((prev) => [...prev, res.data.imageUrl]))
      .catch(console.error)
      .finally(() => setUploading(false))
  }

  const displayRating = hoverRating ?? rating

  return (
    <>
    <VerifiedCelebration open={showCelebration} onClose={() => setShowCelebration(false)} />
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Write a review</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='space-y-5 pt-2'>
          <div>
            <p className='text-sm text-zinc-500 dark:text-zinc-400 mb-2'>
              Rating
            </p>
            <div className='flex gap-1'>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type='button'
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(null)}
                >
                  <HugeiconsIcon
                    icon={StarIcon}
                    size={28}
                    className={
                      star <= displayRating
                        ? "text-orange-400"
                        : "text-zinc-300 dark:text-zinc-600"
                    }
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className='text-sm text-zinc-500 dark:text-zinc-400 mb-2'>
              Comment
            </p>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className='w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600 resize-none'
              placeholder='Share your experience...'
            />
            <div className='flex gap-2 flex-wrap mb-2'>
              {media.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  className='w-16 h-16 rounded-lg object-cover'
                />
              ))}
            </div>

            <button
              type='button'
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Add a photo"}
            </button>

            <input
              ref={fileInputRef}
              type='file'
              accept='image/*'
              className='hidden'
              onChange={handleFileSelect}
            />
          </div>

          {error && <p className='text-sm text-red-500'>{error}</p>}

          <div className='flex justify-end gap-3'>
            <Button type='button' variant='outline' onClick={onClose}>
              Cancel
            </Button>
            <Button type='submit' disabled={loading}>
              {loading ? "Submitting..." : "Submit review"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
    </>
  )
}

export default WriteReviewModal
