const getTemparatures = async (token: string, userCompanyId: number) => {
  try {
    const response = await fetch( `${import.meta.env.VITE_API_URL}/temperature/company/${userCompanyId}`, {
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
    console.error('Error fetching temperatures: ', error);
  }
}
export { getTemparatures };
