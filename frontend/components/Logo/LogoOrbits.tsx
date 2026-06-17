import Image from "next/image";
import { OrbitingCircles } from "../ui/orbiting-circles";
import { Logo } from ".";

export function LogoOrbits() {
  const backImgs = ["linux", "docker", "postgres", "go"];
  const frontImgs = ["react", "tailwind", "html", "ts"];

  // render orbit image
  const renderImage = (img: string) => (
    <Image
      key={img}
      src={`/images/${img}.svg`}
      alt={img}
      width={30}
      height={30}
      priority
    />
  );

  return (
    <div className="relative h-80 w-full flex items-center justify-center">
      <OrbitingCircles radius={150}>
        {frontImgs.map(renderImage)}
      </OrbitingCircles>

      <OrbitingCircles radius={125} reverse>
        {backImgs.map(renderImage)}
      </OrbitingCircles>

      <Logo />
    </div>
  );
}
