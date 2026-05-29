import { Container } from "@/components/Container";
import { Paragraph, Title } from "@/components/Typography";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SiNasa } from "react-icons/si";
import { Link } from "@/i18n/routing";
import { LinkIcon } from "lucide-react";

function SciencePage() {
  const progs = [
    {
      title: "NASA Open APIs",
      description: "",
      icon: <SiNasa size={48} />,
      href: "/hobbies/sci/nasa",
    },
  ];

  return (
    <>
      <Title text="Scienza" />
      <Paragraph text="Programmi scienza" />

      <Container>
        {progs.map(({ icon, title, description, href }) => (
          <Link key={href} href={href}>
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle>{icon}</CardTitle>
                <CardDescription>{title}</CardDescription>
              </CardHeader>
              <CardContent>{description}</CardContent>
              <CardFooter>
                <LinkIcon />
              </CardFooter>
            </Card>
          </Link>
        ))}
      </Container>
    </>
  );
}

export default SciencePage;
