import { useEffect } from "react";

export default function SEO({
  title = "Singh Builder's | Real Estate. Built on Trust.",
  description = "Singh Builder's — Delhi-NCR real-estate company established in 2007. Residential, commercial and development opportunities across Delhi, South Delhi and Gurugram."
}) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description);
  }, [title, description]);

  return null;
}
