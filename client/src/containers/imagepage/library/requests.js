
async function getRequest(url) {
    try{
        const response = await fetch(url);
        return await response.json();
    }catch(error) {
        console.log(error)
        return [];
    }
}

async function postRequest(url,completeList) {
    try{
        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({list: completeList})
        })
        return await response.json();
    }catch(error) {
        return ['bad luck!'];
    }
}

export {getRequest,postRequest}