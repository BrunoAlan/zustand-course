import { useEffect, useState } from 'react';
import { tesloApi } from '../../../api/teslo.api';

export const RequestInfo = () => {
    const [info, setInfo] = useState<unknown>();

    useEffect(() => {
        tesloApi
            .get('/auth/private')
            .then((resp) => setInfo(resp.data))
            .catch(() => setInfo('Error'));
    }, []);

    return (
        <div>
            <h2>Private</h2>
            <pre>{JSON.stringify(info, null, 2)}</pre>
        </div>
    );
};
