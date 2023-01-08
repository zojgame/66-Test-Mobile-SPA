import CachedIcon from '@mui/icons-material/Cached';

function LoadingComponent():JSX.Element{
    return (
        <>
            <div className='loading-component'>
                <CachedIcon className='loading-icon' style={{fontSize: 80}}/>
            </div>
        </>
        
    )
}

export default LoadingComponent;