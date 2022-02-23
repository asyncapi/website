export default function LifeCycle({text, classname=''}) {
  let Color, bgColor;
  let text_type=text.toUpperCase();
  if(text_type==="DEPRECATED") {Color="white", bgColor="red-500"}
  else if(text_type==="REQUIRED") {Color="black", bgColor="yellow-300"}
  else if(text_type==="OPTIONAL") {Color="black", bgColor="gray-300"}
  
  return <div className={`inline-block ${classname}`}>
        <div className={`text-${Color} bg-${bgColor} rounded font-bold py-0.5 px-1`}>{text_type}</div>
  </div>;
}
