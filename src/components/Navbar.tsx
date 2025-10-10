import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "@/services/auth-context";
import default_profile_pic from "@/assets/user.png";
import logo from "@/assets/Stofin_logo.svg";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const [showDropdown, setShowDropdown] = React.useState(false);
  const dropDownRef = React.useRef<HTMLDivElement | null>(null);

  // CLOSE DROPDOWN ON OUTSIDE CLICK
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.addEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // function to navigate to different pages
  const handleClick = (path: string) => {
    navigate(path);
  };

  console.log(isLoggedIn);

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-400 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="https://stofin.in/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} className="h-8" alt="Stofin Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Stofin
            </span>
          </a>

          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {isLoggedIn ? (
              // User is  logged in
              <div className="relative" ref={dropDownRef}>
                <button
                  type="button"
                  className="flex items-center justify-center text-sm w-9 h-9 bg-gray-200 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300"
                  id="user-menu-button"
                  onClick={() => setShowDropdown((prev) => !prev)}
                  aria-expanded={showDropdown}
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-6 h-6"
                    src={default_profile_pic}
                    alt="user photo"
                  />
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 z-50 bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600">
                    <div className="px-4 py-3">
                      <span className="block text-sm text-gray-900 dark:text-white">
                        Bonnie Green
                      </span>
                      <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                        name@flowbite.com
                      </span>
                    </div>
                    <ul className="py-2">
                      <li>
                        <Link
                          to="/dashboard"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/settings"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          Settings
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/earnings"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          Earnings
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            logout();
                            navigate("/auth/login");
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          Sign out
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => handleClick("/auth/register")}
                type="button"
                className="text-white bg-cyan-500 hover:bg-white hover:text-cyan-500 hover:border hover:border-cyan-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Get started
              </button>
            )}

            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>

              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <NavigationMenu viewport={false}>
              <NavigationMenuList>
                {/* Home */}
                <NavigationMenuItem>
                  <Button onClick={() => handleClick("/home")} variant="ghost">
                    Home
                  </Button>
                </NavigationMenuItem>

                {/* Services */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {components.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          href={component.href}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Resources */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[300px] gap-4">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to={"/resources/calculators"}>
                            <div className="font-medium">Calculators</div>
                            <div className="text-muted-foreground">
                              Browse all types of tax calculators.
                            </div>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link to={""}>
                            <div className="font-medium">Documentation</div>
                            <div className="text-muted-foreground">
                              Learn how to use the library.
                            </div>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link to={""}>
                            <div className="font-medium">Blog</div>
                            <div className="text-muted-foreground">
                              Read our latest blog posts.
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* pricing */}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link to={""}> Pricing</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* About */}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link to={"/about"}> About </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Contacts */}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link to={"/contact"}> Contacts</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </nav>
    </>
  );
};

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link to={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

export default Navbar;
