import Image from "next/image";
import { Button } from "@/components/ui/button";
import Logo from "@/public/images/logo.png";

function HomePage() {
  return (
    <div className="flex flex-col items-center">
      <Image
        className="my-8"
        src={Logo}
        alt="Mario Lazzari"
        width={192}
        height={192}
        priority
      />
      <h1 className="text-4xl font-semibold text-primary">Mario Lazzari</h1>
      <h2 className="text-3xl">Senior full stack developer</h2>
      <Button>Resume</Button>
    </div>
  );
}

export default HomePage;
