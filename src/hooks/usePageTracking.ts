import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

// Generate or retrieve session ID
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
};

export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    const trackPageView = async () => {
      try {
        const sessionId = getSessionId();
        
        await supabase.from('page_views').insert({
          page_path: location.pathname + location.search,
          referrer: document.referrer || null,
          user_agent: navigator.userAgent,
          session_id: sessionId,
        });
      } catch (error) {
        // Silent fail for analytics
        console.error('Analytics tracking error:', error);
      }
    };

    trackPageView();
  }, [location]);
};
