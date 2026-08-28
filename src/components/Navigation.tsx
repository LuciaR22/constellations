"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
    const pathname = usePathname();

    const links = [
        { href: "/", label: "Home" },
        { href: "/login", label: "Login" },
    ];

    return (
        <nav className="flex gap-4 p-4 border-b border-zinc-200">
            {links.map(link => (
                <Link
                    key={link.href}
                    href={link.href}
                    className={pathname === link.href ? "text-blue-600 font-bold" : "text-zinc-500 font-normal"}
                >
                    {link.label}
                </Link>
            ))}
        </nav>
    );
}
