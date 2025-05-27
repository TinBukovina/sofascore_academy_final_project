"use client";

import { useEventById } from "@/3_features/events/hooks/useEventById";

export default function Page() {
  const { event, isLoading, isError, error } = useEventById(1);

  if (isLoading) return <div>Učitavanje događaja</div>;
  if (isError)
    return (
      <div>
        Greška: {error?.message || "Nije moguće učitati event s tim id-jem."}
      </div>
    );
  if (!event) return <div>Event nije pronađen s tim id-jem.</div>;

  return <div>Football page</div>;
}
