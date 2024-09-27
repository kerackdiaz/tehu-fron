const getCompanies = async (token: string, userCompanyId: number) => {
  try {
    const response = await fetch( `${import.meta.env.VITE_API_URL}/company/${userCompanyId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token
      },
    });

    if (response.ok) {
      const data = await response.json();
      // console.log(data);
      localStorage.setItem('companies', JSON.stringify(data));
      return data
    }
  } catch (error) {
    console.error('Error fetching companies: ', error);
  }
}

export { getCompanies };