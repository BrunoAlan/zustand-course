import { WhiteCard } from '../../components';
import { useBearStore } from '../../stores';

export const BearPage = () => {
    return (
        <>
            <h1>Contador de Osos</h1>
            <p>Manejo de estado simple de Zustand</p>
            <hr />

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
                <BlackBears />
                <PolarBears />
                <PandaBears />
            </div>
        </>
    );
};

export const BlackBears = () => {
    const blackBears = useBearStore((state) => state.blackBears);
    const increaseBlackBears = useBearStore(
        (state) => state.increaseBlackBears
    );

    // This way cause rerenders on every state change
    // const { blackBears, increaseBlackBears } = useBearStore((state) => state);

    return (
        <WhiteCard centered>
            <h2>Osos Negros</h2>

            <div className='flex flex-col md:flex-row'>
                <button onClick={() => increaseBlackBears(1)}> +1</button>
                <span className='text-3xl mx-2 lg:mx-10'> {blackBears} </span>
                <button onClick={() => increaseBlackBears(-1)}>-1</button>
            </div>
        </WhiteCard>
    );
};

export const PolarBears = () => {
    const polarBears = useBearStore((store) => store.polarBears);
    const increasePolarBear = useBearStore((store) => store.increasePolarBears);

    return (
        <WhiteCard centered>
            <h2>Osos Polares</h2>

            <div className='flex flex-col md:flex-row'>
                <button onClick={() => increasePolarBear(1)}> +1</button>
                <span className='text-3xl mx-2 lg:mx-10'> {polarBears} </span>
                <button onClick={() => increasePolarBear(-1)}>-1</button>
            </div>
        </WhiteCard>
    );
};

export const PandaBears = () => {
    const pandaBears = useBearStore((store) => store.pandaBears);
    const increasePandaBears = useBearStore(
        (store) => store.increasePandaBears
    );

    return (
        <WhiteCard centered>
            <h2>Osos Panda</h2>

            <div className='flex flex-col md:flex-row'>
                <button onClick={() => increasePandaBears(1)}> +1</button>
                <span className='text-3xl mx-2 lg:mx-10'> {pandaBears} </span>
                <button onClick={() => increasePandaBears(-1)}>-1</button>
            </div>
        </WhiteCard>
    );
};
