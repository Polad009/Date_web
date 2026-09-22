// URL-safe base64 obfuscation / encryption helper
export interface InviteData {
  chatId: string;
  senderName?: string;
  recipientName?: string;
}

export function encodeInvite(data: InviteData): string {
  try {
    const jsonStr = JSON.stringify(data);
    // Encode to base64 and make URL-safe
    const base64 = btoa(encodeURIComponent(jsonStr));
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  } catch (e) {
    console.error('Error encoding invite', e);
    return '';
  }
}

export function decodeInvite(token: string): InviteData | null {
  try {
    let base64 = token.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    const jsonStr = decodeURIComponent(atob(base64));
    return JSON.parse(jsonStr) as InviteData;
  } catch (e) {
    console.error('Error decoding invite', e);
    return null;
  }
}
