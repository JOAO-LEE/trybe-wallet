const currencyAPI = async () => {
  const apiRequest = await fetch('https://economia.awesomeapi.com.br/json/all');
  const apiResponse = await apiRequest.json();
  delete apiResponse.USDT;
  return apiResponse;
};

export default currencyAPI;
