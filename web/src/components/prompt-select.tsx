import { useEffect, useState } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select";
import { api } from "@/lib/axios";
import { Prompt } from "@/interfaces";

interface PromptSelectProps {
  onPromptSelected: (template: string) => void;
}

export function PromptSelect({ onPromptSelected }: PromptSelectProps) {
  const [prompts, setPrompts] = useState<Prompt[] | null>(null)

  useEffect(() => {
    async function getPrompts() {
      const response = await api.get<Prompt[]>('/prompts')
      setPrompts(response.data)
    }
    getPrompts()
  }, [])

  function handlePromptSelected(promptId: string) {
    const selectedPrompt = prompts?.find(prompt => prompt.id === promptId)
    if(!selectedPrompt) return

    onPromptSelected(selectedPrompt.template)
  }

  return (
    <Select onValueChange={handlePromptSelected}>
      <SelectTrigger>
        <SelectValue placeholder="Selecione um prompt..." />
      </SelectTrigger>
      <SelectContent>
        {prompts?.map(prompt => (
          <SelectItem key={prompt.id} value={prompt.id}>
            {prompt.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}