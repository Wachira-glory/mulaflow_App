// src/lib/quikk.ts

export async function triggerStkPush(phone: string, amount: number, paybill: string) {
  // Example API call to trigger STK push via your backend or external API
  const response = await fetch('/api/stkpush', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ phone, amount, paybill })
  });
  
  if (!response.ok) {
    throw new Error('Failed to trigger STK Push');
  }
  
  return response.json();
}
