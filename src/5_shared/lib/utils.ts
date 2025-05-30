import { ActiveLinksType } from "@/2_widgets/navigation/ui/Navigation";

export function getActiveLinkFromUrl(pathname: string): ActiveLinksType {
  return pathname?.split("/")[
    pathname.split("/").length - 1
  ] as ActiveLinksType;
}

export function formatDateFromDate(value: string | Date): string | null {
  let date;

  if (value instanceof Date && !isNaN(value.getTime())) {
    return null;
  }

  if (typeof value === "string") {
    date = new Date(value);
  } else {
    date = value;
  }

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
