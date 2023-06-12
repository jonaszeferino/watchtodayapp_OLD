import { useEffect } from 'react';

const AdSense = () => {
  useEffect(() => {
    if (window) {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="SEU_ID_DO_ADSENSE"
      data-ad-slot="SEU_SLOT_DO_ADSENSE"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
};

export default AdSense;