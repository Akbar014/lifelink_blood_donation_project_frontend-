
const userAcceptedDonationRequest = () => {
  const token = localStorage.getItem('token');

  // fetch(`https://lifelink-five.vercel.app/donate_blood/donation-accepted/`, {
  fetch(`https://lifelink-five.vercel.app/donate_blood/donation-requests/request_accepted_by_me/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    }
  })
    .then((res) => res.json())
    .then((data) => {
      displayAcceptedRequest(data)
      console.log(data)
    })
};


const displayAcceptedRequest = (data) => {
  
  if (!data || data.length === 0) {
    const parent = document.getElementById("messages");
    const messageDiv = document.createElement("div");
    parent.innerHTML = 'No Donation Request Accepted ';
  }
  data.forEach(data => {
    const request_date = new Date(data.requested_date);
    const formatted_date = request_date.toDateString() + ' ' + request_date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });


    const patient_name = data.patient_name

        const parent = document.getElementById("table-bodys");
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${patient_name}</td>
            <td>${data.user}</td>
            <td>${formatted_date}</td>
            
            
            ${data.status == "Accepted"
            ? `<td class="text-danger"><a href="topics-detail.html?donorRequestId=${data.id}" class="text-info" onclick="doantioRequestDetail(${data.id})">View</a> <br> <a href="" class="text-danger" onclick="handleCancelRequest(${data.id})" >Cancel Request</a> <br> <a href="" class="text-primary" onclick="handleCompleteRequest(${data.id})" > Donation Complete</a> </td>`
            : data.status == "Completed"
              ? `<td class="text-light">Donation Done </td>`
              : `<td ">Request Canceled</td>`
          }
       
           
            `;
        parent.appendChild(tr);

    // const token = localStorage.getItem('token');
    // fetch(`https://lifelink-five.vercel.app/donate_blood/donation-requests/${item.donation_request}`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Token ${token}`
    //   }
    // })
    //   .then((res) => res.json())
    //   .then((data) => {

    //     const patient_name = data.patient_name

    //     const parent = document.getElementById("table-bodys");
    //     const tr = document.createElement("tr");

    //     tr.innerHTML = `
    //         <td>${patient_name}</td>
    //         <td>${data.user}</td>
    //         <td>${item.date}</td>
            
            
    //         ${data.status == "Accepted"
    //         ? `<td class="text-danger"><a href="topics-detail.html?donorRequestId=${item.donation_request}" class="text-info" onclick="doantioRequestDetail(${item.id})">View</a> <br> <a href="" class="text-danger" onclick="handleCancelRequest(${item.donation_request})" >Cancel Request</a> <br> <a href="" class="text-primary" onclick="handleCompleteRequest(${item.donation_request})" > Donation Complete</a> </td>`
    //         : data.status == "Completed"
    //           ? `<td class="text-light">Donation Done </td>`
    //           : `<td ">Request Canceled</td>`
    //       }
       
           
    //         `;
    //     parent.appendChild(tr);

    //   })
    //   .catch((err) => console.log(err));

  });

};

userAcceptedDonationRequest()