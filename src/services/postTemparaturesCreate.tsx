const postTemperaturesCreate = async (bodyData: Record<string, any>) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/temperature/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyData)
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      // Manejo de errores si la respuesta no es OK
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al crear temperaturas');
    }
  } catch (error) {
    console.error(error);
    throw error; // Lanza el error para que pueda ser manejado fuera de la función si es necesario
  }
}

export { postTemperaturesCreate };
