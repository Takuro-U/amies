import { FooterColumn } from '../Organisms/FooterColumn';

import styles from "../../styles/footer.module.scss";

// SAMPLE DATA
import { footerColumn } from '../../ts/samples';
import classNames from 'classnames';
export default function AppFooter(){
    return (
        <footer className={classNames("w-full bg-neutral-200 p-2", "relative z-10")}>
            <h1 className="text-xl">AMie's</h1>
            <div className={styles.container}>
            { footerColumn.map((col, key)=> <FooterColumn key={ key } heading={ col.heading } node={ col.node }/>)}
            </div>
        </footer>
    )
}