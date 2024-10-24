



function allDonoationRequest() {
    fetch(`https://lifelink-five.vercel.app/donate_blood/donation-requests/`)
        .then((res) => res.json())
        .then((data) => displayDonationRequest(data))
        .catch((err) => console.log(err));
}


function availableDonoationRequest(blood_group) {
    const bloodGroup = blood_group;
    const encodedBloodGroup = encodeURIComponent(bloodGroup);
    fetch(`https://lifelink-five.vercel.app/donate_blood/donation-requests/blood_group_filter/?blood_group=${encodedBloodGroup}`)
        .then((res) => res.json())
        .then((data) => displayDonationRequest(data))
        .catch((err) => console.log(err));
}

const displayDonationRequest = (donationRequests) => {
    document.getElementById("donation_request_container").innerHTML = "";

    if (!donationRequests || donationRequests.length === 0) {
        const parent = document.getElementById("donation_request_container");
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("col-12", "text-center", "my-4");
        messageDiv.innerHTML = `<p> No donation requests available for the selected blood group.</p>`;
        parent.appendChild(messageDiv);
    }

    donationRequests.forEach(donationRequest => {
        console.log(donationRequest.id)

        const parent = document.getElementById("donation_request_container");
        const div = document.createElement("div");
        div.classList.add("col-lg-4", "col-md-6", "col-12", "mb-4", "mb-lg-0", "mt-3");

        div.innerHTML = `
                <div class="custom-block bg-white shadow-lg">
                    <a href="topics-detail.html?donorRequestId=${donationRequest.id}" onclick="doantioRequestDetail(${donationRequest.id})" >
                        <img src="images/common_image3.png" class="custom-block-image img-fluid" alt="">
                        <div class="d-flex">
                            <div>
                                <h6 class="mb-2 mt-2">${donationRequest.patient_name}</h6>

                                <p class="mb-0" style="font-size: 15px;font-weight:bold"><span> Requested User Name : ${donationRequest.user} </span></p>
                                <p class="mb-0" style="font-size: 15px;font-weight:bold"><span> Donaton Status : ${donationRequest.status} </span></p>
                                
                            </div>

                            <span class="badge bg-design rounded-pill ms-auto mt-2">${donationRequest.blood_group}</span>
                        </div>

                        <p class="mb-0 mt-2" style="font-size: 15px;text-align:justify;min-height:50px;"><span>  ${donationRequest.details.slice(0, 80)} </span></p>
                        <button class="btn btn-info text-white mt-2" onclick="doantioRequestDetail(${donationRequest.id})" > View Details </button>
                    </a>
                </div>
        `

        parent.appendChild(div);

    });
}


function availableDonor(blood_group) {
    const bloodGroup = blood_group;
    console.log(bloodGroup);
    const encodedBloodGroup = encodeURIComponent(bloodGroup);
    fetch(`https://lifelink-five.vercel.app/donate_blood/users/blood_group_filter/?blood_group=${encodedBloodGroup}`)
        .then((res) => res.json())
        .then((data) => displayDonor(data))
        .catch((err) => console.log(err));
}

function allDonor() {
    fetch(`https://lifelink-five.vercel.app/donate_blood/users/`)
        .then((res) => res.json())
        .then((data) => displayDonor(data))
        .catch((err) => console.log(err));
}


