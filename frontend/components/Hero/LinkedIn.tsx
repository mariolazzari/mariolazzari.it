import Image from "next/image";
import {
  SiDocker,
  SiExpress,
  SiGo,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

type LinkedinProps = {
  showLogo?: boolean;
};

export function LinkedIn({ showLogo = false }: LinkedinProps) {
  return (
    <div className="flex gap-6 items-center my-8">
      <div className="flex flex-col gap-4 justify-center text-3xl">
        <div className="flex gap-6">
          <SiTypescript />
          <SiNodedotjs />
          <SiReact />
          <SiNextdotjs />
          <SiGo />
        </div>

        <div className="flex gap-6">
          <SiTailwindcss />
          <SiExpress />
          <SiMongodb />
          <SiPostgresql />
          <SiDocker />
        </div>
      </div>

      {showLogo && (
        <Image src="/images/logo.png" width={50} height={50} alt="Mario" />
      )}
    </div>
  );
}
