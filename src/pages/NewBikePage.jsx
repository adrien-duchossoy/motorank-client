import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HugeiconsIcon } from "@hugeicons/react"
import { Camera01Icon, SparklesIcon } from "@hugeicons/core-free-icons"
import { createMoto, fillMotoWithAI, suggestMotoImage } from "../services/moto.admin.config"
import { getBrands, getTypes } from "../services/moto.config"
import { uploadImage } from "../services/upload.config"
import NewBikePageSkeleton from "./skeleton/NewBikePageSkeleton"

const NewBikePage = () => {
    const navigate = useNavigate()
    const fileInputRef = useRef(null)

    const [brandName, setBrandName] = useState("")
    const [modelName, setModelName] = useState("")
    const [productionYear, setProductionYear] = useState("")
    const [type, setType] = useState("")
    const [displacement, setDisplacement] = useState("")
    const [horsepower, setHorsepower] = useState("")
    const [cylinders, setCylinders] = useState("")
    const [torqueNm, setTorqueNm] = useState("")
    const [weightKg, setWeightKg] = useState("")
    const [picture, setPicture] = useState("")
    const [uploading, setUploading] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [aiLoading, setAiLoading] = useState(false)
    const [imageLoading, setImageLoading] = useState(false)
    const [error, setError] = useState(null)
    const [brands, setBrands] = useState([])
    const [types, setTypes] = useState([])

    useEffect(() => {
        Promise.all([getBrands(), getTypes()])
            .then(([b, t]) => {
                setBrands(b.data)
                setTypes(t.data)
            })
            .catch(() => toast.error("Could not load options"))
            .finally(() => setIsLoading(false))
    }, [])

    const currentYear = new Date().getFullYear()
    const years = Array.from({ length: currentYear - 1949 }, (_, i) => currentYear + 1 - i)

    const canAiFill = brandName.trim().length > 0 && modelName.trim().length > 0 && productionYear.trim().length > 0

    if (isLoading) return <NewBikePageSkeleton />

    const handleFileSelect = (e) => {
        const file = e.target.files?.[0]
        if (!file) return
        const formData = new FormData()
        formData.append("image", file)
        setUploading(true)
        uploadImage(formData)
            .then((res) => setPicture(res.data.imageUrl))
            .catch(() => toast.error("Could not upload image"))
            .finally(() => setUploading(false))
    }

    const handleImageSuggest = () => {
        setImageLoading(true)
        suggestMotoImage({ brandName, modelName, productionYear })
            .then((res) => setPicture(res.data.imageUrl))
            .catch(() => toast.error("Could not find an image"))
            .finally(() => setImageLoading(false))
    }

    const handleAiFill = () => {
        setAiLoading(true)
        fillMotoWithAI({ brandName, modelName, productionYear: Number(productionYear) })
            .then((res) => {
                const data = res.data
                if (data.type) setType(data.type)
                if (data.displacement) setDisplacement(String(data.displacement))
                if (data.horsepower) setHorsepower(String(data.horsepower))
                if (data.cylinders) setCylinders(String(data.cylinders))
                if (data.torqueNm) setTorqueNm(String(data.torqueNm))
                if (data.weightKg) setWeightKg(String(data.weightKg))
                toast("Fields filled with AI")
            })
            .catch(() => toast.error("Could not get AI suggestions"))
            .finally(() => setAiLoading(false))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)
        createMoto({
            brandName,
            modelName,
            productionYear: productionYear !== "" ? Number(productionYear) : undefined,
            type,
            displacement: displacement !== "" ? Number(displacement) : undefined,
            horsepower: horsepower !== "" ? Number(horsepower) : undefined,
            cylinders: cylinders !== "" ? Number(cylinders) : undefined,
            torqueNm: torqueNm !== "" ? Number(torqueNm) : undefined,
            weightKg: weightKg !== "" ? Number(weightKg) : undefined,
            picture,
        })
            .then((res) => {
                toast("Moto added!")
                navigate(`/moto/${res.data.slug}`)
            })
            .catch((err) => {
                setError(err.response?.data?.errorMessage ?? "Could not create moto")
            })
            .finally(() => setIsLoading(false))
    }

    return (
        <div className="min-h-screen pb-32 pt-10 px-4">
            <div className="max-w-lg mx-auto">
                <h1 className="text-2xl font-bold mb-6">Add a new bike</h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="flex flex-col items-center gap-2">
                        <button type="button" onClick={() => fileInputRef.current?.click()} className="relative group">
                            <div className="w-40 h-28 rounded-xl bg-zinc-100 dark:bg-zinc-900 overflow-hidden border border-zinc-200 dark:border-zinc-800">
                                {picture ? (
                                    <img src={picture} alt="Moto" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-zinc-400 text-xs">No photo</div>
                                )}
                                {(uploading || imageLoading) && (
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl">
                                        <span className="text-white text-xs">{imageLoading ? "Searching..." : "Uploading..."}</span>
                                    </div>
                                )}
                            </div>
                            <div className="absolute bottom-2 right-2 p-1.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900">
                                <HugeiconsIcon icon={Camera01Icon} size={13} />
                            </div>
                        </button>
                        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            disabled={!canAiFill || imageLoading}
                            onClick={handleImageSuggest}
                            className="flex items-center gap-1.5 text-xs text-zinc-500"
                        >
                            <HugeiconsIcon icon={SparklesIcon} size={13} />
                            {imageLoading ? "Searching..." : "Suggest image"}
                        </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Field label="Brand">
                            <Select value={brandName} onValueChange={setBrandName}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a brand" />
                                </SelectTrigger>
                                <SelectContent>
                                    {brands.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field label="Model">
                            <Input value={modelName} onChange={(e) => setModelName(e.target.value)} placeholder="CB650R" required />
                        </Field>
                        <Field label="Year">
                            <Select value={productionYear} onValueChange={setProductionYear}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a year" />
                                </SelectTrigger>
                                <SelectContent>
                                    {years.map((y) => <SelectItem key={y} value={String(y)}>{y}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </Field>
                    </div>

                    <div className="flex justify-end">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            disabled={!canAiFill || aiLoading}
                            onClick={handleAiFill}
                            className="flex items-center gap-1.5 text-xs"
                        >
                            <HugeiconsIcon icon={SparklesIcon} size={14} />
                            {aiLoading ? "Filling..." : "Fill with AI"}
                        </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Field label="Type">
                            <Select value={type} onValueChange={setType}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {types.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field label="Displacement (cc)">
                            <Input type="number" value={displacement} onChange={(e) => setDisplacement(e.target.value)} placeholder="649" />
                        </Field>
                        <Field label="Horsepower (hp)">
                            <Input type="number" value={horsepower} onChange={(e) => setHorsepower(e.target.value)} placeholder="95" />
                        </Field>
                        <Field label="Cylinders">
                            <Input type="number" value={cylinders} onChange={(e) => setCylinders(e.target.value)} placeholder="4" />
                        </Field>
                        <Field label="Torque (Nm)">
                            <Input type="number" value={torqueNm} onChange={(e) => setTorqueNm(e.target.value)} placeholder="63" />
                        </Field>
                        <Field label="Weight (kg)">
                            <Input type="number" value={weightKg} onChange={(e) => setWeightKg(e.target.value)} placeholder="196" />
                        </Field>
                    </div>

                    {error && <p className="text-sm text-red-500">{error}</p>}

                    <div className="flex justify-end gap-3 pt-2">
                        <Button type="button" variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
                        <Button type="submit" disabled={isLoading || uploading}>
                            {isLoading ? "Adding..." : "Add bike"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

const Field = ({ label, children }) => (
    <div className="space-y-1.5">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</label>
        {children}
    </div>
)

export default NewBikePage
