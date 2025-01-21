/* export async function register(previousState,formData) {
  try{
    const email=formData.get('email');
    const password=formData.get('password');
    console.log(email,password)
    const res=await fetch('http://localhost:5000/api/user/register',{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({email,password })
    })
    const data=await res.json();
    if(data?.error){
      return{...previousState,error:data.error}
    }
    return {error:null,success:data}
    
  }
  catch(error){
    return{...previousState,error:'something went wrong'}

  }
} */

	/* export async function register(formData) {
		try {
			const { email, password } = formData; // Destructure the form data
			console.log(email, password);
			console.log('Payload:', { email, password });
 // Debug the email and password
	
			const res = await fetch("http://localhost:5000/api/user/register", {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			});
			console.log('Request Body:', req.body);

			const data = await res.json();
			if (data?.error) {
				return { success: null, error: data.error };
			}
			return { success: data, error: null };
		} catch (error) {
			return { success: null, error: 'Something went wrong' };
		}
	} */
	
	
		export async function register(formData) {
			try {
				const { email, password } = formData;
				console.log('Payload:', { email, password });
		
				const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/register`, {
					//const res = await fetch('http://localhost:5000/api/user/register', {

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
		
				// Success
				return { success: data, error: null };
			} catch (error) {
				console.error('Frontend Error:', error);
				return { success: null, error: 'Something went wrong. Please try again.' };
			}
		}
		
export async function login(previousState, formData) {
	try {
		const { email, password } = formData; // Use destructuring to directly get the email and password
		console.log("Sending request with:", { email, password }); // Add this line
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/login`,
			   // const res = await fetch("http://localhost:5000/api/user/login",

			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({ email, password }),
			}
		);

		// Check if the response is successful
		if (!res.ok) {
			const errorResponse = await res.json();
			console.error(
				"Login failed with status:",
				res.status,
				"Error:",
				errorResponse
			);
			return {
				...previousState,
				error: errorResponse?.error || "Something went wrong",
			};
		}

		const data = await res.json();
		console.log("Login response:", data);

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

/* export async function login(previousState,formData) {






  try{
    const email=formData.get('email');
    const password=formData.get('password');
    console.log('email',email,'password',password)
    const res=await fetch('http://localhost:5000/api/user/login',{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    credentials:'include',
    body:JSON.stringify({email,password })
    })



    if (!res.ok) {
      console.log("Login request failed with status:", res.status);
      const errorResponse = await res.json();
      console.error("Error:", errorResponse);
      return { ...previousState, error: errorResponse?.error || "Something went wrong" };
    }

    const data=await res.json();
    console.log('login response',data)
    if(data?.error){
      return{...previousState,error:data.error}
    }
    return {error:null,success:data}
    
  }
  catch(error){
    return{...previousState,error:'something went wrong'}

  }
} */
