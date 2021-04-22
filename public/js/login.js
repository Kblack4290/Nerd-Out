const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const name = document.querySelector('#signin-name').value.trim();
  const password = document.querySelector('#signin-password').value.trim();

  if (name && password) {
    console.log("HELLO");
    // Send a POST request to the API endpoint
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ name, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      console.log("OKAY");
      // If successful, redirect the browser to the profile page
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};



document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

