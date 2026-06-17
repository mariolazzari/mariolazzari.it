import { GitHubCalendar } from "react-github-calendar";
import { Title } from "../Typography";
import { Button } from "../ui/button";
import { FaGithub } from "react-icons/fa6";
import Link from "next/link";

function GithubActivities() {
  return (
    <div className="flex flex-col items-center gap-16 pb-16">
      <Title>Il mio profilo Github</Title>
      <GitHubCalendar username="mariolazzari" />

      <Link
        href="https://github.com/mariolazzari"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button className="flex items-center gap-2">
          <FaGithub size={32} />
          Mostra
        </Button>
      </Link>
    </div>
  );
}

export default GithubActivities;
