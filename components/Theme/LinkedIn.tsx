import Image from "next/image";
import {
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

function LinkedIn() {
  return (
    <div className="flex">
      <div className="flex gap-4 justify-center text-3xl">
        <SiTypescript />
        <SiNodedotjs />

        <SiReact />
        <SiNextdotjs />
        <SiTailwindcss />
        <SiExpress />

        <SiMongodb />
        <SiPostgresql />

        <SiGo />
      </div>

      <Image src="/images/logo.png" width={100} height={100} alt="Mario" />
    </div>
  );
}

export default LinkedIn;
