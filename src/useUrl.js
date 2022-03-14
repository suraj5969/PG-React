import { useState } from 'react';

export default function useUrl() {
    const [url, setUrl] = useState('');

    return {
        url: url,
        setUrl: setUrl
    }
}




