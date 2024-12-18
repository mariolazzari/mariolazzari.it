import { getNpms } from "@/actions/npm";

async function ProjectsPage() {
  const npms = await getNpms();

  return (
    <section>
      <div>
        {npms.objects.map(npm => (
          <div> {npm.package.name}</div>
        ))}
      </div>
    </section>
  );
}

export default ProjectsPage;
