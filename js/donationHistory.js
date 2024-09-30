

const userDonationRequest = () => {
  const token = localStorage.getItem('token');

  fetch(`https://lifelink-five.vercel.app/donate_blood/donation-history/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    }
  })

    .then((res) => res.json())
    .then((data) => displayRequest(data))
    .catch((err) => console.log(err));
};


const displayRequest = (data) => {

  if (!data || data.length === 0) {
    const parent = document.getElementById("message");
    const messageDiv = document.createElement("div");
    messageDiv.innerHTML = `<p class="text-center text-light"> No Donation Request Accepted Yet</p>`;
    parent.appendChild(messageDiv);
  }
  data.forEach(item => {

    const token = localStorage.getItem('token');
    fetch(`https://lifelink-five.vercel.app/donate_blood/donation-requests/${item.donation_request}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        const patient_name = data.patient_name;
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
  const donationRequestId = id;
  console.log(typeof (donationRequestId))
  cancelRequest(donationRequestId);
};

const cancelRequest = (donationRequestId) => {

  const token = localStorage.getItem('token');

  console.log(donationRequestId)
  console.log(token)

  fetch(`https://lifelink-five.vercel.app/donate_blood/cancel-request/${donationRequestId}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`,


    }
  })

    .then((res) => res.json())
    .then((data) => {
      document.getElementById("accept_request").innerHTML = "Request Canceled";
    })
    .catch((err) => console.log(err));
};


const handleCompleteRequest = (id) => {
  const donationRequestId = id;
  console.log(typeof (donationRequestId))
  completeRequest(donationRequestId);
};

const completeRequest = (donationRequestId) => {

  const token = localStorage.getItem('token');

  console.log(donationRequestId)
  console.log(token)

  fetch(`https://lifelink-five.vercel.app/donate_blood/complete-request/${donationRequestId}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`,


    }
  })

    .then((res) => res.json())
    .then((data) => {
      document.getElementById("accept_request").innerHTML = "Request Canceled";
    })
    .catch((err) => console.log(err));
};



userDonationRequest()