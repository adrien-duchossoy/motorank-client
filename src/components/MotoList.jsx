import { useEffect, useRef } from 'react'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import MotoCard from "./MotoCard"

const MotoList = ({ motos, favorites, onToggleFavorite }) => {

    const containerRef = useRef(null)

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        if (!containerRef.current || motos.length === 0) return

        const cards = containerRef.current.querySelectorAll(".moto-card")

        gsap.set(cards, { opacity: 0, y: 40 })
        ScrollTrigger.batch(cards, {
            onEnter: (batch) => {
                gsap.to(batch, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: 0.08,
                    ease: "power2.out",
                })
            },
            start: "top 75%",
        })
    }, [motos])

    return (
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
