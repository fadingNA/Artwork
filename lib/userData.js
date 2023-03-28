import {getToken, readToken} from "./Auth";

export async function addToFav(id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/favourites/${id}`, {
        method: 'PUT',
        headers: {
            "Content-type": 'applicaation/json',
            Authorization: `JWT ${token}`,
        }
    })
    const data = res.json();
    if (data.status === 200) {
        return data
    } else {
        return []
    }
}

export async function removeFromFav(id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/favourites/${id}`, {
        method: 'DELETED',
        headers: {
            "Content-type": 'application/json',
            Authorization: `JWT ${getToken()}`,
        }
    })
    const data = res.json();
    return data.status === 200 ? data : [];
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
    return data.status === 200 ? data : [];
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
    return data.status === 200 ? data : [];
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
    return data.status === 200 ? data : [];
}

export async function getHistory() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/history`, {
        method: 'GET',
        headers: {
            "Content-type": 'application/json',
            Authorizaiton: `JWT ${getToken()}`
        }
    });
    const data = res.json();
    return data.status === 200 ? data : [];
}


