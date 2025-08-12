import type { FC } from "react";
import { Link } from "react-router-dom";
import footerImage from "/food-delivery.png";

const Footer: FC = () => {
  return (
    <footer className="w-full pt-14 pb-5 bg-base-300/50">
      <div className="container mx-auto px-3 sm:px-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-4">
        {/* Logo Section */}
        <div className="col-span-2 sm:col-span-3 lg:col-span-2 border-b lg:border-none pb-2.5 lg:pb-0">
          <Link to="/">
            <div className="flex w-16 h-16 items-center gap-3">
              <img src={footerImage} alt="Loizar Logo" />
              <h3 className="text-2xl md:text-4xl bg-base-100 px-8 py-3 rounded font-Lobster text-primary">
                Loizar
              </h3>
            </div>
          </Link>
        </div>

        {/* Company Links */}
        <div>
          <h6 className="footer-title">Company</h6>
          <div className="flex flex-col space-y-1">
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Career</a>
            <a className="link link-hover">Partner</a>
          </div>
        </div>

        {/* Legal Links */}
        <div>
          <h6 className="footer-title">Legal</h6>
          <div className="flex flex-col space-y-1">
            <a className="link link-hover">Terms of use</a>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Cookie policy</a>
          </div>
        </div>

        {/* Social Links */}
        <div>
          <h6 className="footer-title">Social</h6>
          <div className="flex flex-col space-y-1">
            <a className="link link-hover">Twitter</a>
            <a className="link link-hover">Instagram</a>
            <a className="link link-hover">Facebook</a>
            <a className="link link-hover">GitHub</a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <aside className="mt-10 border-t border-gray-700 pt-4 text-center text-base">
        <p>
          Copyright © {new Date().getFullYear()} - All rights reserved by{" "}
          <span className="font-Lobster">Loizar</span>
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
