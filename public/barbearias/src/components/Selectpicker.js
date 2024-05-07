import React from 'react'
import Col from "./Col";
import Label from "./Label";

const Selectpicker = React.forwardRef(({ label, children, ...props }, ref) => {
    return (
        <Col
            variant={"auto"}
        >
            <div class="w-full">
                <Label
                    label={label}
                />
                <select
                    ref={ref}
                    className="w-full rounded-sm border-b border-[#242222] p-1 text-[#242222] outline-none uppercase"
                    {...props}
                >
                    {children}
                </select>
            </div>
        </Col>
    )
});

export default Selectpicker;