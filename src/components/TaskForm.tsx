"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface TaskFormProps {
  onTaskCreated: () => void;
}

export default function TaskForm({ onTaskCreated }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast.error("El título es obligatorio");
      return;
    }

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      toast.error("No estás autenticado");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("tasks").insert({
      title: title.trim(),
      description: description.trim() || null,
      due_date: dueDate || null,
      user_id: user.id,
    });

    if (error) {
      toast.error("Error al crear la tarea");
      setLoading(false);
      return;
    }

    toast.success("Tarea creada");
    setTitle("");
    setDescription("");
    setDueDate("");
    setLoading(false);
    onTaskCreated();
  };

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white text-lg">Nueva tarea</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label className="text-slate-300">Título *</Label>
          <Input
            placeholder="¿Qué tenés que hacer?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-slate-300">Descripción</Label>
          <Textarea
            placeholder="Detalles opcionales..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 resize-none"
            rows={3}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-slate-300">Fecha límite</Label>
          <Input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="bg-slate-700 border-slate-600 text-white"
          />
        </div>
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-violet-600 hover:bg-violet-700 text-white w-full"
        >
          {loading ? "Creando..." : "Agregar tarea"}
        </Button>
      </CardContent>
    </Card>
  );
}
