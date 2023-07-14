export const generateOrderId = () => {
  // Get current date
  const date = new Date();

  // convert to IST
  const ISTOffset = 330; // IST offset UTC +5:30
  const ISTDate = new Date(date.getTime() + ISTOffset * 60000);

  const year = ISTDate.getFullYear();
  const month = String(ISTDate.getMonth() + 1).padStart(2, '0'); // months are 0-indexed in JS
  const day = String(ISTDate.getDate()).padStart(2, '0');

  const timestamp = Date.now() % 1000000; // to get last 6 digits

  return `${year}${month}${day}${timestamp}`;
};
