import { ReactNode } from 'react'

interface CardProps {
    children: ReactNode
    className?: string
    title?: string
}

export default function Card({ children, className = '', title }: CardProps) {
    return (
        <div className={`card ${className}`}>
            {title && (
                <div className="card-header">
                    <h3 className="card-title">{title}</h3>
                </div>
            )}
            <div className="card-body">
                {children}
            </div>
        </div>
    )
}
