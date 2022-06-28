import express from 'express';
import ws from 'ws';
import http from 'http';
import config from './config.js';
import { decodeMessage } from './utils/decodeMessage';
import { createMessageObject, createSystemMessageObject, createUpdateMembersMessageObject } from './utils/createMessage';
import Clients from './core/Clients';

let server = http.createServer(express);
let wss = new ws.Server({ server });

wss.on('connection', (socket) => {
    socket.on('message', (data) => {
        let decodedData = decodeMessage(data.toString());

        if(decodedData === null) return;

        switch(decodedData.type){
            case "new-connection": (() => {
                if(Clients.hasClient(decodedData.user)) return socket.send(createSystemMessageObject('Name already taken!', null, 'alert'));

                Clients.addClient(socket, decodedData.user, decodedData.room);
                socket.send(createSystemMessageObject(`You have joined the room with ID: ${decodedData.room}!`, 'open-chat', 'message'));
                socket.send(createUpdateMembersMessageObject(Clients.getRoomClientNamesByClientName(decodedData.user)));
                
                let allClientsInRoom = Clients.getRoomClientsByClientName(decodedData.user);

                allClientsInRoom.forEach(client => {
                    if(client !== socket && client.readyState === ws.OPEN){
                        client.send(createSystemMessageObject(`${decodedData.user} joined the room!`, null, 'message'));
                        client.send(createUpdateMembersMessageObject(Clients.getRoomClientNamesByClientName(decodedData.user)));
                    }
                })
            })()
                
            break;
            case "new-message": (() => {
                let newMessage = decodedData.message;

                let allClientsInRoom = Clients.getRoomClientsByClientName(decodedData.user);

                allClientsInRoom.forEach(client => {
                    if(client !== socket && client.readyState === ws.OPEN){
                        client.send(createMessageObject(decodedData.user, newMessage))
                    }
                })
            })()
            break;
        }
    });

    socket.on('close', (code, reason) => {

        let clientName = Clients.getNameByClient(socket);

        if(clientName){
            let allClientsInRoom = Clients.getRoomClientsByClientName(clientName);
            Clients.deleteClient(socket);

            allClientsInRoom.forEach((client) => {
                if(client !== socket && client.readyState === ws.OPEN){
                    client.send(createSystemMessageObject(`${clientName} left the room!`, null, 'message'));
                    client.send(createUpdateMembersMessageObject(Clients.getRoomClientNamesByClientName(clientName)));
                }
            })
        }else {
            Clients.deleteClient(socket);
        }
    });
})

server.listen(config.port, () => {
    console.log(`Started on port: ${config.port}`);
});