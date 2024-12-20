import { config } from '../config/env';
import { EventUpdate, TicketUpdate } from '../types/websocket';

class WebSocketService {
  private socket: WebSocket | null = null;
  private listeners: Map<string, Set<(data: any) => void>> = new Map();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 3;
  private reconnectDelay = 2000;
  private simulationMode = true; // Default to simulation mode

  connect() {
    // Skip connection if we're in simulation mode
    if (this.simulationMode) return;

    try {
      this.socket = new WebSocket(config.wsUrl);
      this.setupEventListeners();
    } catch (error) {
      console.info('WebSocket connection not available, using simulation mode');
      this.simulationMode = true;
    }
  }

  private setupEventListeners() {
    if (!this.socket) return;

    this.socket.addEventListener('open', () => {
      console.info('WebSocket connected');
      this.reconnectAttempts = 0;
    });

    this.socket.addEventListener('message', (event) => {
      try {
        const data = JSON.parse(event.data);
        this.notifyListeners(data.type, data);
      } catch (error) {
        console.warn('Error parsing WebSocket message:', error);
      }
    });

    this.socket.addEventListener('close', () => {
      this.handleDisconnect();
    });

    this.socket.addEventListener('error', () => {
      this.handleDisconnect();
    });
  }

  private handleDisconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => this.connect(), this.reconnectDelay);
    } else {
      console.info('Switching to simulation mode after failed reconnection attempts');
      this.simulationMode = true;
    }
  }

  subscribe<T>(eventType: string, callback: (data: T) => void) {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, new Set());
    }
    this.listeners.get(eventType)?.add(callback);

    // Start simulation immediately since we're in simulation mode
    return () => {
      this.listeners.get(eventType)?.delete(callback);
    };
  }

  private notifyListeners(eventType: string, data: any) {
    this.listeners.get(eventType)?.forEach(callback => callback(data));
  }

  // Simulation methods for development and fallback
  private simulateEventUpdate(eventId: string): EventUpdate {
    const statuses = ['AVAILABLE', 'LIMITED', 'SOLD_OUT'] as const;
    const randomStatus = statuses[Math.floor(Math.random() * 2)]; // Bias towards available/limited

    return {
      type: 'EVENT_UPDATE',
      eventId,
      updates: {
        availability: {
          status: randomStatus,
          remaining: randomStatus === 'LIMITED' ? Math.floor(Math.random() * 20) + 1 : undefined
        },
        pricing: {
          min: Math.floor(Math.random() * 50) + 50,
          max: Math.floor(Math.random() * 100) + 150,
          currency: 'USD'
        }
      }
    };
  }

  private simulateTicketUpdate(eventId: string, sectionId: string): TicketUpdate {
    const statuses = ['AVAILABLE', 'LIMITED', 'SOLD_OUT'] as const;
    const randomStatus = statuses[Math.floor(Math.random() * 2)]; // Bias towards available/limited

    return {
      type: 'TICKET_UPDATE',
      eventId,
      sectionId,
      updates: {
        available: Math.floor(Math.random() * 100),
        price: Math.floor(Math.random() * 200) + 50,
        status: randomStatus
      }
    };
  }

  simulateUpdates(eventId: string, sectionId?: string) {
    if (!this.simulationMode) return;

    // Simulate event updates every 5-10 seconds
    const eventInterval = setInterval(() => {
      const update = this.simulateEventUpdate(eventId);
      this.notifyListeners('EVENT_UPDATE', update);
    }, 5000 + Math.random() * 5000);

    // Simulate ticket updates every 3-7 seconds if section is specified
    let ticketInterval: number | undefined;
    if (sectionId) {
      ticketInterval = setInterval(() => {
        const update = this.simulateTicketUpdate(eventId, sectionId);
        this.notifyListeners('TICKET_UPDATE', update);
      }, 3000 + Math.random() * 4000);
    }

    // Return cleanup function
    return () => {
      clearInterval(eventInterval);
      if (ticketInterval) clearInterval(ticketInterval);
    };
  }
}

export const wsService = new WebSocketService();