import { Subtitle } from "../Typography";
import { RepositoryCard } from "./RepositoryCard";
import { RepositoriesProps } from "./RepositoriesProps";

export function Repositories({ title = "", repos = [] }: RepositoriesProps) {
  return (
    <>
      <Subtitle text={title} />
      <div className="flex justify-center items-center flex-wrap gap-16">
        {repos.map(repo => (
          <RepositoryCard
            key={repo.name}
            title={repo.name}
            description={repo.description}
            language={repo.language}
            stars={repo.stargazers_count}
            watchers={repo.watchers_count}
            forks={repo.forks}
            isPrivate={repo.private}
            updated={repo.updated_at}
            href={repo.archive_url}
          />
        ))}
      </div>
    </>
  );
}
