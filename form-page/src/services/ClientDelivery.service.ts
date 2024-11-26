export class ClientDeliveryService {
  private readonly url = `${import.meta.env.VITE_API_HOST}/api/clients`;

  saveData(data: Record<string, any>): Promise<any> {
    return fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }
}