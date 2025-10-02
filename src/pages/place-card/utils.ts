export function getRatingWidth(rating: number): string {
  const clamped = Math.max(0, Math.min(5, rating));
  return `${Math.round((clamped / 5) * 100)}%`;
}
