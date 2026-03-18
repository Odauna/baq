import React from "react";

export default function WargaLayout({
    // modal,
    children
} : {
    // modal: React.ReactNode;
    children: React.ReactNode;
}) {
    return (
        <section>
            {/* <div>
                {modal}
            </div> */}
            {children}
        </section>
    )
}