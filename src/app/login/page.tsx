"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error("Email o contraseña incorrectos");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-slate-800 border-slate-700">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-white">Iniciar sesión</CardTitle>
          <CardDescription className="text-slate-400">
            Bienvenido de vuelta
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label className="text-slate-300">Email</Label>
            <Input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-slate-300">Contraseña</Label>
            <Input
              type="password"
              placeholder="Tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
            />
          </div>
          <Button
            onClick={handleLogin}
            disabled={loading}
            className="bg-violet-600 hover:bg-violet-700 text-white w-full mt-2"
          >
            {loading ? "Ingresando..." : "Iniciar sesión"}
          </Button>
          <p className="text-center text-slate-400 text-sm">
            ¿No tenés cuenta?{" "}
            <Link href="/register" className="text-violet-400 hover:underline">
              Registrate
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
