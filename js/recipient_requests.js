

const userDonationRequest = () => {
    const token = localStorage.getItem('token');
    
    console.log(token)
    fetch(`https://akbar014.github.io/lifelink_blood_donation_frontend/donate_blood/donation-requests/my_requests/`, {
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
    //   console.log(data);
      data.forEach(item => {
        console.log(item)
        const parent = document.getElementById("table-body");
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${item.patient_name}</td>
            <td>${item.blood_group}</td>
            <td>${item.location }</td>
            <td>${item.status}</td>
            <td>${item.requested_date}</td>
            <td>
                
                <a href="topics-detail.html?donorRequestId=${item.id}" class="text-info" onclick="doantioRequestDetail(${item.id})">View</a>
                
                <a href="" class="text-danger">Delete</a>
            </td>
            
       
           
            `;
        parent.appendChild(tr);
        
      });
    
  };



  userDonationRequest()