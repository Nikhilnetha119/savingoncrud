const submitButton = document.getElementById("submitButton");
const userForm = document.getElementById("userForm");

submitButton.addEventListener('click', function() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    const userDetails = {
        name: name,
        email: email
    };

    const userDetailsJSON = JSON.stringify(userDetails);

    axios.post("https://crudcrud.com/api/878b0a7831714308ab5bc58d0b95cd8a/bookappointment", userDetails)
    .then((respone) => {
        console.log(respone);
    })
    .catch((err) => {
        console.log(err); 
    })

    // localStorage.setItem("userDetails", userDetailsJSON);
    Show(userDetails)

    alert("User details have been stored in local storage.");
});

function Show(userDetails){
    const parentChild  = document.getElementById('userList');
    const child = document.createElement('li');
    child.textContent = userDetails.name + ' - ' + userDetails.email;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
        parentChild.removeChild(child); // Remove from UI
        const storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
        if (storedUserDetails && storedUserDetails.name === userDetails.name && storedUserDetails.email === userDetails.email) {
            localStorage.removeItem('userDetails');
        }
    });

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', function() {
        const newName = prompt("Enter new name:", userDetails.name);
        const newEmail = prompt("Enter new email:", userDetails.email);
            if (newName && newEmail) {
                userDetails.name = newName;
                userDetails.email = newEmail;
                localStorage.setItem('userDetails', JSON.stringify(storedUserDetails));
                listItem.textContent = userDetails.name + ' - ' + userDetails.email;
            }
    });
    
    child.appendChild(editButton);
    child.appendChild(deleteButton);
    parentChild.appendChild(child);

}