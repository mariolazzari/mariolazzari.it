import { Logo } from "@/components/Logo";

function LoadingPage() {
  return (
    <div className="w-full h-full flex justify-center items-center bg-black bg-opacity-10">
      <div className="animate-spin">
        <Logo isSmall />
      </div>
    </div>
  );
}

export default LoadingPage;
