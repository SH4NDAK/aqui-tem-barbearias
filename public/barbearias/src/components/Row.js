export default function Row({ children, className, props }) {
    return (
        <div
            className={"w-full flex flex-col gap-4 lg:flex-row py-4 " + className}
            {...props}
        >
            {children}
        </div>
    )
}