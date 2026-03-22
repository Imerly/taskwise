"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Task } from "@/lib/types";
import TaskCard from "@/components/TaskCard";
import TaskForm from "@/components/TaskForm";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [prioritizing, setPrioritizing] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Error al cargar tareas");
      return;
    }

    setTasks(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const handlePrioritize = async () => {
    const pendingTasks = tasks.filter((t) => !t.completed);

    if (pendingTasks.length === 0) {
      toast.error("No tenés tareas pendientes para priorizar");
      return;
    }

    setPrioritizing(true);
    toast.info("La IA está analizando tus tareas...");

    try {
      const response = await fetch("/api/prioritize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tasks: pendingTasks }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      for (const item of data.priorities) {
        await supabase
          .from("tasks")
          .update({
            priority: item.priority,
            priority_reason: item.reason,
          })
          .eq("id", item.id);
      }

      await fetchTasks();
      toast.success("¡Tareas priorizadas por IA!");
    } catch {
      toast.error("Error al priorizar tareas");
    } finally {
      setPrioritizing(false);
    }
  };

  const highTasks = tasks.filter((t) => t.priority === "high" && !t.completed);
  const mediumTasks = tasks.filter(
    (t) => t.priority === "medium" && !t.completed,
  );
  const lowTasks = tasks.filter((t) => t.priority === "low" && !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">TaskWise</h1>
            <p className="text-slate-400 text-sm mt-1">
              Tu gestor de tareas inteligente
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={handlePrioritize}
              disabled={prioritizing}
              className="bg-violet-600 hover:bg-violet-700 text-white"
            >
              {prioritizing ? "Analizando..." : "✨ Priorizar con IA"}
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              Salir
            </Button>
          </div>
        </div>

        {/* Grid principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Formulario */}
          <div className="lg:col-span-1">
            <TaskForm onTaskCreated={fetchTasks} />
          </div>

          {/* Tareas */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {loading ? (
              <p className="text-slate-400 text-center py-12">
                Cargando tareas...
              </p>
            ) : tasks.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-400 text-lg">
                  No tenés tareas todavía
                </p>
                <p className="text-slate-500 text-sm mt-2">
                  Creá tu primera tarea y dejá que la IA la priorice
                </p>
              </div>
            ) : (
              <>
                {highTasks.length > 0 && (
                  <div>
                    <h2 className="text-red-400 font-medium text-sm uppercase tracking-wider mb-3">
                      Alta prioridad ({highTasks.length})
                    </h2>
                    <div className="flex flex-col gap-3">
                      {highTasks.map((task) => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          onUpdate={fetchTasks}
                        />
                      ))}
                    </div>
                  </div>
                )}
                {mediumTasks.length > 0 && (
                  <div>
                    <h2 className="text-amber-400 font-medium text-sm uppercase tracking-wider mb-3">
                      Media prioridad ({mediumTasks.length})
                    </h2>
                    <div className="flex flex-col gap-3">
                      {mediumTasks.map((task) => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          onUpdate={fetchTasks}
                        />
                      ))}
                    </div>
                  </div>
                )}
                {lowTasks.length > 0 && (
                  <div>
                    <h2 className="text-green-400 font-medium text-sm uppercase tracking-wider mb-3">
                      Baja prioridad ({lowTasks.length})
                    </h2>
                    <div className="flex flex-col gap-3">
                      {lowTasks.map((task) => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          onUpdate={fetchTasks}
                        />
                      ))}
                    </div>
                  </div>
                )}
                {completedTasks.length > 0 && (
                  <div>
                    <h2 className="text-slate-500 font-medium text-sm uppercase tracking-wider mb-3">
                      Completadas ({completedTasks.length})
                    </h2>
                    <div className="flex flex-col gap-3">
                      {completedTasks.map((task) => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          onUpdate={fetchTasks}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
