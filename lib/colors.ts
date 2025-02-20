export function getLanguageColor(language: string): string | undefined {
  switch (language.toLowerCase()) {
    case "javascript":
      return "#f1e05a";

    case "typescript":
      return "#3178c6";

    case "oo":
      return "#00add8";

    case "html":
      return "#e34c27";

    case "python":
      return "#3572a5";

    default:
      return undefined;
  }
}
