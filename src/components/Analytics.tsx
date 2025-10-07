// Analytics.tsx
// Inyecta GA4 solo si hay VITE_GA_ID
export default function Analytics() {
  const id = import.meta.env.VITE_GA_ID;
  if (!id) return null;
  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${id}`}></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}');
        `,
        }}
      />
    </>
  );
}
