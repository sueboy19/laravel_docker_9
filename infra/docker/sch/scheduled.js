const url = 'http://web/api/'
const data = {
    'date': '2022215',
};

const customHeaders = {
    "Content-Type": "application/json",
}

fetch(url, {
    method: "POST",
    headers: customHeaders,
    body: JSON.stringify(data),
})
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
    });
