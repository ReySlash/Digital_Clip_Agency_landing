type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className={`flex max-w-2xl flex-col gap-4 text-center md:text-start`}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#57d9ff]">
          {eyebrow}
        </p>
      ) : null}
      <div className="space-y-3">
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="text-base leading-7 text-slate-300 sm:text-lg">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
