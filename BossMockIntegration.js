class BossMockIntegration extends shim {
    constructor(socket, onMessage) {
        super('/');
        this._socket = socket;
        this._onMessage = onMessage;
        this._socket.on('directMessage', this._receiveDirectMessage.bind(this));
    }

    sendMessage(message, thread) {
        this._socket.emit('directMessage', message, thread);
    }

    _receiveDirectMessage(message) {
        const event = shim.createEvent(1, 1, 'boss-user', message[0]);
        event.event_source = 'boss';
        this._onMessage(this, event);
    }
};

module.exports = BossMockIntegration;
