export default function SelectTags({name='', bgColor, borderColor}) {
  return (
    <div className={`text-center text-sm py-1 px-2 rounded-lg ${bgColor} border ${borderColor}`}>
      {name} 
    </div>
  )
}
