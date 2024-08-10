console.log("dgsdfg")
const userAcceptedDonationRequest = () => {
    const token = localStorage.getItem('token');
    
    // console.log(token)
    fetch(`http://127.0.0.1:8000/donate_blood/donation-accepted/`, {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    })

    // fetch(`https://akbar014.github.io/lifelink_blood_donation_frontend/donate_blood/donation-history/`)

      .then((res) => res.json())
      .then((data) => displayAcceptedRequest(data))
    //   .then((data) => console.log(data))
    //   .catch((err) => console.log(err));
  };


  const displayAcceptedRequest = (data) => {
    if (!data || data.length === 0) {
        const parent = document.getElementById("messages");
        const messageDiv = document.createElement("div");
        // messageDiv.classList.add("col-md-12", "text-center", "my-4", "text-white");
        messageDiv.innerHTML = `<p class="text-center text-light"> No Donation Request Accepted </p>`;
        parent.appendChild(messageDiv);
    }
      data.forEach(item => {
        console.log(item.donation_request)

        const token = localStorage.getItem('token');
        fetch(`http://127.0.0.1:8000/donate_blood/donation-requests/${item.donation_request}`, {
          method: 'GET', 
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`
          }
      })
      .then((res) => res.json())
      .then((data) => {
      
        const patient_name = data.patient_name
        
        const parent = document.getElementById("table-bodys");
        const tr = document.createElement("tr");
        
        tr.innerHTML = `
            <td>${patient_name}</td>
            <td>${data.user}</td>
            <td>${item.date}</td>
            
            
            ${
              data.status == "Accepted"
                ? `<td class="text-danger"><a href="topics-detail.html?donorRequestId=${item.donation_request}" class="text-info" onclick="doantioRequestDetail(${item.id})">View</a> <br> <a href="" class="text-danger" onclick="handleCancelRequest(${item.donation_request})" >Cancel Request</a> <br> <a href="" class="text-light" onclick="handleCompleteRequest(${item.donation_request})" > Donation Complete</a> </td>`
                : data.status == "Completed"
                ? `<td class="text-light">Donation Done </td>`
                : `<td ">Request Canceled</td>`
            }
       
           
            `;
        parent.appendChild(tr);
      
        
        
        

      })
      .catch((err) => console.log(err));



        
        
      });
    
  };

  userAcceptedDonationRequest()