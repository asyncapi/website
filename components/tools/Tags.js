export default function SelectTags({name='', bgColor, borderColor}) {
  return (
    <div className={`text-center dark:text-black text-sm py-1 px-2 rounded-lg ${bgColor} border ${borderColor}`} data-testid='Tags-main'>
      {name} 
    </div>
  )
}
