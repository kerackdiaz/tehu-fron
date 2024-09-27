function errorMessage(msg: any): string {
  let errorMsg;

  switch (msg) {
    case "phone must be unique":
      errorMsg = "El Número de celular debe ser único";
      break;

    case "email must be unique":
      errorMsg = "El E-mail debe ser único";
      break;
     
    case "identificationNumber must be unique":
        errorMsg = "El numero de identificacion debe ser único";
        break;
      
    default:
        errorMsg = "Debe ser único";
        break;
  }
  
  return errorMsg    
}

export default errorMessage;