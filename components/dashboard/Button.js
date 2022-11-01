function Button({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r"
    >
      {text}
    </button>
  );
}

export default Button;
