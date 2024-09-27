const getDeviceLastOther = async (userCompanyId: number) => {
  try {
    const response = await fetch( `${import.meta.env.VITE_API_URL}/device/last/other`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'company_id': userCompanyId.toString()
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

export default getDeviceLastOther;

