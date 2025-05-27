import { ActiveLinksType } from "@/2_widgets/navigation/ui/Navigation";

export function getActiveLinkFromUrl(pathname: string): ActiveLinksType {
  return pathname?.split("/")[
    pathname.split("/").length - 1
  ] as ActiveLinksType;
}
