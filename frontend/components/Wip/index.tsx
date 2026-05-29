import WipImage from "@/public/images/wip.png";
import Image from "next/image";
import { Button } from "../ui/button";
import { Link } from "@/i18n/routing";

function Wip() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full gap-4">
      <Image src={WipImage} alt="WIP" priority />
      <Link href="/">
        <Button>Home</Button>
      </Link>
    </div>
  );
}

export default Wip;
