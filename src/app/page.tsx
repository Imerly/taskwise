import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
      <div className="text-center max-w-2xl px-6">
        <div className="mb-6 inline-block bg-slate-700 text-slate-300 text-sm px-4 py-1 rounded-full">
          Potenciado por IA
        </div>
        <h1 className="text-5xl font-bold text-white mb-6">
          Tus tareas, organizadas por{" "}
          <span className="text-violet-400">inteligencia artificial</span>
        </h1>
        <p className="text-slate-400 text-lg mb-10">
          Cargá tus tareas y dejá que la IA las priorice por vos. Enfocate en lo
          que importa, no en decidir qué hacer primero.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/register">
            <Button
              size="lg"
              className="bg-violet-600 hover:bg-violet-700 text-white px-8"
            >
              Empezar gratis
            </Button>
          </Link>
          <Link href="/login">
            <Button
              size="lg"
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-700 px-8"
            >
              Iniciar sesión
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
