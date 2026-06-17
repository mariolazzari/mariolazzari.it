import {
  Counters,
  Hero,
  LastCertifications,
  Projects,
  Skills,
} from "@/views/Home";

function HomePage() {
  return (
    <div className="flex flex-col gap-4 px-4 py-8">
      <Hero />
      <Counters />
      <Projects />
      <Skills />
      <LastCertifications />
    </div>
  );
}
export default HomePage;
