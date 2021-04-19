console.log("HELLO");
const signupFormHandler = async (event) => {
    event.preventDefault();
    
    console.log(event);
    const name = document.querySelector('#signup-name').value.trim();
    // const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#signup-password').value.trim();
    console.log(name, password);
    if (name && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({ name: name, password:password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/login');
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
