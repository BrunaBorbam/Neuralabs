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

export const trackScrollDepth = (depth: number) => {
  trackEvent({
    event: 'scroll',
    scroll_depth_percentage: depth,
  });
};

export const trackTimeOnPage = (seconds: number) => {
  trackEvent({
    event: 'page_view',
    time_on_page: seconds,
  });
};

export const trackVideoPlay = (videoTitle: string, videoId?: string) => {
  trackEvent({
    event: 'video_play',
    video_title: videoTitle,
    video_id: videoId,
  });
};

export const trackFileDownload = (fileName: string, fileType?: string) => {
  trackEvent({
    event: 'file_download',
    file_name: fileName,
    file_type: fileType,
  });
};

export const trackError = (errorMessage: string, errorCode?: string) => {
  trackEvent({
    event: 'error',
    error_message: errorMessage,
    error_code: errorCode,
  });
};

let scrollThresholds = [25, 50, 75, 100];
let scrollTracked = new Set<number>();

export const initScrollTracking = () => {
  if (typeof window === 'undefined') return;

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;

    const scrollPercentage = ((scrollTop + windowHeight) / documentHeight) * 100;

    scrollThresholds.forEach(threshold => {
      if (scrollPercentage >= threshold && !scrollTracked.has(threshold)) {
        scrollTracked.add(threshold);
        trackScrollDepth(threshold);
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  return () => window.removeEventListener('scroll', handleScroll);
};

let pageStartTime = Date.now();

export const trackPageDuration = () => {
  if (typeof window === 'undefined') return;

  const handleUnload = () => {
    const duration = Math.round((Date.now() - pageStartTime) / 1000);
    if (duration > 0) {
      trackTimeOnPage(duration);
    }
  };

  window.addEventListener('beforeunload', handleUnload);
  return () => window.removeEventListener('beforeunload', handleUnload);
};

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}
