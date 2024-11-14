/* eslint-disable @typescript-eslint/no-explicit-any */
import { isUUID as isUUIDClassValidator } from "class-validator";

function isInt(value: string | number) {
  if (value === null) return false;

  if (typeof value === "number") return Number.isInteger(value);
  return /^\d+$/.test(value);
}
function isUUID(value: string | number) {
  return isUUIDClassValidator(value);
}

function isUlid(value: string | number) {
  if (typeof value === "number") return false;
  if (value.length !== 26) return false;
  return true;
}

export function whereId(id: string | number): any {
  if (isInt(id)) return { id: Number(id) };
  if (isUUID(id)) return { uuid: String(id) };
  if (isUlid(id)) return { publicId: String(id) };

  return { id: Number(id) };
}
