import { cn } from "../utils/cn"


export default function Row({ className, children }) {
    return (
        <div
            className={cn("w-full flex flex-col gap-4 lg:flex-row py-4", className)}
        >
            {children}
        </div>
    )
}