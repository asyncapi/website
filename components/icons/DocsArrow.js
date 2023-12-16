export default function DocsArrow({ isDropDown, activeDropDownItem, onClick, className }) {
    return (
        <div className={`w-6 my-auto p-2 rounded-md cursor-pointer ${isDropDown && 'hover:bg-gray-100'}`} onClick={isDropDown ? onClick : () => { }}>
          {isDropDown && <img src='/img/illustrations/icons/arrow.svg' className={`transition-transform w-fit m-auto duration-200 transform ${className} ${activeDropDownItem ? 'rotate-90' : ''}`} />}
        </div>
      );
}
