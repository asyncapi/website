export default function LifeCycle({text, classname=''}) {
  let Color, bgColor;
  let text_type=text.toUpperCase();
  if(text_type==="DEPRECATED") {Color="white", bgColor="deprecated"}
  else if(text_type==="REQUIRED") {Color="black", bgColor="required"}
  else if(text_type==="OPTIONAL") {Color="black", bgColor="optional"}
  
  return <div className={`inline-block ${classname}`}>
        <div className={`text-${Color} bg-${bgColor} rounded font-bold py-0.5 px-1`}>{text_type}</div>
  </div>;
}
