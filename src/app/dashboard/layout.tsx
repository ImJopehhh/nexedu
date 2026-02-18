import Link from "next/link";
import {
    Users,
    GraduationCap,
    Newspaper,
    Settings,
    LayoutDashboard,
    LogOut,
    User as UserIcon,
    Bell
} from "lucide-react";
import { logoutAction } from "@/lib/actions";
import { auth } from "@/auth";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    const menuItems = [
        { icon: <LayoutDashboard size={20} />, label: "Statistik", href: "/dashboard" },
        { icon: <Users size={20} />, label: "Data Siswa", href: "/dashboard/students" },
        { icon: <GraduationCap size={20} />, label: "Data Guru", href: "/dashboard/teachers" },
        { icon: <Newspaper size={20} />, label: "Berita", href: "/dashboard/news" },
        { icon: <Settings size={20} />, label: "Pengaturan", href: "/dashboard/settings" },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r hidden lg:flex flex-col sticky top-0 h-screen">
                <div className="p-6 border-b">
                    <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl text-blue-600">
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center">N</div>
                        <span>NexEdu</span>
                    </Link>
                </div>
                <nav className="flex-1 p-4 space-y-1">
                    {menuItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${item.href === "/dashboard"
                                    ? "bg-blue-50 text-blue-600 font-semibold"
                                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                        >
                            {item.icon}
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <div className="p-4 border-t">
                    <form action={logoutAction}>
                        <button className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all font-medium">
                            <LogOut size={20} />
                            Logout
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                <header className="h-16 bg-white border-b flex items-center justify-between px-4 lg:px-8 sticky top-0 z-10">
                    <h2 className="text-lg font-bold text-gray-800">Dashboard</h2>
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors relative">
                            <Bell size={20} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="h-8 w-px bg-gray-200"></div>
                        <div className="flex items-center gap-3 pl-2">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-gray-900">{session?.user?.name || "Administrator"}</p>
                                <p className="text-xs text-gray-500 capitalize">{session?.user?.role?.toLowerCase() || "Admin"}</p>
                            </div>
                            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                                <UserIcon size={20} />
                            </div>
                        </div>
                    </div>
                </header>

                <main className="p-4 lg:p-8 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
