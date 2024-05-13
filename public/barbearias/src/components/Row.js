import { cn } from "../utils/cn"


export default function Row({ className, children }) {
    return (
        <div
            className={cn("w-full flex gap-4 py-4 lg:flex-row sm:flex-col flex-wrap", className)}
        >
            {children}
        </div>
    )
}