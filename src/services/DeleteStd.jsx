import axios from "axios";
const DeleteStd = async (studentId) => {
  try {
    const response = await axios.delete(`http://127.0.0.1:8000/std/${studentId}/`);
    return response.data;  // Ensure you're returning response data
  } catch (error) {
    if (error.response) {
      console.error("Server responded with an error:", error.response.status, error.response.data);
      throw new Error(
        `Error ${error.response.status}: ${
          error.response.data.error || error.response.data.message || "Unknown error"
        }`
      );
    } else {
      console.error("No response from the server or network error", error);
      throw new Error("Network error or server not responding");
    }
  }
};

export default DeleteStd