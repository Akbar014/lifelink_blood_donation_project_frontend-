const userProfile = () => {
    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem('token');

    // fetch(`https://lifelink-five.vercel.app/donate_blood/users/${user_id}`, {
    fetch(`https://lifelink-five.vercel.app/donate_blood/users/${user_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    })
        .then((res) => res.json())
        .then((data) => {
            // console.log(data);
            const profileImage = document.getElementById('profile-image');

            if (profileImage && data.image) {
                profileImage.src = data.image;
            }

            const user_name = localStorage.getItem("user");
            document.getElementById('userName').innerHTML = data.first_name + ' ' + data.last_name;
            document.getElementById('first_name').value = data.first_name;
            document.getElementById('last_name').value = data.last_name;
            document.getElementById('username').value = data.username;
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

            if (data.image) {
                const profileImg = document.getElementById('profile-img');
                profileImg.src = data.image;
                profileImg.parentElement.href = data.image;
            }

        })
        .catch((error) => console.error('Error:', error));
};

userProfile();


const editProfileInfo = (event) => {
    event.preventDefault();
    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem('token');
    console.log("user edit")
    console.log(user_id)
    const username = document.getElementById('username').value;
    const first_name = document.getElementById('first_name').value;
    const last_name = document.getElementById('last_name').value;
    const email = document.getElementById('email').textContent;
    const mobile_no = document.getElementById('mobile_no').value;
    const age = document.getElementById('age').value;
    const blood_group = document.getElementById('blood_group').value;
    const gender = document.getElementById('gender').value;
    const address = document.getElementById('address').value;
    const is_available_for_donation = document.getElementById('is_available_for_donation').checked;
    const image = document.getElementById('image').files[0]; 


    // const profileInfo = {

    //     username,
    //     first_name,
    //     last_name,
    //     email,

    //     mobile_no,
    //     age,
    //     blood_group,
    //     gender,
    //     address,
    //     is_available_for_donation,
    // };

    // Create a FormData object
    const formData = new FormData();
    formData.append('username', username);
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append('email', email);
    formData.append('mobile_no', mobile_no);
    formData.append('age', age);
    formData.append('blood_group', blood_group);
    formData.append('gender', gender);
    formData.append('address', address);
    formData.append('is_available_for_donation', is_available_for_donation);
    if (image) {
        formData.append('image', image); 
    }


    fetch(`https://lifelink-five.vercel.app/donate_blood/users/${user_id}/`, {
        method: 'PUT',
        headers: {
            // 'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        // body: JSON.stringify(formData),
        body: formData,
    })
        .then((res) => res.json())
        .then((data) => {
            console.log('Profile updated:', data);
            window.location.href = "profile.html"
        })
        .catch((error) => console.log("error"));
};