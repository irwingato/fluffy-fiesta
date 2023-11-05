import { Link } from 'react-router-dom';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { FaEdit, FaInfoCircle, FaTrash } from 'react-icons/fa';
import { MdAddBox } from 'react-icons/md';

const TarefasTable = ({ tarefas }) => {
    return (
        <table className='w-full border-separate border-spacing-2'>
            <thead>
                <tr>
                    <th className='border border-slate-600 rounded-md'>Número</th>
                    <th className='border border-slate-600 rounded-md'>Nome</th>
                    <th className='border border-slate-600 rounded-md max-md:hidden'>Descrição</th>
                    <th className='border border-slate-600 rounded-md'>Status</th>
                    <th className='border border-slate-600 rounded-md'>Ação</th>
                </tr>
            </thead>
            <tbody>
                {tarefas.map((tarefas, indice) => (
                    <tr key={tarefas._id} className='h-8'>
                        <td className='border border-slate-700 rounded-md text-center'>
                            {indice + 1}
                        </td>
                        <td className='border border-slate-700 rounded-md text-center'>
                            {tarefas.nome}
                        </td>
                        <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                            {tarefas.descricao}
                        </td>
                        <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                            {tarefas.status}
                        </td>
                        <td className='border border-slate-700 rounded-md text-center'>
                            <div className='flex justify-center gap-x-4'>
                                <Link to={`/tarefas/detalhes/${tarefas._id}`}>
                                    <div className='flex items-center'>
                                        <FaInfoCircle className='text-blue-500 text-2xl' />
                                        <span className='ml-1'>Detalhes</span>
                                    </div>
                                </Link>
                                <Link to={`/tarefas/editar/${tarefas._id}`}>
                                    <div className='flex items-center'>
                                        <FaEdit className='text-yellow-500 text-2xl' />
                                        <span className='ml-1'>Editar</span>
                                    </div>
                                </Link>
                                <Link to={`/tarefas/apagar/${tarefas._id}`}>
                                    <div className='flex items-center'>
                                        <FaTrash className='text-red-500 text-2xl' />
                                        <span className='ml-1'>Apagar</span>
                                    </div>
                                </Link>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TarefasTable;