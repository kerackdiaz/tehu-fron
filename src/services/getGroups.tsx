const getGroups = async () => {
  
  try {
    const response = await fetch( `${import.meta.env.VITE_API_URL}/cluster/list/1`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data
    }
  } catch (error) {
    console.error(error);
  }
}

export default getGroups;