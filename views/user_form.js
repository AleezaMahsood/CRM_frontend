const form = document.getElementById('Add_Users');

form.addEventListener('submit', (event) => {
event.preventDefault();

const formData = new FormData(form);

const firstName = formData.get('first-name');
const lastName = formData.get('last-name');
const fullName = `${firstName} ${lastName}`;

const email = formData.get('email');
const password = formData.get('password');
const confirmPassword = formData.get('confirm-password');

const phone = formData.get('phone');
const gender = formData.get('gender');
const location = formData.get('location');
const department = formData.get('department');
const designation = formData.get('designation');
const team = formData.get('team');
const role = formData.get('role');

if (password !== confirmPassword) {
alert('Passwords do not match.');
return;
}

const userData = {
fullName,
email,
password,
phone,
gender,
location,
department,
designation,
team,
role
};

console.log(userData);

// Send the user data to the server
// For example, using the fetch API:
// fetch('/api/users', {
// method: 'POST',
// headers: {
// 'Content-Type': 'application/json'
// },
// body: JSON.stringify(userData)
// })
// .then(response => response.json())
// .then(data => console.log(data))
// .catch(error => console.error(error));
});