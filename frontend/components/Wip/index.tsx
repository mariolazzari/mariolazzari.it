import Image from "next/image";

export function Wip() {
  const size = 300;

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Image
        src="/images/wip.png"
        width={size}
        height={size}
        alt="WIP"
        priority
      />
    </div>
  );
}
