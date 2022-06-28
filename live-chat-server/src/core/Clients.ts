import ws from "ws";

type Client = {
    room: string,
    client: ws.WebSocket
}

class Clients {
    private clients = new Map<string, Client>();

    public getRoomClientsByClientName(name: string){
        let client = this.clients.get(name);

        if(!client) return [];

        let room = client.room;

        return Array.from(this.clients.entries()).filter(([name, client]) => {
            return room === client.room;
        }).map(([name, client]) => {
            return client.client;
        });
    }

    public getRoomClientNamesByClientName(name: string){

        let client = this.clients.get(name);

        if(!client) return [];

        let room = client.room;

        return Array.from(this.clients.entries()).filter(([name, client]) => {
            return room === client.room;
        }).map(([name, client]) => {
            return name;
        });
    }

    public getNameByClient(client: ws.WebSocket){
        let clientEntries = Array.from(this.clients.entries());

        let clientObj = clientEntries.find(([name, clientObj]) => clientObj.client === client);

        if(!clientObj) return;

        return clientObj[0];
    }

    public hasClient(client: string){
        return this.clients.has(client);
    }

    public addClient(client: ws.WebSocket, name: string, room: string){
        this.clients.set(name, {
            room,
            client
        });
        return true;
    }

    public deleteClient(client: ws.WebSocket){
        let clientEntries = Array.from(this.clients.entries());

        let clientObj = clientEntries.find(([name, clientObj]) => clientObj.client === client);

        if(!clientObj || !clientObj[0]) return;

        this.clients.delete(clientObj[0]);
    }
}

export default new Clients();