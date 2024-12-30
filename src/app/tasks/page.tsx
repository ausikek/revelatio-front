import AddTaskButton from "@/components/AddTask";
import Tasks from "@/components/TaskTable";

export default function TaskPage() {
  return (
    <div className="flex flex-col items-center justify-between py-5 pr-7 lg:py-10 lg:pl-3 lg:pr-10 h-full w-full">
      <Tasks
        tasks={[
          {
            id: "1",
            title: "Criar wireframes",
            description:
              "Desenvolver wireframes para a nova página inicial do site.",
            status: "TODO",
          },
          {
            id: "2",
            title: "Escolher paleta de cores",
            description:
              "Definir uma paleta de cores consistente para o projeto.",
            status: "TODO",
          },
          {
            id: "3",
            title: "Desenhar ícones personalizados",
            description:
              "Criar um conjunto de ícones exclusivos para o sistema.",
            status: "TODO",
          },
          {
            id: "4",
            title: "Criar protótipo de alta fidelidade",
            description:
              "Desenvolver um protótipo interativo para apresentar ao cliente.",
            status: "TODO",
          },
          {
            id: "5",
            title: "Testar acessibilidade",
            description:
              "Garantir que o design seja acessível para todos os usuários.",
            status: "TODO",
          },
          {
            id: "6",
            title: "Atualizar design do formulário",
            description:
              "Melhorar a usabilidade e aparência do formulário de contato.",
            status: "TODO",
          },
          {
            id: "7",
            title: "Criar layout responsivo",
            description: "Adaptar o design para diferentes tamanhos de tela.",
            status: "TODO",
          },
          {
            id: "8",
            title: "Selecionar tipografia",
            description:
              "Escolher fontes que combinem com o estilo do projeto.",
            status: "TODO",
          },
          {
            id: "9",
            title: "Revisar design do dashboard",
            description: "Realizar ajustes no layout do painel administrativo.",
            status: "TODO",
          },
          {
            id: "10",
            title: "Criar animações de interface",
            description:
              "Desenvolver animações suaves para melhorar a experiência do usuário.",
            status: "TODO",
          },
        ]}
      />
      <AddTaskButton />
    </div>
  );
}
