import { Button } from "@/components/ui/button";

function HomePage() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-semibold">Mario Lazzari</h1>
      <h2 className="text-3xl">Senior full stack developer</h2>
      <Button>Resume</Button>
    </div>
  );
}

export default HomePage;
