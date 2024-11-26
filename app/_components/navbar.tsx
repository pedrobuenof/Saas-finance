import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex justify-between px-8 py-4 border-b border-solid">
      {/* ESQUERDA */}
      <div className="flex items-center gap-10">
        <Image src="/logo.svg" width={173} height={39} alt="Logo - Saas Finance"/>
        <Link
          href="/"
          className={pathname == "/" ? "font-bold text-primary" : "text-muted-foreground"}
        >
          Dashboard
        </Link>
        <Link
          href="/transaction"
          className={pathname == "/transaction" ? "font-bold text-primary" : "text-muted-foreground"}
        >
          Transações
        </Link>
        <Link
          href="/subscription"
          className={pathname == "/subscription" ? "font-bold text-primary" : "text-muted-foreground"}
        >
          Assinaturas
        </Link>
      </div>

      {/* DIREITA */}
      <UserButton showName/>
    </nav>
  );
}
 
export default Navbar;