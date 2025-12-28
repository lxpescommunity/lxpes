import { ReactNode } from 'react'

interface BadgeProps {
    children: ReactNode
    variant?: 'success' | 'warning' | 'danger' | 'info' | 'primary'
    className?: string
}

export default function Badge({
    children,
    variant = 'primary',
    className = ''
}: BadgeProps) {
    return (
        <span className={`badge badge-${variant} ${className}`}>
            {children}
        </span>
    )
}
