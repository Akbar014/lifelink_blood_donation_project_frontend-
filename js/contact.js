const contactformSubmit = (event) => {
    const getValue = (id) => document.getElementById(id).value.trim();
    event.preventDefault();
    const name = getValue("name");
    const email = getValue("email");
    const subject = getValue("subject");
    const description = getValue("description");

    if ((name, description)) {
      fetch("https://lifelink-five.vercel.app/donate_blood/contactForm/", {
        method: "POST",
        headers: { "content-type": "application/json",  'Authorization': `Token ${localStorage.getItem('token')}` },
        body: JSON.stringify({ name, email, subject, description }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          document.getElementById("success").innerHTML = 'Successfully Sent, Please check your given mail in the contact form '

        });
    }

  };