import Image from "next/image";
import {
  SiExpress,
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
    <div className="flex gap-8">
      <div className="flex flex-col gap-4 justify-center text-3xl">
        <div className="flex gap-6">
          <SiTypescript />
          <SiNodedotjs />
          <SiReact />
          <SiNextdotjs />
        </div>

        <div className="flex gap-6">
          <SiTailwindcss />
          <SiExpress />
          <SiMongodb />
          <SiPostgresql />
        </div>
      </div>

      <Image src="/images/logo.png" width={100} height={100} alt="Mario" />
    </div>
  );
}

export default LinkedIn;
