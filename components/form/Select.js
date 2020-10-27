export default function Select({
  className = '',
  onChange = () => {},
  options = [],
  selected,
}) {
  return (
    <select onChange={ev => onChange(ev.target.value)} defaultValue={selected} className={`form-select h-full py-0 pl-2 pr-8 border-transparent bg-transparent text-gray-500 sm:text-sm sm:leading-5 ${className}`}>
      {
        options.map((option, index) => (
          <option key={index} value={option.value}>{option.text}</option>
        ))
      }
    </select>
  )
}