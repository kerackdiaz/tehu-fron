const createDevice = async (formData: object) => {  
  try {    
    const response = await fetch( `${import.meta.env.VITE_API_URL}/device/create`, {
      method: 'POST',
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

export default createDevice;