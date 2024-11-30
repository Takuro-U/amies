import { FooterColumn } from '../Organisms/FooterColumn';

// SAMPLE DATA
import { footerColumn } from '../../ts/samples';
export default function AppFooter(){
    return (
        <footer className="w-full bg-neutral-200 p-2">
            <h1 className="text-xl">AMie's</h1>
            <div className="footerContainer">
            { footerColumn.map((col, key)=> <FooterColumn key={ key } heading={ col.heading } node={ col.node }/>)}
            </div>
        </footer>
    )
}