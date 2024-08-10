

const userDonationRequest = () => {
    const token = localStorage.getItem('token');
    
    console.log(token)
    fetch(`https://lifelink-4bu4.onrender.com/donate_blood/donation-history/`, {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    })

    // fetch(`https://lifelink-4bu4.onrender.com/donate_blood/donation-history/`)

      .then((res) => res.json())
      .then((data) => displayRequest(data))
      .catch((err) => console.log(err));
  };


  const displayRequest = (data) => {
    //   console.log(data);
    if (!data || data.length === 0) {
      const parent = document.getElementById("message");
      const messageDiv = document.createElement("div");
      // messageDiv.classList.add("col-md-12", "text-center", "my-4", "text-white");
      messageDiv.innerHTML = `<p class="text-center text-light"> No Donation Request Accepted Yet</p>`;
      parent.appendChild(messageDiv);
    }
      data.forEach(item => {

        const token = localStorage.getItem('token');
        fetch(`https://lifelink-4bu4.onrender.com/donate_blood/donation-requests/${item.donation_request}`, {
          method: 'GET', 
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`
          }
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        const patient_name = data.patient_name

        const parent = document.getElementById("table-body");
        const tr = document.createElement("tr");
        
        tr.innerHTML = `
            <td>${patient_name}</td>
            <td>${data.user}</td>
            <td>${item.status}</td>
            <td>${item.date}</td>
            
            `;
        parent.appendChild(tr);
        

      })
      .catch((err) => console.log(err));


        
        
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
      })
      .catch((err) => console.log(err));
  };


  const handleCompleteRequest= (id) => {
    // event.preventDefault();
    // const donationRequestId = parseInt(event.target.getAttribute('data-id'), 10);
    const donationRequestId = id;
    console.log(typeof(donationRequestId))
    completeRequest(donationRequestId);
};

const completeRequest = (donationRequestId) => {

    const token = localStorage.getItem('token');
    
    console.log(donationRequestId)
    console.log(token)

    fetch(`https://lifelink-4bu4.onrender.com/donate_blood/complete-request/${donationRequestId}/`, {
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
      })
      .catch((err) => console.log(err));
  };



  userDonationRequest()