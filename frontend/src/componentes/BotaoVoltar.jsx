import { Link } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'

const BotaoVoltar = ({ destino = '/' }) => {
    return (
        <div className='flex'>
            <Link
                to={destino}
                className='bg-sky-800 text-white px-4 py-1 rounded-1g w-fit'
            >
                <BsArrowLeft className='text-2xl' />
            </Link>
        </div>
    )
}

export default BotaoVoltar;