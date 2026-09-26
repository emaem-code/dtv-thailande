type IconName = "eligibility" | "passport" | "book" | "message" | "location" | "window" | "play" | "pause" | "replay";

/** Pictogrammes décoratifs : le libellé du lien ou du bouton porte son sens. */
export default function ActionIcon({ name, size = 18 }: { name: IconName; size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      style={{ display: "inline-block", width: size, height: size, flexShrink: 0, verticalAlign: "middle" }}
    >
      {name === "eligibility" && <><rect x="4" y="3" width="16" height="18" rx="3" /><path d="m7 9 1.5 1.5L11 8M14 9h3m-10 6 1.5 1.5L11 14m3 1h3" /></>}
      {name === "passport" && <><rect x="4" y="2" width="16" height="20" rx="3" /><circle cx="12" cy="10" r="4" /><path d="M8 10h8m-4-4c2 2 2 6 0 8-2-2-2-6 0-8ZM9 18h6" /></>}
      {name === "book" && <><path d="M12 5C9 3 5 3 2 4v15c3-1 7-1 10 1 3-2 7-2 10-1V4c-3-1-7-1-10 1Zm0 0v15" /></>}
      {name === "message" && <path d="M20 4H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3v4l5-4h8a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2ZM7 9h10M7 13h6" />}
      {name === "location" && <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.5" /></>}
      {name === "window" && <><rect x="8" y="3" width="13" height="13" rx="2" /><path d="M5 8H4a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-1" /></>}
      {name === "play" && <path d="m8 5 11 7-11 7V5Z" />}
      {name === "pause" && <path d="M8 5v14M16 5v14" />}
      {name === "replay" && <path d="M3 11a9 9 0 1 1 2.7 6.4M3 4v7h7" />}
    </svg>
  );
}
