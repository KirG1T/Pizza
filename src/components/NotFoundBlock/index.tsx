import styles from './NotFoundBlock.module.scss';

const NotFoundBlock: React.FC = () => {
    return (
        <div className={styles.root}>
            <h1>🙃</h1>
            <h2>Ничего не найдено</h2>
            <p>К сожалению данная страница отсутствует</p>
        </div>
    );
};

export default NotFoundBlock;
