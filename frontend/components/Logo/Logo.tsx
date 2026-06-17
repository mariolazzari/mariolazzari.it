import Image from "next/image";
import LogoImg from "@/public/images/logo.png";
import { LogoProps } from ".";

export function Logo({ isSmall = false, className = "my-4" }: LogoProps) {
  const size = isSmall ? 100 : 200;

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
