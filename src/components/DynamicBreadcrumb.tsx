import { useLocation, Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const breadcrumbMap: { [key: string]: string } = {
  "dashboard": "Dashboard",
  "gst-tool": "GST Online Seller",
  "gst-profile": "GST Information",
  "gst-import": "Import Data",
};

export default function DynamicBreadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  // Always start with Home
  const crumbs = [
    <BreadcrumbItem key="home">
      <BreadcrumbLink asChild>
        <Link to="/">Home</Link>
      </BreadcrumbLink>
    </BreadcrumbItem>,
  ];

  let path = "";
  pathnames.forEach((segment, idx) => {
    if (!(segment in breadcrumbMap)) return; // Skip unknown segments
    
    path += "/" + segment;
    const isLast = idx === pathnames.length - 1;
    const label = breadcrumbMap[segment] || segment;

    crumbs.push(<BreadcrumbSeparator key={`sep-${segment}`} />);

    crumbs.push(
      <BreadcrumbItem key={segment}>
        {isLast ? (
          <span className="font-semibold">{label}</span>
        ) : (
          <BreadcrumbLink asChild>
            <Link to={path}>{label}</Link>
          </BreadcrumbLink>
        )}
      </BreadcrumbItem>
    );
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>{crumbs}</BreadcrumbList>
    </Breadcrumb>
  );
}
