
import { Navbar } from "@/components/Layout/Navbar";

interface NavbarContainerProps {
  showNavbar: boolean;
}

export function NavbarContainer({ showNavbar }: NavbarContainerProps) {
  return (
    <div 
      className="fixed top-0 left-0 right-0 z-50 navbar-fade"
      style={{
        opacity: showNavbar ? 1 : 0,
        transform: showNavbar ? 'translateY(0)' : 'translateY(-100%)',
        pointerEvents: showNavbar ? 'auto' : 'none'
      }}
      aria-hidden={!showNavbar}
    >
      <Navbar />
    </div>
  );
}
