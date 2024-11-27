import Image from "next/image";
import LogoImg from "@/public/images/logo.png";
import { LogoProps } from "./LogoProps";

export function Logo({ isSmall = false, className = "my-4" }: LogoProps) {
  const size = isSmall ? 128 : 192;

  return (
    <Image
      className={className}
      src={LogoImg}
      alt="Mario Lazzari"
      width={size}
      height={size}
    />
  );
}
