
const userAcceptedDonationRequest = () => {
    const token = localStorage.getItem('token');
    
    fetch(`https://lifelink-five.vercel.app/donate_blood/donation-accepted/`, {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    })
      .then((res) => res.json())
      .then((data) => displayAcceptedRequest(data))
  };


  const displayAcceptedRequest = (data) => {
    if (!data || data.length === 0) {
        const parent = document.getElementById("messages");
        const messageDiv = document.createElement("div");

        parent.innerHTML = 'No Donation Request Accepted ' ;
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