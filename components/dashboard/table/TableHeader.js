import HeaderCell from "./HeaderCell";

export default function TableHeader({ headers }) {
  return (
    <thead>
      <tr>
        {headers.map((headerTitle) => (
          <HeaderCell key={headerTitle} title={headerTitle} />
        ))}
      </tr>
    </thead>
  );
}
