import { Menu } from "../../../types/gourmet";

export const menuTypeList = ["コース", "単品", "ドリンク"];

export const encordToBase64 = async (file: File) => {
    return await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

export const initialForm: (menus: { [key: number]: Menu[] }) => {
    id: number;
    name: string;
    price: number;
    description: string;
    imgDataTemp?: File | null;
    imgDataBase64?: string | null;
}[][] = (menus) => {
    const result = menuTypeList.map((type, typeId) => {
        if (!menus[typeId]) {
            return [];
        }
        return menus[typeId].map((menu, index) => {
            const path =
                "/uploaded_images/gourmet/menus/" +
                menu.parent_id +
                "/" +
                menu.category_id +
                "/" +
                index;
            const file = new File([], path + ".png");
            console.log(file);
            return {
                ...menu,
                imgDataTemp:
                    menu.has_image === 1 ? new File([], path + ".png") : null,
            };
        });
    });

    return result;
};
