import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getGarageEntry } from "@/services/garage.config"

import MotoImage from "../moto/MotoImage"

const GarageAddEvent = ({ event }) => {
  const [entry, setEntry] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    getGarageEntry(event.referenceId)
      .then((res) => {
        console.log(res.data)
        setEntry(res.data)
      })
      .catch(console.error)
  }, [event.referenceId])

  if (!entry) return null

  return (
    <div className='flex items-center gap-3'>
      <div className='w-32 h-20 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0'
      onClick={() => navigate(`/garage/${entry.motorcycleId.slug}`)}
      >
        <MotoImage
          src={entry.motorcycleId.picture}
          alt={entry.motorcycleId.modelName}
        />
      </div>
      <p className='text-sm'>added the {entry.motorcycleId.brandName} {entry.motorcycleId.modelName} to their garage</p>
    </div>
  )
}

export default GarageAddEvent
