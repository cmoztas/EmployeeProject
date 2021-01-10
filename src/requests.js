export class Request {
    constructor(url) {
        this.url = url;
    }

    async get() {
        const response = await fetch(this.url);
        const responseData = await response.json();

        return responseData;
    }

    async post(data) {
        const response = await fetch(this.url, {
            method: "POST",
            headers: {"Content-type": "application/json; charset=UTF-8"},
            body: JSON.stringify(data)
        });

        const responseData = await response.json();
        return responseData;
    }

    async put(id, data) {
        const response = await fetch(this.url + "/" + id, {
            method: "PUT",
            headers: {"Content-type": "application/json; charset=UTF-8"},
            body: JSON.stringify(data)
        });

        const responseData = await response.json();
        return responseData;
    }

    async delete(id) {
        await fetch(this.url + "/" + id, {
            method: "DELETE"
        });

        return "Veri silindi";
    }
}