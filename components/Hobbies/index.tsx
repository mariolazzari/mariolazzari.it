import { Palette, FlaskConical, Brain, Music, Book } from "lucide-react";
import { HobbyProps } from "./HobbyProps";
import { Hobby } from "./Hobby";

export function Hobbies() {
  const cards: HobbyProps[] = [
    {
      title: "Arte",
      icon: <Palette size={32} />,
      description:
        "Ho scoperto la passione per l'arte viaggiando con mia moglie attraverso la nostra bella Italia, visitando città d'arte e musei: in questa sezione potrete consultare i cataloghi dei musei più prestigiosi al mondo.",
      href: "/hobbies/art",
    },
    {
      title: "Scienza",
      icon: <FlaskConical size={32} />,
      description:
        "Fin da piccolo sono sempre stato affascinato dalla scienza, astronomia in particolare: in questa sezione avrete la possibilità di accedere ai servizi offerti dalla Nasa e strutture simili.",
      href: "/hobbies/sci",
    },
    {
      title: "Filosofia",
      icon: <Brain size={32} />,
      description:
        "Terminato il liceo mi sarebbe piaciuto molto studiare filosofia: ho comunque continuato a coltivare questo mio interesse, leggendo i miei autori preferiti (Platone, Kant, Hegel, Nietzsche, Heidegger)",
      href: "/hobbies/phylo",
    },
    {
      title: "Musica",
      icon: <Music size={32} />,
      description:
        "Mio padre mi ha trasmesso la passione per la chitarra, che ho studiato per oltre vent'anni, insegnando in 4 accademie di musica moderna e suonando regolarmente dal vivo in diverse band.",
      href: "/hobbies/music",
    },
    {
      title: "Letteratura",
      icon: <Book size={32} />,
      description:
        "  Trascorro la maggior parte del mio tempo libero leggendo i miei autori preferiti, in particolar modo Dostoevskij, Celine, Kafka e Thomas Mann",
      href: "/hobbies/books",
    },
  ];

  return (
    <div className="flex flex-col">
      <h4 className="text-4xl my-8 text-center">I miei interessi</h4>
      <div className="flex justify-center items-center flex-wrap gap-16">
        {cards.map(card => (
          <Hobby key={card.title} {...card} />
        ))}
      </div>
    </div>
  );
}
