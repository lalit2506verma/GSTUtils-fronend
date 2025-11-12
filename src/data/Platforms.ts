import meesho_logo from "@/assets/meesho.png";
import amazon_logo from "@/assets/amazon.png";
import flipkart_logo from "@/assets/flipkart.png";
import myntra_logo from "@/assets/myntra.png";
import jioMart_logo from "@/assets/jiomart.png";
import snapDeal_logo from "@/assets/snapdeal.png";
import glowroad_logo from "@/assets/glowroad.png";
import limeroad_logo from "@/assets/limeroad.png";

// ========================= TYPES =========================
type PlatformFile = {
  label: string;
  fileType: string;
  fileDownloadPath?: string;
  instruction?: string;
};

export type Platform = {
  name: string;
  type: string;
  logo: string;
  link: string;
  downloadPath?: string;
  files: PlatformFile[];
};

// ========================= PLATFORM CONFIG =========================
export const platforms: Platform[] = [
  {
    name: "Meesho",
    type: "B2C",
    logo: meesho_logo,
    link: "meesho.com",
    downloadPath: "Meesho Panel -> Payments -> Download GST Reports",
    files: [
      { label: "tcs_sales.xlsx", fileType: "sales" },
      { label: "tcs_sales_return.xlsx", fileType: "sales" },
      {
        label: "Tax_invoice_details.xlsx",
        fileType: "invoice",
        fileDownloadPath: "Meesho Panel → Payments → Tax Invoice",
        instruction:
          "Unzip the file and upload only the Excel (Tax_invoice_details.xlsx) file.",
      },
    ],
  },
  {
    name: "Amazon",
    type: "B2C",
    logo: amazon_logo,
    link: "amazon.in",
    downloadPath:
      "Reports -> Manage Taxes -> GST Monthly Reports -> Download Report -> Select Merchant Tax Report (MTR) -> select (B2C) -> Select Year and Month -> Download Report.",
    files: [{ label: "MTR_B2C File", fileType: "sales" }],
  },
  {
    name: "Amazon B2B",
    type: "B2B",
    logo: amazon_logo,
    link: "amazon.in",
    downloadPath:
      "Reports -> Manage Taxes -> GST Monthly Reports -> Download Report -> Select Merchant Tax Report (MTR) -> select (B2B) -> Select Year and Month -> Download Report.",
    files: [{ label: "MTR_B2C File", fileType: "sales" }],
  },
  {
    name: "Flipkart",
    type: "B2C & B2B",
    logo: flipkart_logo,
    link: "flipkart.com",
    downloadPath: "Flipkart Portal -> Report -> Tax Reports -> Sales report",
    files: [{ label: "Sales Report", fileType: "sales" }],
  },
  {
    name: "Myntra",
    type: "B2C",
    logo: myntra_logo,
    link: "myntra.com",
    downloadPath:
      "Partner Portal -> Financial Reports -> Monthly Reports -> Select Month -> Download Below Required Reports",
    files: [
      { label: "GSTR Report Packed", fileType: "sales" },
      { label: "GSTR Report RTO", fileType: "sales" },
      { label: "GSTR Report RT", fileType: "invoice" },
    ],
  },
  {
    name: "Snapdeal",
    type: "B2C",
    logo: snapDeal_logo,
    link: "snapdeal.com",
    downloadPath:
      "Snapdeal Panel -> Payments -> GST Report -> Request Report -> Download report",
    files: [{ label: "GSTR Return Report", fileType: "invoice" }],
  },
  {
    name: "Glowroad",
    type: "B2C",
    logo: glowroad_logo,
    link: "glowroad.com",
    downloadPath:
      "Glowroad Portal -> My Earnings -> Download ->GST Reports & Invoices -> Select Year and Month -> Download",
    files: [{ label: "GST Reports", fileType: "sales" }],
  },
  {
    name: "Limeroad",
    type: "B2C",
    logo: limeroad_logo,
    link: "limeroad.com",
    downloadPath:
      "Limeroad Portal -> Report -> Tax Reports -> GSTR return report",
    files: [{ label: "GSTR Report", fileType: "sales" }],
  },
  {
    name: "JioMart",
    type: "B2C",
    logo: jioMart_logo,
    link: "jiomart.com",
    downloadPath:
      "Jiomart Portal -> Reports -> View Generated Reports -> Invoice reports -> Monthly -> Download",
    files: [{ label: "GSTR Report", fileType: "sales" }],
  },
];
