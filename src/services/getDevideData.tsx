const getDevideData = async (deviceName: string) => {
  try {
    const response = await fetch( `${import.meta.env.VITE_API_URL}/device/get-table-data/${deviceName}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data
    }
  } catch (error) {
    console.error('Error fetching companies: ', error);
  }
}

export { getDevideData };