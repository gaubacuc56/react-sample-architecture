import { Portal } from "react-portal";
import { CommonProps } from "@app-core/@types/common";

export const PagePortal = (props: CommonProps) => {
    const { children } = props;
    return (
        <Portal node={document && document.getElementById("page-header")}>
            {children}
        </Portal>
    );
};
