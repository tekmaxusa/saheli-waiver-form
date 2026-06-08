import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {resolveWaiverLocation, resolveWaiverSiteSlug} from '../merchants/registry';
import App from '../App';
import NotFoundPage from './NotFoundPage';

export default function WaiverRoutePage() {
  const params = useParams<{
    merchantSlug?: string;
    waiverSlug?: string;
    waiverSiteSlug?: string;
  }>();

  const location =
    params.merchantSlug != null && params.waiverSlug != null
      ? resolveWaiverLocation(params.merchantSlug, params.waiverSlug)
      : resolveWaiverSiteSlug(params.waiverSiteSlug);

  useEffect(() => {
    if (location?.documentTitle) {
      document.title = location.documentTitle;
    }
  }, [location]);

  if (!location) {
    return <NotFoundPage />;
  }

  return <App location={location} />;
}
