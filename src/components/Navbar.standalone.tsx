"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

/**
 * DreamPlay Pianos - Standalone Navbar Component
 * 
 * This is a self-contained navbar with all CSS included.
 * Copy this entire file to use in another Next.js project.
 * 
 * Dependencies:
 * - next/link
 * - next/navigation (usePathname)
 * - React
 * 
 * Assets Required:
 * - /images/logos/Logo.svg (or update the logo path)
 */

// ============================================================================
// EMBEDDED STYLES - All CSS required for the navbar
// ============================================================================
const navbarStyles = `
/* CSS Variables */
:root {
  --colors-dark: #202020;
  --colors-white: #fff;
  --colors-white-80: rgba(255, 255, 255, 0.8);
  --colors-black: #000;
}

/* Main Navigation Section */
.section_navigation5-wrfrm {
  z-index: 999;
  background-color: transparent;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  padding: 1.5rem 5%;
  position: fixed;
  inset: 0% 0% auto;
  display: flex;
}

.navigation5_container {
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 82.5rem;
  margin-left: auto;
  margin-right: auto;
  display: flex;
}

.navigation5_logo-link {
  padding-left: 0;
  text-decoration: none;
}

.navigation_logo {
  outline-offset: 0px;
  outline: 3px #fff;
  max-width: 100%;
  height: auto;
}

/* Menu Wrapper */
.navigation5_menu-wrfrm {
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
  background-color: rgba(255, 255, 255, 0.04);
  border-radius: 62.4375rem;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.25rem;
  display: flex;
  position: static;
}

.navigation5_menu-wrfrm.is-page-height-tablet {
  background-color: #fff;
  -webkit-backdrop-filter: none;
  backdrop-filter: none;
  border: 0 solid #000;
  border-radius: 1.5rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

/* Menu Links */
.navigation5_menu-links {
  grid-column-gap: 1.25rem;
  grid-row-gap: 1.25rem;
  justify-content: flex-start;
  align-items: center;
  display: flex;
}

.navigation5_link-wrfrm {
  color: var(--colors-dark);
  padding: 0.75rem 0;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 400;
  transition: color 0.2s ease;
}

.navigation5_link-wrfrm:hover {
  color: #666;
}

.navigation5_link-wrfrm.w--current {
  font-weight: 500;
}

/* Nav Divider */
.nav-divider {
  background-color: rgba(118, 118, 123, 0.5);
  width: 1px;
  height: 0.875rem;
}

/* Button Wrapper */
.navigation5_button-wrapper {
  grid-column-gap: 0.5rem;
  grid-row-gap: 0.5rem;
  border: 0 solid #000;
  border-radius: 0;
  justify-content: flex-start;
  align-items: center;
  display: flex;
}

.navigation5_button-wrapper.button-show-on-landscape {
  display: none;
}

.navigation5_buttons-wrfrm {
  grid-template-rows: auto;
  grid-template-columns: 1fr 1fr;
  grid-auto-columns: 1fr;
  justify-content: flex-start;
  align-items: center;
  display: flex;
}

/* Button Styles */
.button {
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  border: 0px solid var(--colors-dark);
  color: var(--colors-dark);
  text-align: center;
  background-color: #fff;
  border-radius: 2rem;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 3.5rem;
  padding: 0.25rem 4rem 0.25rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  line-height: 165%;
  text-decoration: none;
  display: flex;
  position: relative;
  overflow: clip;
  transition: all 0.3s ease;
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.button.w-variant-1ae2a9c7-3071-e35e-921a-e41dc6d6ad44 {
  border-color: var(--colors-white-80);
}

.button_text {
  z-index: 2;
  width: 100%;
  position: relative;
}

.button_icon {
  background-color: var(--colors-dark);
  color: var(--colors-white);
  border-radius: 50rem;
  flex: none;
  justify-content: flex-start;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0.5rem 0.5rem 0.5rem 0.7rem;
  display: flex;
  position: absolute;
  inset: 7px 7px auto auto;
}

.button_icon-svg {
  width: 1.125rem;
  height: 0.625rem;
}

/* Menu Button (Hamburger) */
.navigation5_menu-button {
  border: 0 solid #000;
  padding: 0;
  background: transparent;
  cursor: pointer;
  display: none;
}

.navigation5_menu-icon {
  background-color: transparent;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;
  padding-bottom: 0;
  padding-right: 0;
  display: flex;
}

.navigation_menu_line-top,
.navigation_menu_line-middle,
.navigation_menu_line-bottom {
  border-radius: 62.4375rem;
  width: 1.5rem;
  height: 2px;
  padding-bottom: 0;
  padding-right: 0;
  transition: all 0.3s ease;
}

.navigation_menu_line-top.navigation-menu-line-background-wrfrm,
.navigation_menu_line-middle.navigation-menu-line-background-wrfrm,
.navigation_menu_line-bottom.navigation-menu-line-background-wrfrm {
  background-color: #202020;
}

.navigation_menu_line-middle {
  justify-content: center;
  align-items: center;
  margin-top: 6px;
  margin-bottom: 6px;
  display: flex;
}

.navigation_menu_line-middle-inner {
  width: 0.25rem;
  height: 0;
  padding-bottom: 0;
  padding-right: 0;
}

/* ============================================================================
   TABLET BREAKPOINT (max-width: 991px)
   ============================================================================ */
@media screen and (max-width: 991px) {
  .section_navigation5-wrfrm {
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
  }

  .navigation5_menu-wrfrm {
    display: none;
  }

  .navigation5_menu-links {
    grid-column-gap: 2rem;
    grid-row-gap: 2rem;
    flex-flow: column;
    justify-content: flex-start;
    align-items: stretch;
    display: flex;
  }

  .navigation5_link-wrfrm {
    color: #202020;
    margin-left: 0;
    margin-right: 0;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 0;
    font-size: 1.125rem;
  }

  .navigation5_button-wrapper.button-show-on-landscape {
    flex-flow: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-top: 2rem;
    display: none;
  }

  .navigation5_buttons-wrfrm {
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
    grid-template-rows: auto auto;
    grid-template-columns: 1fr;
    display: flex;
  }

  .navigation5_menu-button {
    display: block;
  }

  .navigation5_menu-button.w--open {
    background-color: transparent;
  }

  .nav-divider {
    display: none;
  }
}

/* ============================================================================
   MOBILE BREAKPOINT (max-width: 767px)
   ============================================================================ */
@media screen and (max-width: 767px) {
  .section_navigation5-wrfrm {
    height: auto;
    min-height: 4rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  .navigation5_logo-link {
    max-width: 13.75rem;
    padding-left: 0;
  }

  .navigation5_menu-wrfrm {
    grid-column-gap: 2rem;
    grid-row-gap: 2rem;
  }

  .navigation5_menu-links {
    grid-column-gap: 1.5rem;
    grid-row-gap: 1.5rem;
  }

  .navigation5_button-wrapper {
    display: none;
  }

  .navigation5_button-wrapper.button-show-on-landscape {
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
    flex-flow: column;
    align-items: flex-start;
    margin-top: 1.5rem;
    display: flex;
  }

  .navigation5_buttons-wrfrm {
    background-color: transparent;
    display: flex;
  }

  .navigation5_menu-icon {
    background-color: #fff;
  }

  .nav-divider {
    display: none;
  }
}

/* ============================================================================
   MOBILE MENU OVERLAY
   ============================================================================ */
.mobile-menu-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.mobile-menu {
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  background-color: white;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  z-index: 1001;
  transition: all 0.3s ease;
}

.mobile-menu.is-open {
  opacity: 1;
  transform: translateY(0);
  visibility: visible;
}

.mobile-menu.is-closed {
  opacity: 0;
  transform: translateY(-1rem);
  visibility: hidden;
  pointer-events: none;
}

.mobile-menu-content {
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
}

.mobile-menu-link {
  padding: 1rem 1.5rem;
  font-size: 1.125rem;
  font-weight: 500;
  color: #1f2937;
  text-decoration: none;
  transition: background-color 0.2s ease;
}

.mobile-menu-link:hover {
  background-color: #f3f4f6;
}

.mobile-menu-section-title {
  padding: 0.5rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
}

.mobile-menu-sublink {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  color: #374151;
  text-decoration: none;
  transition: background-color 0.2s ease;
}

.mobile-menu-sublink:hover {
  background-color: #f3f4f6;
}

.mobile-menu-divider {
  border-top: 1px solid #e5e7eb;
  margin: 0.5rem 0;
}

.mobile-menu-cta {
  padding: 1rem 1.5rem;
}

.mobile-menu-cta-button {
  display: block;
  width: 100%;
  text-align: center;
  padding: 0.75rem 1.5rem;
  background-color: #000;
  color: #fff;
  border-radius: 9999px;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.2s ease;
}

.mobile-menu-cta-button:hover {
  background-color: #333;
}
`;

