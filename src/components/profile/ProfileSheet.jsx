import { useState, useEffect, useRef } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowLeft01Icon, Camera01Icon, User02Icon } from "@hugeicons/core-free-icons"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FieldError } from "@/components/ui/field"
import {
    myProfile,
    updateGeneralProfile,
    updateHandle,
    updateEmail,
    updatePassword,
    updateProfilePicture
} from "../../services/user.config"
import { uploadImage } from '@/services/upload.config'
import { Skeleton } from '../ui/skeleton'

const ProfileSheet = ({ open, onClose }) => {
    const fileInputRef = useRef(null)

    const [profile, setProfile] = useState(null)
    const [displayName, setDisplayName] = useState("")
    const [description, setDescription] = useState("")
    const [handle, setHandle] = useState("")
    const [email, setEmail] = useState("")
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [status, setStatus] = useState({})

    const [currentPasswordError, setCurrentPasswordError] = useState(false)
    const [newPasswordError, setNewPasswordError] = useState(false)
    const [confirmPasswordError, setConfirmPasswordError] = useState(false)
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("")

    const [isUploading, setIsUploading] = useState(false)

    useEffect(() => {
        if (!open) return
        myProfile()
            .then((res) => {
                const u = res.data
                setProfile(u)
                setDisplayName(u.displayName ?? "")
                setDescription(u.description ?? "")
                setHandle(u.handle ?? "")
                setEmail(u.email ?? "")
            })
            .catch(() => {})
    }, [open])

    const setSection = (section, state) =>
        setStatus((prev) => ({ ...prev, [section]: state }))

    const handleGeneralSubmit = (e) => {
        e.preventDefault()
        setSection("general", { loading: true, error: null, success: false })
        updateGeneralProfile({ displayName, description })
            .then(() => setSection("general", { loading: false, success: true }))
            .catch(() => setSection("general", { loading: false, error: "Could not update profile" }))
    }

    const handleHandleSubmit = (e) => {
        e.preventDefault()
        setSection("handle", { loading: true, error: null, success: false })
        updateHandle({ handle })
            .then(() => setSection("handle", { loading: false, success: true }))
            .catch(() => setSection("handle", { loading: false, error: "This handle may already be taken" }))
    }

    const handleEmailSubmit = (e) => {
        e.preventDefault()
        setSection("email", { loading: true, error: null, success: false })
        updateEmail({ email })
            .then(() => setSection("email", { loading: false, success: true }))
            .catch(() => setSection("email", { loading: false, error: "Could not update email" }))
    }

    const handlePasswordSubmit = (e) => {
        e.preventDefault()
        setCurrentPasswordError(false)
        setNewPasswordError(false)
        setConfirmPasswordError(false)
        setPasswordErrorMessage("")

        if (newPassword !== confirmPassword) {
            setConfirmPasswordError(true)
            setPasswordErrorMessage("Passwords do not match")
            return
        }

        setSection("password", { loading: true, success: false })
        updatePassword({ currentPassword, newPassword })
            .then(() => {
                setSection("password", { loading: false, success: true })
                setCurrentPassword("")
                setNewPassword("")
                setConfirmPassword("")
            })
            .catch(() => {
                setCurrentPasswordError(true)
                setPasswordErrorMessage("Incorrect current password")
                setSection("password", { loading: false, success: false })
            })
    }

    const handleAvatarClick = () => {
        fileInputRef.current?.click()
    }

    const handleFileSelect = (e) => {
        const file = e.target.files?.[0]
        if (!file) return
        const formData = new FormData()
        formData.append("image", file)
        setIsUploading(true)
        uploadImage(formData)
            .then((res) => {
                const profilePicture = res.data.imageUrl
                return updateProfilePicture({ profilePicture })
            })
            .then((res)=> {
                setProfile(res.data)
            })
            .catch((err) => console.error(err))
            .finally(()=> setIsUploading(false))
    }

    return (
        <Sheet open={open} onOpenChange={onClose}>
            <SheetContent
                side="left"
                className="w-full md:w-[480px] p-0 overflow-y-auto [&>button]:hidden"
            >
                {/* Header */}
                <div className="flex items-center gap-3 px-6 py-5 border-b border-zinc-200 dark:border-zinc-800">
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-700 dark:text-zinc-200"
                    >
                        <HugeiconsIcon icon={ArrowLeft01Icon} size={20} />
                    </button>
                    <h2 className="font-semibold text-base">My profile</h2>
                </div>

                <div className="px-6 py-8 space-y-8">
                    {/* Avatar */}
                    <div className="flex justify-center">
                        <button onClick={handleAvatarClick} className="relative group">
                            <div className="w-24 h-24 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                                {isUploading ? (
                                    <Skeleton className="w-24 h-24 rounded-full" />
                                ) : profile?.profilePicture ? (
                                    <img
                                        src={profile.profilePicture}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-zinc-400">
                                        <HugeiconsIcon icon={User02Icon} size={36} />
                                    </div>
                                )}
                            </div>
                            <div className="absolute bottom-0 right-0 p-1.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-2 border-white dark:border-zinc-900">
                                <HugeiconsIcon icon={Camera01Icon} size={14} />
                            </div>
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileSelect}
                        />
                    </div>

                    {/* General info */}
                    <Section title="General">
                        <form onSubmit={handleGeneralSubmit} className="space-y-3">
                            <Field label="Display name">
                                <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Your name" />
                            </Field>
                            <Field label="Bio">
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={3}
                                    placeholder="A few words about you..."
                                    className="w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600 resize-none"
                                />
                            </Field>
                            <SectionFooter status={status.general} />
                        </form>
                    </Section>

                    {/* Handle */}
                    <Section title="Username">
                        <form onSubmit={handleHandleSubmit} className="space-y-3">
                            <Field label="Handle">
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-3 flex items-center text-zinc-400 text-sm pointer-events-none">@</span>
                                    <Input value={handle} onChange={(e) => setHandle(e.target.value)} className="pl-7" placeholder="yourhandle" />
                                </div>
                            </Field>
                            <SectionFooter status={status.handle} />
                        </form>
                    </Section>

                    {/* Email */}
                    <Section title="Email">
                        <form onSubmit={handleEmailSubmit} className="space-y-3">
                            <Field label="Email address">
                                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
                            </Field>
                            <SectionFooter status={status.email} />
                        </form>
                    </Section>

                    {/* Password */}
                    <Section title="Password">
                        <form onSubmit={handlePasswordSubmit} className="space-y-3">
                            <Field label="Current password">
                                <Input
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => { setCurrentPassword(e.target.value); setCurrentPasswordError(false); setPasswordErrorMessage("") }}
                                    className={currentPasswordError ? "border border-red-500" : "border"}
                                    aria-invalid={currentPasswordError}
                                />
                                {currentPasswordError && <FieldError>{passwordErrorMessage}</FieldError>}
                            </Field>
                            <Field label="New password">
                                <Input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => { setNewPassword(e.target.value); setNewPasswordError(false); setPasswordErrorMessage("") }}
                                    className={newPasswordError ? "border border-red-500" : "border"}
                                    aria-invalid={newPasswordError}
                                />
                                {newPasswordError && <FieldError>{passwordErrorMessage}</FieldError>}
                            </Field>
                            <Field label="Confirm new password">
                                <Input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => { setConfirmPassword(e.target.value); setConfirmPasswordError(false); setPasswordErrorMessage("") }}
                                    className={confirmPasswordError ? "border border-red-500" : "border"}
                                    aria-invalid={confirmPasswordError}
                                />
                                {confirmPasswordError && <FieldError>{passwordErrorMessage}</FieldError>}
                            </Field>
                            <SectionFooter status={status.password} />
                        </form>
                    </Section>
                </div>
            </SheetContent>
        </Sheet>
    )
}

const Section = ({ title, children }) => (
    <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-4">
            {title}
        </h3>
        {children}
    </div>
)

const Field = ({ label, children }) => (
    <div className="space-y-1.5">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</label>
        {children}
    </div>
)

const SectionFooter = ({ status }) => (
    <div className="flex items-center justify-between pt-1">
        <span className="text-sm">
            {status?.error && <span className="text-red-500">{status.error}</span>}
            {status?.success && <span className="text-zinc-500">Saved</span>}
        </span>
        <Button type="submit" size="sm" disabled={status?.loading}>
            {status?.loading ? "Saving..." : "Save"}
        </Button>
    </div>
)

export default ProfileSheet
