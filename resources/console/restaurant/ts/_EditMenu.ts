import { Menu } from "../../../types/gourmet";

export const menuTypeList = ["コース", "単品", "ドリンク"];

export const encordToBase64: (file: File) => Promise<string | null> = (
    file
) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            resolve(reader.result as string);
        };
        reader.onerror = (error) => {
            reject(error);
        };
    });
};

export const initialForm: (menus: { [key: number]: Menu[] }) => {
    id: number;
    name: string;
    price: number;
    description: string;
    img_data_base64: string | null;
}[][] = (menus) => {
    const result = menuTypeList.map((type, typeId) => {
        if (!menus[typeId]) {
            return [];
        }
        return menus[typeId].map((menu, index) => {
            const img =
                menu.has_image === 1
                    ? new File([], "/images/gourmet/menus/" + menu.id + ".jpg")
                    : null;
            return {
                ...menu,
                img_data_base64: img ? encordToBase64(img) : null,
            };
        });
    });

    return result;
};

export const initialImages: (menus: { [key: number]: Menu[] }) => {
    [key: number]: (File | null)[];
} = (menus) => {
    const result: { [key: number]: (File | null)[] } = {};
    menuTypeList.map((type, typeId) => {
        if (!menus[typeId]) {
            result[typeId] = [];
            return;
        }
        result[typeId] = menus[typeId].map((menu) => {
            return menu.has_image === 1
                ? new File([], "/images/gourmet/menus/" + menu.id + ".jpg")
                : null;
        });
    });
    return result;
};
