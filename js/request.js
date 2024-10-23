const donationRequestDetails = () => {
    const param = new URLSearchParams(window.location.search).get("donorRequestId");

    fetch(`https://lifelink-five.vercel.app/donate_blood/donation-requests/${param}/`)
        .then((res) => res.json())
        .then((data) => {
            document.getElementById("patient_name").innerHTML = data.patient_name;
            document.getElementById("patient_phone").innerHTML = data.mobile_no;
            document.getElementById("blood_group").innerHTML = data.blood_group;
            document.getElementById("location").innerHTML = data.location;
            document.getElementById("details").innerHTML = data.details;
            

            fetch(`https://lifelink-five.vercel.app/donate_blood/donate_blood_users/${data.accepted_by}`)
            .then((res) => res.json())
            .then((data)=> {
                console.log(data);
                document.getElementById("accepted_by").innerHTML =  data.username + ", Phone : " + data.mobile_no ;
            })
            const request_date = new Date(data.requested_date);
            const formatted_date = request_date.toDateString() + ' ' + request_date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            document.getElementById("date").innerHTML = formatted_date;

            const token_user = localStorage.getItem('user');

            const user_id = localStorage.getItem("user_id");
            fetch(`https://lifelink-five.vercel.app/donate_blood/users/${user_id}`)

                .then((res) => res.json())
                .then((userData) => {

                    const user_blood_group = userData.blood_group;

                    if (data.user == token_user) {
                        document.getElementById("accept_request").innerHTML = "Cannot able to access own request";
                    } else if (data.status == 'Accepted') {
                        document.getElementById("accept_request").innerHTML = "Already accepted";
                    } else if (data.status == 'Completed') {
                        document.getElementById("accept_request").innerHTML = "Donation Completed";
                    } else if (user_blood_group != data.blood_group) {
                        document.getElementById("accept_request").innerHTML = "Your Blood Group Not Matched ";
                    }
                    else {
                        document.getElementById("accept_request").setAttribute("data-id", param);

                        document.getElementById("accept_request").addEventListener('click', handleAcceptRequest);
                    }


                })
                .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));

};

const handleAcceptRequest = (event) => {
    event.preventDefault();
    const donationRequestId = parseInt(event.target.getAttribute('data-id'), 10);
    console.log(typeof (donationRequestId))
    acceptRequest(donationRequestId);
};

const acceptRequest = (donationRequestId) => {

    const token = localStorage.getItem('token');

    console.log(donationRequestId)
    console.log(token)

    fetch(`https://lifelink-five.vercel.app/donate_blood/accept-request/${donationRequestId}/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,


        }
    })
        .then((res) => res.json())
        .then((data) => {
            document.getElementById("accept_request").innerHTML = "Request Accepted";
            window.location.href = "accepted_donation.html"
            localStorage.setItem("accept_success", true);
        })
        .catch((err) => console.log(err));


};

donationRequestDetails();