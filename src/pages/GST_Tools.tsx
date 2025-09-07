import DynamicBreadcrumb from '@/components/DynamicBreadcrumb';
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
                  <DynamicBreadcrumb />
              </div>

              {/* Body */}
              <div className="mt-10 flex-1">
                  <Outlet />
              </div>
          </div>
      </>
  );
}
