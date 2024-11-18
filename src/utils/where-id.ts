import { isUUID as isUUIDClassValidator } from "class-validator";

function isInt(value: string | number) {
  if (value === null) return false;

  if (typeof value === "number") return Number.isInteger(value);
  return /^\d+$/.test(value);
}
function isUUID(value: string | number) {
  return isUUIDClassValidator(value);
}

export function whereId(
  id: string | number,
): { id: number } | { uuid: string } {
  if (isInt(id)) return { id: Number(id) };
  if (isUUID(id)) return { uuid: String(id) };

  return { id: Number(id) };
}
