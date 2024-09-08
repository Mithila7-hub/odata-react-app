import axios from 'axios';

const ODATA_URL = 'https://services.odata.org/V4/Northwind/Northwind.svc/Orders';

export const fetchOrders = async () => {
  try {
    const response = await axios.get(ODATA_URL);
    return response.data.value; // OData returns data inside 'value'
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const getDayDifference = (date1: string, date2: string): number => {
    // Parse the input dates into Date objects
    const d1 = new Date(date1);
    const d2 = new Date(date2);
  
    // Get the difference in milliseconds between the two dates
    const diffInMs = Math.abs(d2.getTime() - d1.getTime());
  
    // Convert the difference from milliseconds to days
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
  
    return diffInDays;
  };
