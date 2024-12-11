import { FooterColumn } from '../Organisms/FooterColumn';
import classNames from 'classnames';

import styles from "../../styles/footer.module.scss";

// SAMPLE DATA
import { footerColumn } from '../../ts/samples';

export default function AppFooter(){
    return (
        <footer className={classNames("w-full bg-white bg-opacity-40 p-2", "relative z-10")}>
            <h1 className="text-xl">AMie's</h1>
            <div className={styles.container}>
            { footerColumn.map((col, key)=> <FooterColumn key={ key } heading={ col.heading } node={ col.node }/>)}
            </div>
        </footer>
    )
}