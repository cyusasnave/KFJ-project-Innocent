import { useState } from "react";

const getEmployeeProfile = () => {
    // const [data, setData] = useState<any>()

    const token = sessionStorage.getItem('token');
    if (token){
      const parsedToken = JSON.parse(token);

        fetch("http://127.0.0.1:8000/api/v1/account/get_employee_profile'", {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            'Authorization': `Bearer ${parsedToken.access_token}`
          }
        })
        // .then(response =>  response.json())
        .then(response => {
            return response.json();
        })

        .catch(error => {
            return error
        })
    }
}

export default getEmployeeProfile;