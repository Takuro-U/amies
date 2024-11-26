import React from "react";

// Custom-Hooks
import { useModalContext } from "../../../../hooks/ModalProvider";

// etc.
import { searchLinkList } from "../../ts/list";

const SearchLinks: React.FC = () => {
    const { openModal } = useModalContext();
    return (
        <div>
            {searchLinkList.map((link) => (
                <button
                    onClick={() =>
                        openModal({
                            text: "",
                            coreFunction: () => {},
                            Component: link.Component,
                            componentProps: link.componentProps,
                        })
                    }
                    style={{ backgroundImage: link.imgPath }}
                >
                    {link.title}
                </button>
            ))}
        </div>
    );
};

export default SearchLinks;
