import useEventListener from './useEventListener'

function useClickAnyWhere(handler) {
    useEventListener('click', event => {
        handler(event);
    });
}

export default useClickAnyWhere;
