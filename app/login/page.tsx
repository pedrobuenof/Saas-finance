import Image from "next/image";
import { Button } from "../_components/ui/button";
import { LogInIcon } from "lucide-react";

const LoginPage = () => {
  return ( 
    <div className="h-full grid grid-cols-2">
      {/* ESQUERDA */}
      <div className="flex flex-col h-full justify-center p-8 max-w-[550px] mx-auto">
        <Image src="/logo.svg" width={173} height={39} alt="Logo Finance AI" className="mb-8"/>
        <h1 className="text-4xl font-bold mb-3">Bem vindo!</h1>
        <p className="text-muted-foreground mb-8">
          A Finance AI é uma plataforma de gestão financeira que utiliza IA para monitorar suas movimentações, e oferecer insights personalizados, facilitando o controle do seu orçamento.
        </p> 
        <Button variant="outline">
          <LogInIcon className="mr-2"/>
          Fazer login ou criar conta
        </Button>
      </div>

      {/* DIREITA */}
      <div className="relative w-full h-full">
        <Image src="/login.png" alt="Faça login" fill className="object-cover"/>
      </div>
    </div>
   );
}
 
export default LoginPage;