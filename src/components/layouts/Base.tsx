import { FC, ReactNode } from 'react'

interface Props {
    children: ReactNode
}

export const BaseLayout: FC<Props> = ({ children }) => {
    return <div className="bg-red mx-auto flex min-h-screen max-w-5xl justify-center">{children}</div>
}
