import Image from "next/image";

function LoadingPage() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Image
        className="animate-spin"
        src="/images/logo.png"
        alt="Mario Lazzari"
        width={100}
        height={100}
        priority
      />
    </div>
  );
}

export default LoadingPage;
