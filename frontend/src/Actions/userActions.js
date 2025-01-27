// Define the local and production URLs
const LOCAL_URL = "http://localhost:5000"; // Local backend URL
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://mongo-todo-authentication.netlify.app"; // Production backend URL

// Determine the appropriate URL based on the environment
const BACKEND_URL = process.env.NODE_ENV === "production" ?  VITE_BACKEND_URL: LOCAL_URL;

console.log("Backend URL:", BACKEND_URL);

// Register function
export async function register(formData) {
  try {
    const { email, password } = formData; // Destructure form data
    console.log("Register payload:", { email, password });

    // Make a POST request to the register endpoint
    const response = await axios.post(
      `${BACKEND_URL}/api/user/register`,
      { email, password }, // Payload
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, // Include cookies
      }
    );

    console.log("Register response:", response.data);
    return { success: response.data, error: null };
  } catch (error) {
    // Axios automatically provides error details
    console.error("Register error:", error.response || error.message);

    return {
      success: null,
      error: error.response?.data?.error || "Something went wrong. Please try again.",
    };
  }
}

// Login function
export async function login(previousState, formData) {
  try {
    const { email, password } = formData; // Destructure form data
    console.log("Login payload:", { email, password });

    // Make a POST request to the login endpoint
    const response = await axios.post(
      `${BACKEND_URL}/api/user/login`,
      { email, password }, // Payload
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, // Include cookies
      }
    );

    console.log("Login response:", response.data);

    // Return successful response
    return { success: response.data, error: null };
  } catch (error) {
    // Log and return detailed error information
    console.error("Login error:", error.response || error.message);

    return {
      ...previousState,
      error: error.response?.data?.error || "Something went wrong. Please try again.",
    };
  }
}