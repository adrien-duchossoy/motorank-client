import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const useTilt = () => {
    const ref = useRef(null)

    const onMouseMove = (e) => {
        const el = ref.current
        const rect = el.getBoundingClientRect()
        const relX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
        const relY = (e.clientY - (rect.top + rect.height /2)) / (rect.height /2)

        gsap.to(el, {
            rotateY: relX *10,
            rotateX: -relY *10,
            scale: 1.05,
            transformPerspective: 1000,
            duration: 0.3,
            ease: "power2.out",
        })
    }
    const onMouseLeave = () => {
        gsap.to(ref.current, {
            rotateY: 0,
            rotateX: 0,
            scale: 1,
            duration: 0.5,
            ease: "power2.out"
        })
    }
    return {ref, onMouseMove, onMouseLeave}
}

export default useTilt