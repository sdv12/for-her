/** Une clases condicionales. Sin merge: el `className` externo suma, no pisa variantes. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
