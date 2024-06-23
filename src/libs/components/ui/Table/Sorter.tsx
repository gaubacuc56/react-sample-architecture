import { useTheme } from "@libs/hooks/useTheme";
import { memo } from "react";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

export type SorterProps = { sort?: boolean | "asc" | "desc" };

const Sorter = memo(({ sort }: SorterProps) => {
    const { themeColor, primaryColorLevel } = useTheme();

    const color = `text-${themeColor}-${primaryColorLevel}`;

    const renderSort = () => {
        if (typeof sort === "boolean") {
            return <FaSort />;
        }

        if (sort === "asc") {
            return <FaSortUp className={color} />;
        }

        if (sort === "desc") {
            return <FaSortDown className={color} />;
        }

        return null;
    };

    return <div className="inline-flex">{renderSort()}</div>;
});

export default Sorter;
