import axios from "axios";

export const fetchUsers = async () => {
    try {
        const { data } = await axios.get("http://localhost:3003/users");
        console.log("data", data);
        return data;
    } catch (error) {
        console.log("Error", error);
        throw error;
    }
}

export const updateUser = async (id, user) => {
    try {
        const { data } = await axios.patch(`http://localhost:3002/users/${id}`, user);
        return data;
    } catch (error) {
        throw error;
    }
}

export const exportCSV = async () => {
    try {
        const { data } = await axios.get("http://localhost:3001/export");
        return data;
    } catch (error) {
        throw error;
    }
}