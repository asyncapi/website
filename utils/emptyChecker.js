const emptyChecker = (obj) => {
    let isDataEmpty = true;

    for (const key in obj) {

      if (obj.hasOwnProperty(key)) isDataEmpty = false;
    }
    return isDataEmpty;
  };
  
  export default emptyChecker;
  