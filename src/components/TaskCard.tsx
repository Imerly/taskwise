"use client";

import { Task } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PriorityBadge from "@/components/PriorityBadge";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

interface TaskCardProps {
  task: Task;
  onUpdate: () => void;
}

export default function TaskCard({ task, onUpdate }: TaskCardProps) {
  const supabase = createClient();

  const handleComplete = async () => {
    const { error } = await supabase
      .from("tasks")
      .update({ completed: !task.completed })
      .eq("id", task.id);

    if (error) {
      toast.error("Error al actualizar la tarea");
      return;
    }
    onUpdate();
  };

  const handleDelete = async () => {
    const { error } = await supabase.from("tasks").delete().eq("id", task.id);

    if (error) {
      toast.error("Error al eliminar la tarea");
      return;
    }
    toast.success("Tarea eliminada");
    onUpdate();
  };

  return (
    <Card
      className={`bg-slate-800 border-slate-700 transition-opacity ${task.completed ? "opacity-50" : ""}`}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle
            className={`text-base text-white ${task.completed ? "line-through" : ""}`}
          >
            {task.title}
          </CardTitle>
          <PriorityBadge priority={task.priority} />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {task.description && (
          <p className="text-slate-400 text-sm">{task.description}</p>
        )}
        {task.priority_reason && (
          <p className="text-slate-500 text-xs italic border-l-2 border-violet-500 pl-2">
            IA: {task.priority_reason}
          </p>
        )}
        {task.due_date && (
          <p className="text-slate-500 text-xs">
            Fecha límite: {new Date(task.due_date).toLocaleDateString("es-AR")}
          </p>
        )}
        <div className="flex gap-2 mt-1">
          <Button
            size="sm"
            variant="outline"
            onClick={handleComplete}
            className="border-slate-600 text-slate-300 hover:bg-slate-700 text-xs"
          >
            {task.completed ? "Desmarcar" : "Completar"}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleDelete}
            className="border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs"
          >
            Eliminar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
