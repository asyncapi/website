import React ,{useEffect,useState} from 'react';


function ScrollButton(){
    const [backToTopButton,setBackToTopButton]=useState(false);
    const scrollImage = '/img/loaders/scroll.svg'
    useEffect(()=>{
        window.addEventListener("scroll",()=>{
            if(window.scrollY>150){
                setBackToTopButton(true)
            }
            else{
                setBackToTopButton(false);

            }
        })
    },[])

    const scrollUp=()=>{
        window.scrollTo({
            top:0,
            behaviour:"smooth"

        })
    }
    return <div className="fixed bottom-14 right-4  h-16 w-12 z-50">
        {backToTopButton &&(
            <button className="rounded-full shadow-md bg-white " onClick={scrollUp}> <img src={scrollImage}/></button>
        )}
    </div>
}


export default ScrollButton;