const displayDonor = (donors) => {

    document.getElementById("donor_container").innerHTML = "";

    if (!donors || donors.length === 0) {

        const parent = document.getElementById("donor_container");
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("col-12", "text-center", "my-4");
        messageDiv.innerHTML = `<p> No donors available for the selected blood group.</p>`;
        parent.appendChild(messageDiv);
    }

    donors.forEach(donor => {
        const baseUrl = "https://lifelink-five.vercel.app";

        const imgSrc = donor.image ? `${donor.image}` : "images/profile.jpg";
        const parent = document.getElementById("donor_container");
        const div = document.createElement("div");
        div.classList.add("col-lg-4", "col-md-6", "col-12", "mb-4", "mb-lg-0", "mt-3");
        let availableStatus = donor.is_available_for_donation ? 'Available For Donation' : 'Not Available For Donation';


        div.innerHTML = `
                    <div class="custom-block bg-white shadow-lg">
                      
                            <div style="display: flex; justify-content: center; align-items: center; height: 200px;">
                                <img src="${imgSrc}" id="donor-img" style="height: 200px; width: 200px; border-radius: 50%;" class="custom-block-image img-fluid" alt="">
                            </div>
                            <div class="d-flex mt-4">
                                <div>
                                    <h6 class="mb-2 mt-2">${donor.first_name} ${donor.last_name}</h6>

                                    <p class="mb-0" style="font-size: 14px;font-weight:bold"><span>  Email : ${donor.email} </span></p>
                                    <p class="mb-0" style="font-size: 15px;font-weight:bold"><span>  Phone : ${donor.mobile_no} </span></p>
                                    <p class="mb-0" style="font-size: 15px;font-weight:bold"><span>  Age : ${donor.age} </span></p>
                                    
                                    
                                     <p class="mb-0" style="font-size: 15px;font-weight:bold"><span>  Last Donation Date  : ${donor.last_donation_date ? donor.last_donation_date : 'Not donated yet'} </span></p>
                                     <p class="mb-0" style="font-size: 15px;font-weight:bold"><span>   ${availableStatus} </span></p>
                                    
                                </div>

                                <span class="badge bg-design rounded-pill ms-auto mt-2">${donor.blood_group}</span>
                            </div>

                    </div>
            `

        parent.appendChild(div);

    });
}


function doantionHistory() {
    alert()
    fetch(`https://lifelink-five.vercel.app/donate_blood/donation-history/`)
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
}


const handleRegistration = (event) => {
    event.preventDefault();
    document.getElementById("register").innerText = "Loading";
    const getValue = (id) => document.getElementById(id).value.trim();

    const username = getValue("username");
    const first_name = getValue("first_name");
    const last_name = getValue("last_name");
    const email = getValue("email");
    const password = getValue("password");
    const confirm_password = getValue("password1");
    const mobile_no = getValue("mobile_no");
    const gender = getValue("gender");
    // const address = getValue("address");
    const age = getValue("age");
    const blood_group = getValue("blood_group");

    const info = {
        username,
        first_name,
        last_name,
        email,
        password,
        confirm_password,
        mobile_no,
        gender,
        // address,
        age,
        blood_group
    };


    if (password === confirm_password) {
        document.getElementById("error").innerText = "";
        if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)) {
            console.log(info);

            fetch("https://lifelink-five.vercel.app/donate_blood/register/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(info),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.error) {
                        toastr.error(data.error, 'Error');
                    } else if(data.username) {
                        toastr.error(data.username, 'Error');
                    }else {
                        toastr.success('Registration successful. Check your mail for confirmation', 'Success');
                    }

                    document.getElementById("register").innerText = "Register";

                });
        } else {
                toastr.error('Password must contain at least eight characters, including one letter, one number, and one special character.', 'Error');
                document.getElementById("register").innerText = "Register";
        }
    } else {
        toastr.error('Password and confirm password do not match', 'Error');

    }

};



const handleLogin = (event) => {
    const getValue = (id) => document.getElementById(id).value.trim();
    event.preventDefault();
    const username = getValue("login-username");
    const password = getValue("login-password");
    document.getElementById("login-btn").innerText = "Loading";
    if ((username, password)) {
        // fetch("https://lifelink-five.vercel.app/donate_blood/login/", {
        fetch("https://lifelink-five.vercel.app/donate_blood/login/", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ username, password }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);

                if (data.token && data.user) {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("user", data.user);
                    localStorage.setItem("user_id", data.user_id);
                    localStorage.setItem("login_success", true);
                    document.getElementById("login-btn").innerText = "Loading";
                    window.location.href = "https://fabulous-trifle-8657b5.netlify.app/";
                    // window.location.href = "http://127.0.0.1:5500/index.html";
                    toastr.success('Logged in successfully!', 'Success');
                    // document.getElementById("login-btn").innerText = "Login";
 

                } else {
                    document.getElementById("login-btn").innerText = "Loading";
                    window.location.href = "https://fabulous-trifle-8657b5.netlify.app/";
                    // document.getElementById("alert").innerHTML = data.error;
                    toastr.error(data.error, 'Error');
                    
                }

                document.getElementById("login-btn").innerText = "Login";
            });
    }
};




