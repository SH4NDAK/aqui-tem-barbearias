export default function Row({ children }) {
    return (
        <div
            className="w-full flex flex-col gap-4 lg:flex-row py-4"
        >
            {children}
        </div>
    )
}