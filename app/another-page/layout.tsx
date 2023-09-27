
import { useState, useEffect } from 'react';

export interface AnotherPageLayoutProps {
    children?: React.ReactNode
}

export default function AnotherPageLayout({ children }: AnotherPageLayoutProps) {
    return (
        <main className="">{children}</main>
    )
}


