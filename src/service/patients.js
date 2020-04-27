
export const getPatients = async (page, limit, search) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/patients?page=${page}&limit=${limit}&search=${encodeURI(search)}`)
    const data = await res.json();
    return data;
}