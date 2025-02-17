export function getLanguageColor(language: string): string | undefined {
  switch (language) {
    case "JavaScript":
      return "#f1e05a";

    case "TypeScript":
      return "#3178c6";

    case "Go":
      return "#00add8";

    case "Html":
      return "#e34c27";

    case "Python":
      return "#3572a5";

    default:
      return undefined;
  }
}
