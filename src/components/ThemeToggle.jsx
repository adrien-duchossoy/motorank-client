import { useTheme } from '../context/theme.context'
import { HugeiconsIcon } from '@hugeicons/react'
import { Moon02Icon, Sun01Icon } from '@hugeicons/core-free-icons'
import { Button } from "@/components/ui/button"

export const ThemeToggle = () => {
    const { theme, setTheme } = useTheme()

    return (
        <Button variant="outline" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            <HugeiconsIcon icon={Sun01Icon} className="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <HugeiconsIcon icon={Moon02Icon} className="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        </Button>
    )
}
