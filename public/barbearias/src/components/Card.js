import { ArrowRightCircle } from "lucide-react";
import Button from "./Button";

export default function Card({icon, title, description, ...props}) {
    return (
        <div
            className="lg:justify-center w-full flex flex-col flex-wrap gap-1 bg-gray-200 p-2 rounded-md shadow-sm shadow-[#242222] cursor-pointer transition-all hover:scale-105 fixed-size-card"
            {...props}
        >
            <div className="flex items-center">
                <div className="me-1">
                    {icon}
                </div>
                <span className="font-bold text-lg uppercase">{title}</span>
            </div>
            <Button
                type="button"
                variant="icon"
                {...props}
                className="lg:self-end"
            >
                Acessar
                <ArrowRightCircle className="ms-1" />
            </Button>
        </div>
    )
}
