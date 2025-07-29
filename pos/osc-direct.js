/**
 * Direct OSC Support for Poetics of Sensors
 * 
 * Experimental: Send true OSC messages directly from browser
 * Limited by browser security - requires special server setup
 */

class OSCManager {
    constructor() {
        this.oscSocket = null;
        this.isOSCSupported = false;
        this.oscHost = '127.0.0.1';
        this.oscPort = 5005;
        
        this.checkOSCSupport();
    }
    
    checkOSCSupport() {
        // Check if browser supports UDP (very limited)
        this.isOSCSupported = 'WebTransport' in window || 'RTCDataChannel' in window;
        
        if (!this.isOSCSupported) {
            console.warn('Direct OSC not supported - use WebSocket bridge instead');
        }
    }
    
    async connectOSC(host, port) {
        this.oscHost = host;
        this.oscPort = port;
        
        try {
            // Method 1: WebTransport (Chrome 97+, experimental)
            if ('WebTransport' in window) {
                await this.connectWebTransport();
            }
            // Method 2: WebRTC DataChannel (more complex setup required)
            else if ('RTCDataChannel' in window) {
                await this.connectWebRTC();
            }
            else {
                throw new Error('No OSC transport available');
            }
            
        } catch (error) {
            console.error('OSC connection failed:', error);
            throw error;
        }
    }
    
    async connectWebTransport() {
        // WebTransport allows UDP-like communication
        // Requires server with WebTransport support
        const url = `https://${this.oscHost}:${this.oscPort}/osc`;
        
        this.transport = new WebTransport(url);
        await this.transport.ready;
        
        console.log('OSC WebTransport connected');
    }
    
    async connectWebRTC() {
        // WebRTC DataChannel for peer-to-peer OSC
        // Requires signaling server
        this.rtcConnection = new RTCPeerConnection({
            iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
        });
        
        this.oscChannel = this.rtcConnection.createDataChannel('osc', {
            ordered: false, // UDP-like
            maxRetransmits: 0
        });
        
        console.log('OSC WebRTC DataChannel created');
    }
    
    sendOSCMessage(address, args) {
        if (!this.isOSCSupported) {
            console.warn('OSC not supported - message not sent');
            return;
        }
        
        try {
            const oscMessage = this.createOSCMessage(address, args);
            
            if (this.transport && this.transport.datagrams) {
                // WebTransport
                const writer = this.transport.datagrams.writable.getWriter();
                writer.write(oscMessage);
                writer.releaseLock();
            }
            else if (this.oscChannel && this.oscChannel.readyState === 'open') {
                // WebRTC
                this.oscChannel.send(oscMessage);
            }
            
        } catch (error) {
            console.error('OSC send error:', error);
        }
    }
    
    createOSCMessage(address, args) {
        // Create binary OSC message
        const addressBuffer = this.stringToOSC(address);
        const typeTagBuffer = this.createTypeTag(args);
        const argsBuffer = this.argsToBuffer(args);
        
        const totalLength = addressBuffer.length + typeTagBuffer.length + argsBuffer.length;
        const message = new ArrayBuffer(totalLength);
        const view = new Uint8Array(message);
        
        let offset = 0;
        view.set(new Uint8Array(addressBuffer), offset);
        offset += addressBuffer.length;
        view.set(new Uint8Array(typeTagBuffer), offset);
        offset += typeTagBuffer.length;
        view.set(new Uint8Array(argsBuffer), offset);
        
        return message;
    }
    
    stringToOSC(str) {
        // Convert string to OSC format (null-terminated, 4-byte aligned)
        const encoder = new TextEncoder();
        const bytes = encoder.encode(str);
        const paddedLength = Math.ceil((bytes.length + 1) / 4) * 4;
        
        const buffer = new ArrayBuffer(paddedLength);
        const view = new Uint8Array(buffer);
        view.set(bytes);
        // Null terminator and padding are already zero
        
        return buffer;
    }
    
    createTypeTag(args) {
        let typeTag = ','; // OSC type tag starts with comma
        
        args.forEach(arg => {
            if (typeof arg === 'number') {
                if (Number.isInteger(arg)) {
                    typeTag += 'i'; // integer
                } else {
                    typeTag += 'f'; // float
                }
            } else if (typeof arg === 'string') {
                typeTag += 's'; // string
            } else if (typeof arg === 'boolean') {
                typeTag += arg ? 'T' : 'F'; // true/false
            }
        });
        
        return this.stringToOSC(typeTag);
    }
    
    argsToBuffer(args) {
        const buffers = [];
        
        args.forEach(arg => {
            if (typeof arg === 'number') {
                const buffer = new ArrayBuffer(4);
                const view = new DataView(buffer);
                
                if (Number.isInteger(arg)) {
                    view.setInt32(0, arg, false); // big-endian
                } else {
                    view.setFloat32(0, arg, false); // big-endian
                }
                
                buffers.push(buffer);
            }
            else if (typeof arg === 'string') {
                buffers.push(this.stringToOSC(arg));
            }
            // booleans have no arguments in OSC
        });
        
        // Combine all argument buffers
        const totalLength = buffers.reduce((sum, buf) => sum + buf.byteLength, 0);
        const combined = new ArrayBuffer(totalLength);
        const view = new Uint8Array(combined);
        
        let offset = 0;
        buffers.forEach(buffer => {
            view.set(new Uint8Array(buffer), offset);
            offset += buffer.byteLength;
        });
        
        return combined;
    }
    
    disconnect() {
        if (this.transport) {
            this.transport.close();
            this.transport = null;
        }
        
        if (this.rtcConnection) {
            this.rtcConnection.close();
            this.rtcConnection = null;
        }
        
        console.log('OSC disconnected');
    }
}

// Add to main app
if (typeof window !== 'undefined') {
    window.oscManager = new OSCManager();
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = OSCManager;
}