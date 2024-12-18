import { getNpms } from "@/actions/npm";
import { NpmCard } from "@/components/NpmCard";

async function ProjectsPage() {
  const npms = await getNpms();

  return (
    <section>
      <div className="flex justify-center items-center flex-wrap gap-16">
        {npms.objects.map(npm => (
          <NpmCard
            key={npm.package.name}
            npm={npm.package}
            downloads={npm.downloads}
            score={npm.score}
          />
        ))}
      </div>
    </section>
  );
}

export default ProjectsPage;