const handlelogOut = () => {

    const token = localStorage.getItem("token");

    fetch("https://lifelink-five.vercel.app/donate_blood/logout/", {
        method: "POST",
        headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("user_id");

            window.location.href = "index.html";

        });
};


document.addEventListener('DOMContentLoaded', (event) => {
    const username = localStorage.getItem("user");
    if (username) {
        const profileNameElement = document.getElementById("profilename");
        if (profileNameElement) {
            profileNameElement.innerText = username;
        }
    }
});

function loadHeader() {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbarNav').innerHTML = data;
            navbarOption();
            userload();
        });
}

function loadFooter() {
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        });
}


document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
});

document.addEventListener('DOMContentLoaded', () => {
    loadFooter();
});


// window.addEventListener("beforeunload", function () {
//     // Clear localStorage when the page is about to be unloaded
//     localStorage.clear();
// });

function getCurrentURL() {
    return window.location.href
}

function navbarOption() {

    // Remove the 'active' class from any other active links

    const currentActiveLink = document.querySelector('a.nav-link.active');
    if (currentActiveLink) {
        currentActiveLink.classList.remove('active');
    }


    const url = getCurrentURL();
    const pathName = url.split('/').pop().split('.')[0]; // Get the last part of the URL path without extension
    const currentHash = location.hash;



    if (url.includes('/')) {
        const NavLink = document.querySelector(`a.nav-link[href*="${pathName}"]`);
        if (NavLink) {
            NavLink.classList.add('active');
        }

    }

    if (pathName.includes('recipient')) {
        const NavLink = document.querySelector(`a.nav-link[href*="${pathName}"]`);
        if (NavLink) {
            NavLink.classList.add('active');
        }
    }

    if (url.includes('about')) {
        const NavLink = document.querySelector(`a.nav-link[href*="${pathName}"]`);
        if (NavLink) {
            NavLink.classList.add('active');
        }

    }

    if (url.includes('section_4')) {
        const NavLink = document.querySelector('a.nav-link[href="index.html#section_4"]');
        if (NavLink) {
            NavLink.classList.add('active');
        }

    }

    if (url.includes('section_5')) {
        const NavLink = document.querySelector(`a.nav-link[href="${pathName}.html${currentHash}"], a.nav-link[href="${pathName}${currentHash}"]`);
        if (NavLink) {
            NavLink.classList.add('active');
        }

    }

    if (url.includes('login')) {
        const NavLink = document.querySelector(`a.nav-link[href*="${pathName}"]`);
        if (NavLink) {
            NavLink.classList.add('active');
        }

    }

    if (url.includes('register')) {
        const NavLink = document.querySelector(`a.nav-link[href*="${pathName}"]`);
        if (NavLink) {
            NavLink.classList.add('active');
        }

    }

    const loginLink = document.getElementById('login-link');
    const dashboardLink = document.getElementById('dashboard-link');
    const registerLink = document.getElementById('register-link');
    const logoutLink = document.getElementById('logout-link');
    const accept_btn = document.getElementById('accept_request');
    const accept_alert = document.getElementById('accept_alert');
    const profileLink = document.getElementById('profile-link');


    const token = localStorage.getItem('token');

    const user_id = localStorage.getItem("user_id");

    fetch(`https://lifelink-five.vercel.app/donate_blood/users/${user_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    })
        .then((res) => res.json())
        .then((data) => {
            const profileImg = document.getElementById('profile-img');

            if (profileImg && data.image) {
                profileImg.src = data.image;
            }


        })
        .catch((err) => console.log(err));

    if (token) {
        // User is logged in
        loginLink.style.display = 'none';
        registerLink.style.display = 'none';
        dashboardLink.style.display = 'block';
        profileLink.style.display = 'block';
        logoutLink.style.display = 'block';
        accept_btn.style.display = 'block';
        accept_alert.style.display = 'none';


    } else {
        // User is not logged in
        loginLink.style.display = 'block';
        registerLink.style.display = 'block';
        profileLink.style.display = 'none';
        dashboardLink.style.display = 'none';
        logoutLink.style.display = 'none';
        accept_btn.style.display = 'none';
        accept_alert.style.display = 'block';

    }


}


function userload() {
    const user_id = localStorage.getItem("user_id");
    fetch(`https://lifelink-five.vercel.app/donate_blood/donation-requests/users/${user_id}`)
        .then((res) => res.json())
        .then((data) => displayDonationRequest(data))
        .catch((err) => console.log(err));
}


function searchDonor(event) {
    event.preventDefault();
    const keyword = document.getElementById("keyword").value;
    const encodedBloodGroup = encodeURIComponent(keyword);
    fetch(`https://lifelink-five.vercel.app/donate_blood/users/blood_group_filter/?blood_group=${encodedBloodGroup}`)
        .then((res) => res.json())
        .then((data) => displaySearchData(data))
        .catch((err) => console.log(err));


}

const displaySearchData = (donors) => {
    document.getElementById("search_result").innerHTML = "";

    if (!donors || donors.length === 0) {
        const parent = document.getElementById("search_result");
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("col-12", "text-center", "my-4");
        messageDiv.innerHTML = `<p class="text-white"> No donors available for the selected blood group.</p>`;
        parent.appendChild(messageDiv);
    }

    donors.forEach(donor => {
        const imgSrc = donor.image ? `${donor.image}` : "images/profile.jpg";

        const parent = document.getElementById("search_result");
        const div = document.createElement("div");
        div.classList.add("col-lg-4", "col-md-6", "col-12", "mb-4", "mb-lg-0", "mt-3");
        let availableStatus = donor.is_available_for_donation ? 'Available For Donation' : 'Not Available For Donation';
        let address = donor.address ? donor.address.slice(0, 80) : 'No address found '
        div.innerHTML = `
                    <div class="custom-block bg-white shadow-lg">
                      
                            <div style="display: flex; justify-content: center; align-items: center; height: 200px;">
                                <img src="${imgSrc}" id="donor-img" style="height: 200px; width: 200px; border-radius: 50%;" class="custom-block-image img-fluid" alt="">
                            </div>
                            <div class="d-flex mt-3">
                                <div>
                                    <h5 class="mb-2">${donor.username}</h5>

                                    <p class="mb-0" style="font-size: 14px;font-weight:bold"><span>  Email : ${donor.email} </span></p>
                                    <p class="mb-0" style="font-size: 15px;font-weight:bold"><span>  Phone : ${donor.mobile_no} </span></p>
                                    <p class="mb-0" style="font-size: 15px;font-weight:bold"><span>  Age : ${donor.age} </span></p>
                                    
                                    
                                     <p class="mb-0" style="font-size: 15px;font-weight:bold"><span>  Last Donation Date  : ${donor.last_donation_date} </span></p>
                                     <p class="mb-0" style="font-size: 15px;font-weight:bold"><span>   ${availableStatus} </span></p>

                                
                                    
                                </div>

                                <span class="badge bg-design rounded-pill ms-auto">${donor.blood_group}</span>
                            </div>

                            <p class="mb-0 mt-2" style="font-size: 15px;text-align:justify;min-height:50px;"><span>  ${address} </span></p>
                            
                            
                        
                    </div>
            `

        parent.appendChild(div);

    });
}

// availableDonoationRequest('A+')
// availableDonor('A+')
allDonoationRequest()
allDonor()
