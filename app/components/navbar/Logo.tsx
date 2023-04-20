'use client';

import Image from "next/image"
import { useRouter } from "next/navigation";

const Logo = () => {
    const router = useRouter();

    return (
        <Image
            onClick={() => router.push('/')}
            alt="Logo"
            src="/images/logo.png"
            className="hidden md:block object-contain cursor-pointer"
            height="100"
            width="100"            
        />
    )
}

export default Logo;
