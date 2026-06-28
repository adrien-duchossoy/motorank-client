import { useState, useEffect, useRef } from "react"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { HugeiconsIcon } from "@hugeicons/react"
import { Camera01Icon } from "@hugeicons/core-free-icons"
import { updateMoto } from "../../services/moto.admin.config"
import { uploadImage } from "../../services/upload.config"

const EditMotoModal = ({ moto, open, onClose, onUpdated }) => {
    const fileInputRef = useRef(null)

    const [brandName, setBrandName] = useState("")
    const [modelName, setModelName] = useState("")
    const [type, setType] = useState("")
    const [productionYear, setProductionYear] = useState("")
    const [displacement, setDisplacement] = useState("")
    const [horsepower, setHorsepower] = useState("")
    const [picture, setPicture] = useState("")
    const [uploading, setUploading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!moto) return
        setBrandName(moto.brandName ?? "")
        setModelName(moto.modelName ?? "")
        setType(moto.type ?? "")
        setProductionYear(moto.productionYear ?? "")
        setDisplacement(moto.displacement ?? "")
        setHorsepower(moto.horsepower ?? "")
        setPicture(moto.picture ?? "")
        setError(null)
    }, [moto, open])

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

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        updateMoto(moto._id, {
            brandName,
            modelName,
            type,
            productionYear: Number(productionYear),
            displacement: displacement !== "" ? Number(displacement) : undefined,
            horsepower: horsepower !== "" ? Number(horsepower) : undefined,
            picture,
        })
            .then((res) => {
                onUpdated(res.data)
                onClose()
                toast("Moto updated")
            })
            .catch((err) => {
                setError(err.response?.data?.errorMessage ?? "Could not update moto")
            })
            .finally(() => setLoading(false))
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit moto</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-5 pt-2">
                    <div className="flex justify-center">
                        <button type="button" onClick={() => fileInputRef.current?.click()} className="relative group">
                            <div className="w-32 h-24 rounded-lg bg-zinc-100 dark:bg-zinc-900 overflow-hidden border border-zinc-200 dark:border-zinc-800">
                                {picture ? (
                                    <img src={picture} alt="Moto" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-zinc-400 text-xs">No photo</div>
                                )}
                                {uploading && (
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-lg">
                                        <span className="text-white text-xs">Uploading...</span>
                                    </div>
                                )}
                            </div>
                            <div className="absolute bottom-1.5 right-1.5 p-1.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900">
                                <HugeiconsIcon icon={Camera01Icon} size={13} />
                            </div>
                        </button>
                        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Field label="Brand">
                            <Input value={brandName} onChange={(e) => setBrandName(e.target.value)} placeholder="Honda" required />
                        </Field>
                        <Field label="Model">
                            <Input value={modelName} onChange={(e) => setModelName(e.target.value)} placeholder="CB650R" required />
                        </Field>
                        <Field label="Type">
                            <Input value={type} onChange={(e) => setType(e.target.value)} placeholder="Naked" />
                        </Field>
                        <Field label="Year">
                            <Input type="number" value={productionYear} onChange={(e) => setProductionYear(e.target.value)} placeholder="2023" />
                        </Field>
                        <Field label="Displacement (cc)">
                            <Input type="number" value={displacement} onChange={(e) => setDisplacement(e.target.value)} placeholder="649" />
                        </Field>
                        <Field label="Horsepower (hp)">
                            <Input type="number" value={horsepower} onChange={(e) => setHorsepower(e.target.value)} placeholder="95" />
                        </Field>
                    </div>

                    {error && <p className="text-sm text-red-500">{error}</p>}

                    <div className="flex justify-end gap-3">
                        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                        <Button type="submit" disabled={loading || uploading}>
                            {loading ? "Saving..." : "Save changes"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

const Field = ({ label, children }) => (
    <div className="space-y-1.5">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</label>
        {children}
    </div>
)

export default EditMotoModal
