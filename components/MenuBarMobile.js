"use client";
import React from 'react'
import Link from 'next/link'
import { FiMenu as Icon } from 'react-icons/fi'
import { FaUser } from 'react-icons/fa'

export default function MenuBarMobile({ setter }) {
    return (
        <nav className={`md:hidden z-20 fixed top-0 left-0 right-0 h-[60px] bg-white flex justify-between items-center px-2`}>
            <button
                className={"text-4xl text-black/70"}
                onClick={() => {
                    setter(oldVal => !oldVal);
                }}
            >
                <Icon />
            </button>
           
        </nav>
    )
}