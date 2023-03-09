import React ,{useEffect,useState} from 'react';


function ScrollButton(){
    const [backToTopButton,setBackToTopButton]=useState(false);
    const scrollImage = '/img/loaders/images.png'
    useEffect(()=>{
        window.addEventListener("scroll",()=>{
            if(window.scrollY>100){
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
    return <div className="fixed bottom-12 right-4 h-12 w-12">
        {backToTopButton &&(
            <button className=""onClick={scrollUp}> <img src={scrollImage}/></button>
        )}
    </div>
}


export default ScrollButton;