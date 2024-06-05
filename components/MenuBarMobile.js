"use client";
import React from 'react';
import Link from 'next/link';
import { FiMenu as Icon } from 'react-icons/fi';
import { FaUser } from 'react-icons/fa';

export default function MenuBarMobile({ setter }) {
    return (
        <nav className={`md:hidden z-20 fixed top-0 left-0 right-0 h-[60px] bg-[#fafafa] flex justify-between items-center px-2`}>
            <button
                className={"text-3xl text-black/70"}
                onClick={() => {
                    setter(oldVal => !oldVal);
                }}
            >
                <Icon />
            </button>
            <div className="flex items-center">
                <img src="/logo.png" alt="Logo" className="h-8" width="100%" height="100%" /> {/* Logo */}
            </div>
        </nav>
    );
}
