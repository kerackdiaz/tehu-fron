const putDevice = async (formData: object) => {  
  try {
    console.log("formData", formData);
    
    const response = await fetch( `${import.meta.env.VITE_API_URL}/device/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData) 
    });
    const data = await response.json();
    return { status: response.status, data };
  
  } catch (error) {
    console.error(error);
  }
}

export default putDevice;