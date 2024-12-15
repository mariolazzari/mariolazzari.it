import { Logo } from "@/components/Logo";

function LoadingPage() {
  return (
    <div className="w-full h-full flex justify-center items-center bg-muted bg-gradient-to-br from-muted to-background bg-opacity-10">
      <div className="animate-spin">
        <Logo isSmall />
      </div>
    </div>
  );
}

export default LoadingPage;
