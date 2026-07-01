import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

const sizeClasses = {
    sm: 'size-7',
    md: 'size-10',
    lg: 'size-12',
    xl: 'size-24',
}

const fallbackTextClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-sm',
    xl: 'text-2xl',
}

const ringClasses = {
    admin:    'ring-2 ring-offset-2 ring-amber-400 ring-offset-[var(--background)]',
    verified: 'ring-2 ring-offset-2 ring-[var(--primary)] ring-offset-[var(--background)]',
}

const ProfilePic = ({ user, size = 'md' }) => {
    const ring = ringClasses[user?.status] ?? ''

    return (
        <Avatar className={`${sizeClasses[size]} ${ring}`}>
            <AvatarImage src={user?.profilePicture} alt={user?.handle} />
            <AvatarFallback className={fallbackTextClasses[size]}>
                {user?.handle?.[0]?.toUpperCase()}
            </AvatarFallback>
        </Avatar>
    )
}

export default ProfilePic
