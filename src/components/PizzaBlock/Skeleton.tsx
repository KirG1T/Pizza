import ContentLoader from 'react-content-loader';

const Skeleton: React.FC = () => (
    <ContentLoader
        className='pizza-block'
        speed={2}
        width={280}
        height={466}
        viewBox='0 0 280 466'
        backgroundColor='#f3f3f3'
        foregroundColor='#ecebeb'
    >
        <circle cx='130' cy='130' r='130' />
        <rect x='0' y='280' rx='5' ry='5' width='280' height='20' />
        <rect x='0' y='317' rx='5' ry='5' width='280' height='80' />
        <rect x='0' y='425' rx='10' ry='10' width='90' height='27' />
        <rect x='126' y='416' rx='22' ry='22' width='152' height='45' />
    </ContentLoader>
);

export default Skeleton;
