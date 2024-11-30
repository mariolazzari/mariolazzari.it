import { Logo } from "../Logo";
import { Buttons } from "./Buttons";

function Hero() {
  return (
    <section className="flex flex-col items-center">
      <Logo />

      <h1 className="text-6xl font-bold text-primary text-center">
        Mario Lazzari
      </h1>
      <h2 className="text-4xl text-center font-semibold">
        Senior full stack developer
      </h2>

      <Buttons />

      <p className="max-w-xl text-center mb-4">
        Benvenuti nel mio sito, nel quale potrete trovare alcune informazioni su
        di me, i miei interessi e gli strumenti che utilizzo quotidianamente
        come sviluppatore software.
      </p>
    </section>
  );
}

export default Hero;
