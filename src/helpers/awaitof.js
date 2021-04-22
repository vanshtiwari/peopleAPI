const of = async (promise) => {
  try {
    const result = await Promise.resolve(promise);
    return [result];
  } catch (err) {
    return [undefined, err];
  } 
} 
export default of;
