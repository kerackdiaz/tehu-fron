const getDeviceLastOnline = async (userCompanyId: number) => {
  try {
    const response = await fetch( `${import.meta.env.VITE_API_URL}/device/last/online/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'company_id': userCompanyId.toString()
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      
      return data
    }
  } catch (error) {
    console.error(error);
  }
}

export default getDeviceLastOnline;