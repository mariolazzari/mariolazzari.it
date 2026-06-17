import Image from "next/image";

type Props = {
  src: string;
  size?: number;
};

export function PrevSkill({ src, size = 100 }: Props) {
  return (
    <div className="bg-secondary p-1 md:p-2 lg:p-4rounded-md">
      <Image src={`/images/${src}.svg`} alt={src} width={size} height={size} />
    </div>
  );
}
