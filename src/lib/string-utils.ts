export function capitalizeWords(str: string): string {
  return str
    .split(" ")
    .map((word) => word.charAt(0).to() + word.slice(1).toLowerCase())
    .join(" ");
}
