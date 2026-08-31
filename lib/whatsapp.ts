const DEFAULT_WHATSAPP_NUMBER = '5511999999999';

export const getWhatsAppLink = (message: string) => {
  const number = process.env.NEXT_PUBLIC_WHATSAPP || DEFAULT_WHATSAPP_NUMBER;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
};
