export type GTagEvent =
  | 'page_view'
  | 'form_submit'
  | 'button_click'
  | 'scroll'
  | 'video_play'
  | 'file_download'
  | 'error'
  | 'conversion';

interface GTagEventParams {
  event: GTagEvent;
  page_path?: string;
  page_title?: string;
  value?: number;
  currency?: string;
  items?: any[];
  [key: string]: any;
}

export const trackEvent = (params: GTagEventParams) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', params.event, {
      page_path: window.location.pathname,
      ...params,
    });
  }
};

export const trackFormSubmit = (formName: string, data?: Record<string, any>) => {
  trackEvent({
    event: 'form_submit',
    form_name: formName,
    ...data,
  });
};

export const trackButtonClick = (buttonName: string, section?: string) => {
  trackEvent({
    event: 'button_click',
    button_name: buttonName,
    section: section,
  });
};

export const trackConversion = (value: number, currency: string = 'BRL') => {
  trackEvent({
    event: 'conversion',
    value,
    currency,
  });
};

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}
