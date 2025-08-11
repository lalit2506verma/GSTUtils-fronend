import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Outlet } from 'react-router-dom';

export default function GST_Tools() {
  return (
      <>
          <div className="flex flex-col mt-15 mx-5 p-3 w-full">
              <div className="header">
                  <span>
                      <h1 className="text-3xl font-bold mb-2">
                          GST Online Seller
                      </h1>
                  </span>

                  {/* Breadcrumb */}
                  <Breadcrumb>
                      <BreadcrumbList>
                          <BreadcrumbItem>Home</BreadcrumbItem>
                          <BreadcrumbSeparator />
                          <BreadcrumbItem>
                              <BreadcrumbLink href="/user/dashboard">
                                  Dashboard
                              </BreadcrumbLink>
                          </BreadcrumbItem>
                          <BreadcrumbSeparator />
                          <BreadcrumbItem>
                              <BreadcrumbLink
                                  href="/user/dashboard/gst-tool"
                                  className="font-semibold"
                              >
                                  GST Online Seller
                              </BreadcrumbLink>
                          </BreadcrumbItem>
                      </BreadcrumbList>
                  </Breadcrumb>
              </div>

              {/* Body */}
              <div className="mt-10 flex-1">
                  <Outlet />
              </div>
          </div>
      </>
  );
}
