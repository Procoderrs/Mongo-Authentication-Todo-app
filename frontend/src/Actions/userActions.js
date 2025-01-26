// Define the local and production URLs
const LOCAL_URL = "http://localhost:5000"; // Local backend URL
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://mongo-todo-authentication.netlify.app"; // Production backend URL

// Determine the appropriate URL based on the environment
const BACKEND_URL = process.env.NODE_ENV === "production" ?  VITE_BACKEND_URL: LOCAL_URL;

console.log("Backend URL:", BACKEND_URL);

// Register function
export async function register(formData) {
  try {
    const { email, password } = formData; // Destructure the form data
    console.log('Payload:', { email, password });

    // Make the API call to the backend
    const res = await fetch(`${BACKEND_URL}/api/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    // Check for errors
    if (!res.ok) {
      console.log('Backend Error:', data);
      return { success: null, error: data.error || 'Unknown error occurred' };
    }

    // Return the response if successful
    return { success: data, error: null };
  } catch (error) {
    console.error('Frontend Error:', error);
    return { success: null, error: 'Something went wrong. Please try again.' };
  }
}

// Login function
export async function login(previousState, formData) {
  try {
    const { email, password } = formData; // Destructure the form data
    console.log("Sending request with:", { email, password });
    

    // Make the API call to the backend
    const res = await fetch(`${BACKEND_URL}/api/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include credentials (cookies)
      body: JSON.stringify({ email, password }),
    });

    // Check if the response is successful
    if (!res.ok) {
      const errorResponse = await res.json();
      console.error("Login failed with status:", res.status, "Error:", errorResponse);
      return { ...previousState, error: errorResponse?.error || "Something went wrong" };
    }

    const data = await res.json();
    console.log("Login response:", data,'token',data.token);

    

    // If there's an error in the response, handle it
    if (data?.error) {
      return { ...previousState, error: data.error };
    }

    // Successful login
    return { error: null, success: data };
  } catch (error) {
    console.error("Login request error:", error);
    return { ...previousState, error: "Something went wrong" };
  }
}
