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

    axios.post("https://crudcrud.com/api/866b17e0bce44897accc1e3a3dfe31dc/bookappointment", userDetails)
    .then((respone) => {
        console.log(respone)
        Show(respone.data)
    })
    .catch((err) => {
        console.log(err); 
    })

    axios.get("https://crudcrud.com/api/866b17e0bce44897accc1e3a3dfe31dc/bookappointment")
    .then((response) => {
        console.log(response)
        
        for(var i=0;i<response.data.length;i++)
        {
            Show(response.data[i])
        }
    })
    .catch((err) => {
        console.log(err)
    })


    // localStorage.setItem("userDetails", userDetailsJSON);
    //Show(userDetails)

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
        // const storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
        // if (storedUserDetails && storedUserDetails.name === userDetails.name && storedUserDetails.email === userDetails.email) {
            //localStorage.removeItem('userDetails');
        axios.delete(`https://crudcrud.com/api/866b17e0bce44897accc1e3a3dfe31dc/bookappointment/${userDetails._id}`)
        .then((response) => {
            console.log(response)
        })
        .catch((err) => {
            console.log(err)
        })
    });

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', function() {
        const newName = prompt("Enter new name:", userDetails.name);
        const newEmail = prompt("Enter new email:", userDetails.email);
        axios.put(`https://crudcrud.com/api/866b17e0bce44897accc1e3a3dfe31dc/bookappointment/${userDetails._id}`)
        .then((response) => {
            console.log(response)
            Show(response.data)
        })
        .catch((err) => {
            console.log(err)
        })
            // if (newName && newEmail) {
            //     userDetails.name = newName;
            //     userDetails.email = newEmail;
            //     localStorage.setItem('userDetails', JSON.stringify(storedUserDetails));
            //     listItem.textContent = userDetails.name + ' - ' + userDetails.email;
            // }
    });
    
    child.appendChild(editButton);
    child.appendChild(deleteButton);
    parentChild.appendChild(child);

}