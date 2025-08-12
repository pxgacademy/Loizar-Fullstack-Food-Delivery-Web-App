import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/header/Header";
import { useThemeStore } from "../../stores/useThemeStore";
import Footer from "../../components/footer/Footer";
import { useAuthStore } from "../../stores/useAuthStore";

const MainLayout: React.FC = () => {
  const { theme } = useThemeStore();
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    const unsubscribe = checkAuth();
    return () => unsubscribe();
  }, [checkAuth]);

  return (
    <section data-theme={theme}>
      <Header />
      <Outlet />
      <Footer />
    </section>
  );
};

export default MainLayout;
