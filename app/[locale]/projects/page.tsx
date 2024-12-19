import { getNpms } from "@/actions/npm";
import { NpmCard } from "@/components/NpmCard";
import { Subtitle } from "@/components/Typography";

async function ProjectsPage() {
  const npms = await getNpms();

  return (
    <section className="flex flex-col items-center gap-8">
      <Subtitle text="I mie pacchetti NPM" />
      <div className="flex justify-center items-center flex-wrap gap-16">
        {npms.objects.map(npm => (
          <NpmCard
            key={npm.package.name}
            npm={npm.package}
            downloads={npm.downloads}
          />
        ))}
      </div>
    </section>
  );
}

export default ProjectsPage;
