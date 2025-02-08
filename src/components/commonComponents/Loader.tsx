import CardListSkeleton from './CardListSkeleton';
import { BiLoaderAlt } from 'react-icons/bi';

const Loader = () => {
    return (
        <>
            <CardListSkeleton />
            <CardListSkeleton />
            <CardListSkeleton />
            <div className="flex justify-center items-center"> <BiLoaderAlt className="animate-spin h-10 w-10" /></div>
        </>
    )
}
export default Loader;