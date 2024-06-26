import NavBar from "@components/navbar/navbar";

export default function template({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <NavBar />
            {children}
        </>
    );
}