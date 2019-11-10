(function(){

    let token,
        getJWTButton = document.querySelector(".getJWT")
        readJWTButton = document.querySelector(".readJWT"),
        jwtDiv = document.querySelector(".jwtDiv"),
        jwtDataDiv = document.querySelector(".jwtDataDiv");

    getJWTButton.addEventListener('click', e => {
        fetch('/api/auth/get-token', {
            method: "POST",
            headers: {
            'content-type': 'application/json'            },
            body: JSON.stringify({
                val1: 1, 
                val2: 2
            })
        })
        .then(token => {
            return token.json() 
        })
        .then(tokenJSON => {
            jwtDiv.innerHTML = token = tokenJSON;
        })
        .catch( error => {
            console.error(error)
        })
    })

    readJWTButton.addEventListener('click', e => {
        fetch('/api/auth/read-token', {
            headers: {
              'authorization': `bearer ${token}`,
            },
          })
        .then(data => {
            return data.json() 
        })
        .then(dataJSON => {
            let str = "";
            if (dataJSON.jwt === "none") {
                str = "There is no JWT.";
            } else { 
                for (let key in dataJSON.tokenData) {
                    str += `${key}: ${dataJSON.tokenData[key]} <hr />`;
                }
            }
            jwtDataDiv.innerHTML = str;
        })
        .catch( error => {
            console.error(error)
        })
    })
})()