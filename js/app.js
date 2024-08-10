



function allDonoationRequest(){
    fetch(`https://lifelink-4bu4.onrender.com/donate_blood/donation-requests/`)
    .then((res) => res.json())
    .then((data)=> displayDonationRequest(data) )
    // .then((data)=> console.log(data) )
    .catch((err)=> console.log(err));
}


function availableDonoationRequest(blood_group){
    const bloodGroup = blood_group ;
    // console.log(bloodGroup);
    const encodedBloodGroup = encodeURIComponent(bloodGroup);
    fetch(`https://lifelink-4bu4.onrender.com/donate_blood/donation-requests/blood_group_filter/?blood_group=${encodedBloodGroup}`)
    .then((res) => res.json())
    .then((data)=> displayDonationRequest(data) )
    // .then((data)=> console.log(data) )
    .catch((err)=> console.log(err));
}

const displayDonationRequest = (donationRequests) => {
    document.getElementById("donation_request_container").innerHTML = "";

    if (!donationRequests || donationRequests.length === 0) {
        // Display message if no donors are available
       

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
                                <h5 class="mb-2">${donationRequest.patient_name}</h5>

                                <p class="mb-0" style="font-size: 15px;font-weight:bold"><span> Requested User Name : ${donationRequest.user} </span></p>
                                <p class="mb-0" style="font-size: 15px;font-weight:bold"><span> Donaton Status : ${donationRequest.status} </span></p>
                                
                            </div>

                            <span class="badge bg-design rounded-pill ms-auto">${donationRequest.blood_group}</span>
                        </div>

                        <p class="mb-0 mt-2" style="font-size: 15px;text-align:justify;min-height:50px;"><span>  ${donationRequest.details.slice(0,80)} </span></p>
                        <button class="btn btn-info text-white mt-2" onclick="doantioRequestDetail(${donationRequest.id})" > View Details </button>
                    </a>
                </div>
        `

        parent.appendChild(div);
        
    });
}


function availableDonor(blood_group){
    const bloodGroup = blood_group ;
    console.log(bloodGroup);
    const encodedBloodGroup = encodeURIComponent(bloodGroup);
    fetch(`https://lifelink-4bu4.onrender.com/donate_blood/users/blood_group_filter/?blood_group=${encodedBloodGroup}`)
    .then((res) => res.json())
    .then((data)=> displayDonor(data) )
    // .then((data)=> console.log(data) )
    .catch((err)=> console.log(err));
}

function allDonor(){
    console.log("ok");
    fetch(`https://lifelink-4bu4.onrender.com/donate_blood/users/`)
    .then((res) => res.json())
    .then((data)=> displayDonor(data) )
    // .then((data)=> console.log(data) )
    .catch((err)=> console.log(err));
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

        // console.log(donor.username)
        const baseUrl = "https://lifelink-4bu4.onrender.com";
        // const imgSrc = donor.image ? `${baseUrl}${donor.image}` : "images/profile.jpg";
        const imgSrc = donor.image ? `${donor.image}` : "images/profile.jpg";
        console.log("image")
        console.log(imgSrc)

       
        const parent = document.getElementById("donor_container");
        const div = document.createElement("div");
        div.classList.add("col-lg-4", "col-md-6", "col-12", "mb-4", "mb-lg-0", "mt-3");
        let availableStatus = donor.is_available_for_donation ? 'Available For Donation' : 'Not Available For Donation' ;
        // console.log(availableStatus)

        div.innerHTML = `
                    <div class="custom-block bg-white shadow-lg">
                      
                            <div style="display: flex; justify-content: center; align-items: center; height: 200px;">
                                <img src="${imgSrc}" id="donor-img" style="height: 200px; width: 200px; border-radius: 50%;" class="custom-block-image img-fluid" alt="">
                            </div>
                            <div class="d-flex mt-4">
                                <div>
                                    <h5 class="mb-2">${donor.first_name} ${donor.last_name}</h5>

                                    <p class="mb-0" style="font-size: 14px;font-weight:bold"><span>  Email : ${donor.email} </span></p>
                                    <p class="mb-0" style="font-size: 15px;font-weight:bold"><span>  Phone : ${donor.mobile_no} </span></p>
                                    <p class="mb-0" style="font-size: 15px;font-weight:bold"><span>  Age : ${donor.age} </span></p>
                                    
                                    
                                     <p class="mb-0" style="font-size: 15px;font-weight:bold"><span>  Last Donation Date  : ${donor.last_donation_date} </span></p>
                                     <p class="mb-0" style="font-size: 15px;font-weight:bold"><span>   ${availableStatus } </span></p>

                                
                                    
                                </div>

                                <span class="badge bg-design rounded-pill ms-auto">${donor.blood_group}</span>
                            </div>

                            <p class="mb-0 mt-2" style="font-size: 15px;text-align:justify;min-height:50px;"><span>  ${donor.address.slice(0,80)} </span></p>
                            
                            
                        
                    </div>
            `

        parent.appendChild(div);
        
    });
}


function doantionHistory(){
    alert()
    fetch(`https://lifelink-4bu4.onrender.com/donate_blood/donation-history/`)
    .then((res) => res.json())
    // .then((data)=> displayDonor(data) )
    .then((data)=> console.log(data) )
    .catch((err)=> console.log(err));
}




// document.getElementsByClassName("blood_group").addEventListener('click', availableDonor);





