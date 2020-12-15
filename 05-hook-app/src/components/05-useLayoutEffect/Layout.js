import React, { useLayoutEffect, useRef, useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { useCounter } from '../../hooks/useCounter';
import './layout.css';

export const Layout = () => {

    const baseUrl = 'https://www.breakingbadapi.com/api/';
    const quoteById = 'quotes/';

    const { counter, increment } = useCounter(1);

    const { data } = useFetch( baseUrl + quoteById + counter );

    const { quote } = !!data && data[0];

    const pTag = useRef();
    const [boxSize, setBoxSize] = useState({});

    useLayoutEffect(() => {
        
        setBoxSize(pTag.current.getBoundingClientRect());

    }, [ quote ]);

    return (
        <div>
            <h1>LayoutEffect</h1>
            <hr />

            <blockquote className="blockquote text-right">
                <p
                    ref={ pTag }
                    className="mb-0"
                >{ quote }</p>
            </blockquote>

            <pre>
                { JSON.stringify(boxSize, null, 3) }
            </pre>

            <button className="btn btn-primary" onClick={ increment }>
                Siguiente frase
            </button>
           
        </div>
    )
}
