import { cva } from "class-variance-authority"
import { cn } from "../utils/cn"

const colVariants = cva(
    "w-fit",
    {
        variants: {
            variant: {
                half: "w-1/2",
                full: "w-full",
                auto: "w-auto"

            }
        },
    },
)

export default function Col({ variant, className, children }) {
    return (
        <div
            className={cn(colVariants({ variant }), className)}
        >
            {children}
        </div>
    )
}