import { ArrowRightCircle } from "lucide-react";
import Button from "./Button";

export default function Card({icon, title, description, ...props}) {
    return (
        <div
            className="flex flex-col flex-wrap gap-1 bg-gray-200 w-fit p-2 rounded-md shadow-sm shadow-[#242222] cursor-pointer transition-all hover:scale-105"
            {...props}
        >
            <div className="flex items-center">
                <div className="me-1">
                    {icon}
                </div>
                <span className="font-bold text-lg uppercase">{title}</span>
            </div>
            <div>
                <span>
                    {description}
                </span>
            </div>
            <Button
                type="button"
                variant="icon"
                {...props}
            >
                Acessar
                <ArrowRightCircle className="ms-1" />
            </Button>
        </div>
    )
}