interface ResearchThemesProps {
  themes: string[];
}

export default function ResearchThemes({ themes }: ResearchThemesProps) {
  if (themes.length === 0) return null;

  return (
    <div className="border-4 border-black bg-black/5 p-4">
      <h2 className="text-sm font-black uppercase tracking-wide mb-3">
        Research Themes
      </h2>
      <div className="flex flex-wrap gap-2">
        {themes.map((theme) => (
          <span
            key={theme}
            className="px-3 py-1.5 bg-white border-2 border-black text-xs font-bold"
          >
            {theme}
          </span>
        ))}
      </div>
    </div>
  );
}
