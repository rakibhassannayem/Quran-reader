import { SidebarTrigger } from "@/components/ui/sidebar";

const Navbar = () => {
  return (
    <div className="bg-[#fdf9ee]">
      <div className="container mx-auto px-3 py-6 flex items-center justify-between">
        <h2>Quran Reader</h2>
        <SidebarTrigger />
      </div>
    </div>
  );
};

export default Navbar;