const handleRegistration = (event) => {
    event.preventDefault();

    // Function to get input values
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
    const address = getValue("address");
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
        address,
        age,
        blood_group
    };

    console.log(info)

    if (password === confirm_password) {
        document.getElementById("error").innerText = "";
        if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)) {
            console.log(info);

            fetch("https://lifelink-4bu4.onrender.com/donate_blood/register/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(info),
            })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    
                    document.getElementById("error").innerText = data.error;
                } else {
                    document.getElementById("error").innerText = "Registration successful. Check your mail for confirmation.";
                }
                document.getElementById("register").innerText = "Register";
                // console.log(data);
                // document.getElementById("error").innerText = data
                // document.getElementById("register").innerText = "Register";
            } );
        } else {
            document.getElementById("error").innerText =
                "Password must contain at least eight characters, including one letter, one number, and one special character.";
        }
    } else {
        document.getElementById("error").innerText = "Password and confirm password do not match";
        
    }
};



const handleLogin = (event) => {
    const getValue = (id) => document.getElementById(id).value.trim();
    event.preventDefault();
    const username = getValue("login-username");
    const password = getValue("login-password");
    console.log(username, password);
    if ((username, password)) {
      fetch("https://lifelink-4bu4.onrender.com/donate_blood/login/", {
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
            document.getElementById("loginalert").innerHTML = "Successfull Logged in ";
            // window.location.href = "https://akbar014.github.io/lifelink_blood_donation_frontend";
            window.location.href = "http://127.0.0.1:5500/";
            
            
          }else{
            document.getElementById("alert").innerHTML = data.error;
          }
        });
    }
  };




const handlelogOut = () => {

    const token = localStorage.getItem("token");
    console.log(token)
  
    fetch("https://lifelink-4bu4.onrender.com/donate_blood/logout/", {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
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


document.addEventListener('DOMContentLoaded', () => {
    
    
});

function getCurrentURL () {
    return window.location.href
}

function navbarOption (){
    
 // Remove the 'active' class from any other active links

 const currentActiveLink = document.querySelector('a.nav-link.active');
 console.log(currentActiveLink);
 if (currentActiveLink) {
     currentActiveLink.classList.remove('active');
     console.log(currentActiveLink);
}


const url = getCurrentURL();


if (url.includes('recipient')) {
    const NavLink = document.querySelector('a.nav-link[href="recipient_requests.html"]');
    if (NavLink) {
        NavLink.classList.add('active');
    }
    
}

if (url.includes('index')) {
    const NavLink = document.querySelector('a.nav-link[href="index.html"]');
    if (NavLink) {
        NavLink.classList.add('active');
    }
    
}

if (url.includes('about')) {
    const NavLink = document.querySelector('a.nav-link[href="about.html"]');
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
    const NavLink = document.querySelector('a.nav-link[href="index.html#section_5"]');
    if (NavLink) {
        NavLink.classList.add('active');
    }
    
}

if (url.includes('login')) {
    const NavLink = document.querySelector('a.nav-link[href="login.html"]');
    if (NavLink) {
        NavLink.classList.add('active');
    }
    
}

if (url.includes('register')) {
    const NavLink = document.querySelector('a.nav-link[href="register.html"]');
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

    console.log(user_id)
    
    fetch(`https://lifelink-4bu4.onrender.com/donate_blood/users/${user_id}`, {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    })
    .then((res) => res.json())
    .then((data) => {
        // console.log(data)
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


function userload (){
    const user_id = localStorage.getItem("user_id");
    console.log(user_id)
    fetch(`https://lifelink-4bu4.onrender.com/donate_blood/donation-requests/users/${user_id}`)
    .then((res) => res.json())
    .then((data)=> displayDonationRequest(data) )
    // .then((data)=> console.log(data) )
    .catch((err)=> console.log(err));
}


function searchDonor(event){
    event.preventDefault();
    const keyword = document.getElementById("keyword").value;
    const encodedBloodGroup = encodeURIComponent(keyword);
  
    // console.log(encodedBloodGroup)
    fetch(`https://lifelink-4bu4.onrender.com/donate_blood/users/blood_group_filter/?blood_group=${encodedBloodGroup}`)
    .then((res) => res.json())
    .then((data)=> displaySearchData(data))
    .catch((err)=> console.log(err));

    
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

        // const baseUrl = "https://lifelink-4bu4.onrender.com";
        const imgSrc = donor.image ? `${donor.image}` : "images/profile.jpg";

        const parent = document.getElementById("search_result");
        const div = document.createElement("div");
        div.classList.add("col-lg-4", "col-md-6", "col-12", "mb-4", "mb-lg-0", "mt-3");
        let availableStatus = donor.is_available_for_donation ? 'Available For Donation' : 'Not Available For Donation' ;
        console.log(availableStatus)

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
                                     <p class="mb-0" style="font-size: 15px;font-weight:bold"><span>   ${availableStatus } </span></p>

                                
                                    
                                </div>

                                <span class="badge bg-design rounded-pill ms-auto">${donor.blood_group}</span>
                            </div>

                            <p class="mb-0 mt-2" style="font-size: 15px;text-align:justify;min-height:50px;"><span>  ${donor.address.slice(0,80)} </span></p>
                            
                            
                        
                    </div>
            `

        parent.appendChild(div);
        
    });
}

// availableDonoationRequest('A+')
// availableDonor('A+')
allDonoationRequest()
allDonor()
