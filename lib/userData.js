import {getToken, readToken} from "./Auth";

export async function addToFav(id) {
    console.log(getToken());

    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/favourites/${id}`, {
        method: 'PUT',
        headers: {
            "Content-type": 'application/json',
            Authorization: `JWT ${getToken()}`,
        }
    })
    const data = res.json();
    console.log(data)
    console.log(res.status)
    if (res.status === 200 || data.status === 204) {
        return data
    } else {
        return []
    }
}

export async function removeFromFav(id) {
    console.log(getToken());

    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/favourites/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-type": 'application/json',
            Authorization: `JWT ${getToken()}`,
        }
    })
    const data = res.json();
    if (res.status === 200 || data.status === 204){
        return data
    } else{
        return []
    }
}

export async function getFav() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/favourites`, {
        method: 'GET',
        headers: {
            "Content-type": 'application/json',
            Authorization: `JWT ${getToken()}`
        }
    });

    const data = res.json();
    if (res.status === 200 || data.status === 204){
        return data
    } else{
        return []
    }
}

export async function addToHistory(id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/history/${id}`, {
        method: 'PUT',
        headers: {
            "Content-type": 'application/json',
            Authorization: `JWT ${getToken()}`
        }
    });

    const data = res.json();
    if (res.status === 200 || data.status === 204){
        return data
    } else{
        return []
    }
}

export async function removeHistory(id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/history/${id}`, {
        method: 'DELETED',
        headers: {
            "Content-type": 'application/json',
            Authorization: `JWT ${getToken()}`
        }
    });
    const data = res.json();
    if (res.status === 200 || data.status === 204){
        return data
    } else{
        return []
    }
}

export async function getHistory() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/history`, {
        method: 'GET',
        headers: {
            "Content-type": 'application/json',
            Authorization: `JWT ${getToken()}`
        }
    });
    const data = res.json();
    if (res.status === 200 || data.status === 204){
        return data
    } else{
        return []
    }
}


