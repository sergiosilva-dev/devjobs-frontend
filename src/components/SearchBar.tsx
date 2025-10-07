type Props = { value: string; onChange: (value: string) => void; onSubmit: () => void };
export default function SearchBar({ value, onChange, onSubmit }: Props) {
  return (
    <form
      className="flex gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      aria-label="Buscar empleos"
    >
      <input
        className="input"
        placeholder="Buscar por título, empresa, ubicación…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button className="btn" type="submit">
        Buscar
      </button>
    </form>
  );
}
