import { Paragraph } from "@/components/Typography";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Apod } from "@mariolazzari/nasa-api";
import Image from "next/image";

type Props = {
  apod: Apod;
};

export function Picture({ apod }: Props) {
  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>{apod.title}</CardTitle>
        <CardDescription>{apod.date}</CardDescription>
      </CardHeader>
      <CardContent>
        <Image
          src={apod.url}
          alt={apod.title}
          width={400}
          height={300}
          priority
        />
        <div className="h-64 overflow-y-auto mt-4">
          <Paragraph text={apod.explanation} />
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