// ============================================================================
// NAVBAR COMPONENT
// ============================================================================
export default function Navbar() {
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [showAboutDropdown, setShowAboutDropdown] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const isCustomizePage = pathname === "/customize";

  const getLinkClass = (path: string) => {
    const baseClass = "navigation5_link-wrfrm w-nav-link";
    const darkClass = isCustomizePage ? " text-white hover:text-[#4a9eff]" : "";
    return pathname === path ? `${baseClass} w--current${darkClass}` : `${baseClass}${darkClass}`;
  };

  const getBrandClass = (path: string) => {
    const baseClass = "navigation5_logo-link w-nav-brand";
    return pathname === path ? `${baseClass} w--current` : baseClass;
  };

  return (
    <>
      {/* Inject styles */}
      <style dangerouslySetInnerHTML={{ __html: navbarStyles }} />

      <div
        data-animation="default"
        className={`section_navigation5-wrfrm w-nav ${isCustomizePage ? 'bg-[#0a0a0f] border-b border-white/5' : ''}`}
        style={isCustomizePage ? { position: 'relative', inset: 'auto' } : undefined}
        data-wf--navbar--variant="base"
        data-easing2="ease"
        // @ts-ignore
        fs-scrolldisable-element="smart-nav"
        data-easing="ease"
        data-collapse="medium"
        role="banner"
        data-duration="400"
      >
        <div className="navigation5_container">
          <Link
            href="/"
            aria-current="page"
            className={getBrandClass("/")}
          >
            <img
              loading="lazy"
              src="/images/logos/Logo.svg"
              alt="DreamPlay Pianos"
              className={`navigation_logo ${isCustomizePage ? 'brightness-0 invert' : ''}`}
            />
          </Link>
          <nav
            role="navigation"
            className="navigation5_menu-wrfrm is-page-height-tablet w-nav-menu"
          >
            <div className="navigation5_menu-links">
              <Link
                href="/"
                aria-current="page"
                className={getLinkClass("/")}
              >
                DreamPlay One
              </Link>
              <div className={`nav-divider ${isCustomizePage ? 'bg-white/20' : ''}`}></div>
              <Link
                href="/why-narrow"
                className={getLinkClass("/why-narrow")}
              >
                Why Narrow?
              </Link>
              <div className={`nav-divider ${isCustomizePage ? 'bg-white/20' : ''}`}></div>
              <Link
                href="/how-it-works"
                className={getLinkClass("/how-it-works")}
              >
                How It Works
              </Link>
              <div className={`nav-divider ${isCustomizePage ? 'bg-white/20' : ''}`}></div>
              <div
                className="relative group h-full flex items-center"
                onMouseEnter={() => setShowAboutDropdown(true)}
                onMouseLeave={() => setShowAboutDropdown(false)}
              >
                <div className={`${getLinkClass("/about-us")} cursor-pointer !flex items-center gap-2 whitespace-nowrap`}>
                  About Us
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`transition-transform duration-200 ${showAboutDropdown ? 'rotate-180' : ''}`}
                  >
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                <div
                  className={`absolute top-full right-0 mt-2 w-48 rounded-lg shadow-xl overflow-hidden transition-all duration-200 border ${isCustomizePage
                    ? 'bg-[#0a0a0f] border-white/10'
                    : 'bg-white border-black/5 ring-1 ring-black/5'
                    } ${showAboutDropdown
                      ? 'opacity-100 translate-y-0 visible'
                      : 'opacity-0 translate-y-2 invisible'
                    }`}
                  style={{ zIndex: 100 }}
                >
                  <Link
                    href="/our-story"
                    className={`block px-4 py-3 text-sm transition-colors ${isCustomizePage
                      ? 'text-gray-400 hover:text-white hover:bg-white/5'
                      : 'text-gray-600 hover:text-black hover:bg-black/5'
                      }`}
                  >
                    Our Story
                  </Link>
                  <Link
                    href="/about-us/ds-standard"
                    className={`block px-4 py-3 text-sm transition-colors ${isCustomizePage
                      ? 'text-gray-400 hover:text-white hover:bg-white/5'
                      : 'text-gray-600 hover:text-black hover:bg-black/5'
                      }`}
                  >
                    The DS Standard
                  </Link>

                </div>
              </div>
              <div className={`nav-divider ${isCustomizePage ? 'bg-white/20' : ''}`}></div>
              <div
                className="relative group h-full flex items-center"
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                <div className={`${getLinkClass("/information-and-policies")} cursor-pointer !flex items-center gap-2 whitespace-nowrap`}>
                  Information & Policies
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`}
                  >
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                <div
                  className={`absolute top-full right-0 mt-2 w-48 rounded-lg shadow-xl overflow-hidden transition-all duration-200 border ${isCustomizePage
                    ? 'bg-[#0a0a0f] border-white/10'
                    : 'bg-white border-black/5 ring-1 ring-black/5'
                    } ${showDropdown
                      ? 'opacity-100 translate-y-0 visible'
                      : 'opacity-0 translate-y-2 invisible'
                    }`}
                  style={{ zIndex: 100 }}
                >
                  <Link
                    href="/information-and-policies/faq"
                    className={`block px-4 py-3 text-sm transition-colors ${isCustomizePage
                      ? 'text-gray-400 hover:text-white hover:bg-white/5'
                      : 'text-gray-600 hover:text-black hover:bg-black/5'
                      }`}
                  >
                    FAQ
                  </Link>
                  <Link
                    href="/information-and-policies/shipping"
                    className={`block px-4 py-3 text-sm transition-colors ${isCustomizePage
                      ? 'text-gray-400 hover:text-white hover:bg-white/5'
                      : 'text-gray-600 hover:text-black hover:bg-black/5'
                      }`}
                  >
                    Shipping
                  </Link>
                </div>
              </div>
            </div>
            <div className="navigation5_button-wrapper button-show-on-landscape">
              <div>
                <Link
                  data-wf--button-primary--variant="secondary"
                  href="/customize"
                  className="button w-variant-1ae2a9c7-3071-e35e-921a-e41dc6d6ad44 w-inline-block"
                >
                  <div className="button_text">
                    <div>Order Now</div>
                  </div>
                  <div className="button_icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      viewBox="0 0 18 10"
                      fill="none"
                      className="button_icon-svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12.0002 5.00391C12.0002 4.45162 11.5525 4.00391 11.0002 4.00391L1.00025 4.00391C0.44796 4.00391 0.000245026 4.45162 0.000245051 5.00391C0.000245075 5.55619 0.44796 6.00391 1.00025 6.00391L11.0002 6.00391C11.5525 6.00391 12.0002 5.55619 12.0002 5.00391Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M17.3616 3.77448C18.2131 4.36865 18.2131 5.63135 17.3616 6.22552L12.3417 9.72824C11.3409 10.4266 10.0002 9.6933 10.0002 8.50272L10.0002 1.49728C10.0002 0.306709 11.3409 -0.426616 12.3417 0.271762L17.3616 3.77448Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                </Link>
              </div>
            </div>
          </nav>
          <div className="navigation5_buttons-wrfrm">
            <div className="navigation5_button-wrapper">
              <Link
                data-wf--button-primary--variant="base"
                href="/customize"
                className="button w-inline-block"
              >
                <div className="button_text">
                  <div>Order Now</div>
                </div>
                <div className="button_icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    viewBox="0 0 18 10"
                    fill="none"
                    className="button_icon-svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.0002 5.00391C12.0002 4.45162 11.5525 4.00391 11.0002 4.00391L1.00025 4.00391C0.44796 4.00391 0.000245026 4.45162 0.000245051 5.00391C0.000245075 5.55619 0.44796 6.00391 1.00025 6.00391L11.0002 6.00391C11.5525 6.00391 12.0002 5.55619 12.0002 5.00391Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M17.3616 3.77448C18.2131 4.36865 18.2131 5.63135 17.3616 6.22552L12.3417 9.72824C11.3409 10.4266 10.0002 9.6933 10.0002 8.50272L10.0002 1.49728C10.0002 0.306709 11.3409 -0.426616 12.3417 0.271762L17.3616 3.77448Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
              </Link>
            </div>
            <div
              className={`navigation5_menu-button w-nav-button ${mobileMenuOpen ? 'w--open' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <div className="navigation5_menu-icon">
                <div className="navigation_menu_line-top navigation-menu-line-background-wrfrm"></div>
                <div className="navigation_menu_line-middle navigation-menu-line-background-wrfrm">
                  <div className="navigation_menu_line-middle-inner"></div>
                </div>
                <div className="navigation_menu_line-bottom navigation-menu-line-background-wrfrm"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div
            className="mobile-menu-overlay"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Mobile Menu */}
        <div
          className={`mobile-menu ${mobileMenuOpen ? 'is-open' : 'is-closed'}`}
        >
          <div className="mobile-menu-content">
            <Link
              href="/"
              className="mobile-menu-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              DreamPlay One
            </Link>
            <Link
              href="/why-narrow"
              className="mobile-menu-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Why Narrow?
            </Link>
            <Link
              href="/how-it-works"
              className="mobile-menu-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <div className="mobile-menu-divider" />
            <div className="mobile-menu-section-title">About Us</div>
            <Link
              href="/our-story"
              className="mobile-menu-sublink"
              onClick={() => setMobileMenuOpen(false)}
            >
              Our Story
            </Link>
            <Link
              href="/about-us/ds-standard"
              className="mobile-menu-sublink"
              onClick={() => setMobileMenuOpen(false)}
            >
              The DS Standard
            </Link>

            <div className="mobile-menu-divider" />
            <div className="mobile-menu-section-title">Information & Policies</div>
            <Link
              href="/information-and-policies/faq"
              className="mobile-menu-sublink"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </Link>
            <Link
              href="/information-and-policies/shipping"
              className="mobile-menu-sublink"
              onClick={() => setMobileMenuOpen(false)}
            >
              Shipping
            </Link>
            <div className="mobile-menu-divider" />
            <div className="mobile-menu-cta">
              <Link
                href="/customize"
                className="mobile-menu-cta-button"
                onClick={() => setMobileMenuOpen(false)}
              >
                Order Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
