
const getCompany = async (token: string) => {
  try {
    const response = await fetch( `${import.meta.env.VITE_API_URL}/company/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token
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

export default getCompany;