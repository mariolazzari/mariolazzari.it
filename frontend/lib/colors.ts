export function getLanguageColor(language: string): string | undefined {
  switch (language?.toLowerCase()) {
    case "css":
      return "#663399";

    case "dockerfile":
      return "#374d54";

    case "go":
      return "#00add8";

    case "html":
      return "#e34c27";

    case "javascript":
      return "#f1e05a";

    case "jupyter notebook":
      return "#da5b0d";

    case "python":
      return "#3572a5";

    case "rust":
      return "#dea584";

    case "shell":
      return "#89e050";

    case "solidity":
      return "#aa6746";

    case "typescript":
      return "#3178c6";

    default:
      return undefined;
  }
}
