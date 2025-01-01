import { Input } from '@/components/ui/input';
import StatusFilter from '@/components/StatusFilter';
import { Plus } from 'lucide-react';
import AddTaskButton from '../AddTask';

export default function NoTasks() {
  return (
    <div className='w-full flex flex-col gap-28'>
      <div className='flex flex-row gap-4'>
        <Input placeholder='Pesquisar...' className='w-40 lg:w-1/4' />
        <StatusFilter status={'x'} setStatus={() => {}} />
        <AddTaskButton />
      </div>
      <div className='flex flex-col gap-4 w-full items-center'>
        <h1>Você não possui tasks cadastradas</h1>
        <h2 className='flex gap-2 flex-row'>
          Adicione tasks clicando no botão <Plus />
        </h2>
      </div>
    </div>
  );
}
