export default function Cancel({ className, onClick }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      width="24px"
      height="24px"
      className={className}
      onClick={onClick}
      style={{
        cursor: "pointer",
      }}
    >
      <g>
        <path d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z"></path>
      </g>
    </svg>
  );
}
