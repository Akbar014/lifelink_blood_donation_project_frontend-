

const userDonationRequest = () => {
    const token = localStorage.getItem('token');
    
    console.log(token)
    fetch(`https://lifelink-4bu4.onrender.com/donate_blood/donation-requests/my_requests/`, {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    })

    // fetch(`https://akbar014.github.io/lifelink_blood_donation_frontend/donate_blood/donation-history/`)

      .then((res) => res.json())
      .then((data) => displayRequest(data))
      .catch((err) => console.log(err));
  };


  const displayRequest = (data) => {
    if (!data || data.length === 0) {
        const parent = document.getElementById("message");
        const messageDiv = document.createElement("div");
        // messageDiv.classList.add("col-md-12", "text-center", "my-4", "text-white");
        messageDiv.innerHTML = `<p class="text-center text-light"> No Donation Request Created Yet</p>`;
        parent.appendChild(messageDiv);
    }
      data.forEach(item => {
        const request_date = new Date(item.requested_date);
        const formatted_date = request_date.toDateString() + ' ' + request_date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', second: '2-digit'});
        // document.getElementById("date").innerHTML = formatted_date;
        
        const parent = document.getElementById("table-body");
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${item.patient_name}</td>
            <td>${item.blood_group}</td>
            <td>${item.location }</td>
            <td>${item.status}</td>
            <td>${formatted_date}</td>
            <td>
                
                <a href="topics-detail.html?donorRequestId=${item.id}" class="text-info" onclick="doantioRequestDetail(${item.id})">View</a>
                <br>
               
                
            </td>
            
       
           
            `;
        parent.appendChild(tr);
        
      });
    
  };



  const handleCancelRequest = (id) => {
    // event.preventDefault();
    // const donationRequestId = parseInt(event.target.getAttribute('data-id'), 10);
    const donationRequestId = id;
    console.log(typeof(donationRequestId))
    cancelRequest(donationRequestId);
};

const cancelRequest = (donationRequestId) => {

    const token = localStorage.getItem('token');
    
    console.log(donationRequestId)
    console.log(token)

    fetch(`https://lifelink-4bu4.onrender.com/donate_blood/cancel-request/${donationRequestId}/`, {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
           
            
        }
    })

    // fetch(`https://lifelink-4bu4.onrender.com/donate_blood/accept-request/${donationRequestId}/`)

      .then((res) => res.json())
      .then((data) => {
        document.getElementById("accept_request").innerHTML = "Request Canceled";
        document.getElementById("message").innerHTML = "Check Your Donation History";
      })
      .catch((err) => console.log(err));
  };


  userDonationRequest()