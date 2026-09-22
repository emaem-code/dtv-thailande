import type { SOURCES_PROCEDURE } from "../lib/methode-dtv";

type Source = (typeof SOURCES_PROCEDURE)[keyof typeof SOURCES_PROCEDURE];

export default function SourcesProcedure({
  sources,
  className,
}: {
  sources: readonly Source[];
  className?: string;
}) {
  return (
    <p className={className}>
      Sources officielles :{" "}
      {sources.map((source, index) => (
        <span key={source.url}>
          {index > 0 && " · "}
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
          >
            {source.titre}
          </a>
        </span>
      ))}
    </p>
  );
}
