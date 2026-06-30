import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, schema }) => {
  const defaultTitle = "ANJU HOUSE | Refined Heat & LA Game Nights";
  const defaultDesc = "Experience the refined heat of authentic Korean comfort food paired with the vibrant energy of a Los Angeles sports beer garden.";
  
  const pageTitle = title ? `${title} | ANJU HOUSE` : defaultTitle;
  const pageDesc = description || defaultDesc;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDesc} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDesc} />
      <meta property="og:image" content="https://lh3.googleusercontent.com/aida-public/AB6AXuD6ZPPkf1L5HPUDsY5SJiVGA90NXWZrJS3s1ZNhPc59r-dkopXPnCsKkaNbaOe7m901AVJEdGnMY78IpdBccC74syvK8XZw0Zm3gDa10yqXMWRTkke3GZ-pkqPzDxLAwapaVkDO7ye3jlp6-IXTDu_mJcmL_HMSszPiPPxRAAc7QL_Awits-lUm_xE1p4fxMRsjDpddOaWUDsYKYEZz7Qv9D0sePksg4kN6SwoArYwXYP79Ukp015rKxkDkATS9tTOT8xXGJWWf7To1" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDesc} />
      
      {/* Restaurant Schema */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
