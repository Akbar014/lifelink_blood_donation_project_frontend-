const userProfile = () => {
    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem('token'); 
    
    fetch(`https://lifelink-4bu4.onrender.com/donate_blood/users/${user_id}`, {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    })
    .then((res) => res.json())
    .then((data) => {

        console.log(data)
        const profileImage = document.getElementById('profile-image');

        if (profileImage && data.image) {
            profileImage.src = data.image; 
        }

        const user_name = localStorage.getItem("user");
        document.getElementById('userName').innerHTML = user_name;
        // document.getElementById('first_name').value = data.first_name;
        // document.getElementById('last_name').value = data.last_name;
        document.getElementById('email').innerHTML = data.email;
        document.getElementById('mobile_no').value = data.mobile_no;
        document.getElementById('age').value = data.age;
        document.getElementById('blood_group').value = data.blood_group;
        document.getElementById('gender').value = data.gender;
        document.getElementById('address').value = data.address;
        if (data.last_donation_date) {
            document.getElementById('last_donation_date').value = new Date(data.last_donation_date).toISOString().substring(0, 10);
        }
        document.getElementById('is_available_for_donation').checked = data.is_available_for_donation;
        
        // If you want to show the profile image
        if(data.image){
            const profileImg = document.getElementById('profile-img');
            profileImg.src = data.image;
            profileImg.parentElement.href = data.image;
        }
         
    })
    .catch((error) => console.error('Error:', error)); 
};

// Call the function to fetch and display profile details
userProfile();


const editProfileInfo = () => {
    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem('token');
    console.log(user_id)
    // Gather form data
    const username = document.getElementById('username').value;
    const first_name = document.getElementById('first_name').value;
    const last_name = document.getElementById('last_name').value;
    const email = document.getElementById('email').value;
    const mobile_no = document.getElementById('mobile_no').value;
    const age = document.getElementById('age').value;
    const blood_group = document.getElementById('blood_group').value;
    const gender = document.getElementById('gender').value;
    const address = document.getElementById('address').value;
    const is_available_for_donation = document.getElementById('is_available_for_donation').checked;
    console.log(is_available_for_donation)

    const profileInfo = {
        mobile_no,
        age,
        blood_group,
        gender,
        address,
        is_available_for_donation,
    };

    console.log(profileInfo);

    fetch(`https://lifelink-4bu4.onrender.com/donate_blood/donate_blood/users/${user_id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(profileInfo),
    })
    .then((res) => res.json())
    .then((data) => {
        console.log('Profile updated:', data);
        // Optionally, redirect to another page or show a success message
    })
    .catch((error) => console.error('Error:', error));
};