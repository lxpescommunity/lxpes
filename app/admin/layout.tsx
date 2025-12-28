export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {/* Admin pages don't use the default Header/Footer */}
            {children}
        </>
    );
}
